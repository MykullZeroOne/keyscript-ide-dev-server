import { app, session, ipcMain, BrowserWindow, shell } from "electron";
import path, { join } from "path";
import express from "express";
import proxy from "express-http-proxy";
import session$1 from "express-session";
import bodyParser from "body-parser";
import cors from "cors";
import { readdir, readFile, writeFile } from "fs/promises";
import { existsSync, readFileSync } from "fs";
import { networkInterfaces } from "os";
import sprightlyExpress from "sprightly/express";
import * as pty from "node-pty";
import dotenv from "dotenv";
import __cjs_mod__ from "node:module";
const __filename = import.meta.filename;
const __dirname = import.meta.dirname;
const require2 = __cjs_mod__.createRequire(import.meta.url);
const is = {
  dev: !app.isPackaged
};
const platform = {
  isWindows: process.platform === "win32",
  isMacOS: process.platform === "darwin",
  isLinux: process.platform === "linux"
};
const electronApp = {
  setAppUserModelId(id) {
    if (platform.isWindows)
      app.setAppUserModelId(is.dev ? process.execPath : id);
  },
  setAutoLaunch(auto) {
    if (platform.isLinux)
      return false;
    const isOpenAtLogin = () => {
      return app.getLoginItemSettings().openAtLogin;
    };
    if (isOpenAtLogin() !== auto) {
      app.setLoginItemSettings({ openAtLogin: auto });
      return isOpenAtLogin() === auto;
    } else {
      return true;
    }
  },
  skipProxy() {
    return session.defaultSession.setProxy({ mode: "direct" });
  }
};
const optimizer = {
  watchWindowShortcuts(window, shortcutOptions) {
    if (!window)
      return;
    const { webContents } = window;
    const { escToCloseWindow = false, zoom = false } = shortcutOptions || {};
    webContents.on("before-input-event", (event, input) => {
      if (input.type === "keyDown") {
        if (!is.dev) {
          if (input.code === "KeyR" && (input.control || input.meta))
            event.preventDefault();
          if (input.code === "KeyI" && (input.alt && input.meta || input.control && input.shift)) {
            event.preventDefault();
          }
        } else {
          if (input.code === "F12") {
            if (webContents.isDevToolsOpened()) {
              webContents.closeDevTools();
            } else {
              webContents.openDevTools({ mode: "undocked" });
              console.log("Open dev tool...");
            }
          }
        }
        if (escToCloseWindow) {
          if (input.code === "Escape" && input.key !== "Process") {
            window.close();
            event.preventDefault();
          }
        }
        if (!zoom) {
          if (input.code === "Minus" && (input.control || input.meta))
            event.preventDefault();
          if (input.code === "Equal" && input.shift && (input.control || input.meta))
            event.preventDefault();
        }
      }
    });
  },
  registerFramelessWindowIpc() {
    ipcMain.on("win:invoke", (event, action) => {
      const win = BrowserWindow.fromWebContents(event.sender);
      if (win) {
        if (action === "show") {
          win.show();
        } else if (action === "showInactive") {
          win.showInactive();
        } else if (action === "min") {
          win.minimize();
        } else if (action === "max") {
          const isMaximized = win.isMaximized();
          if (isMaximized) {
            win.unmaximize();
          } else {
            win.maximize();
          }
        } else if (action === "close") {
          win.close();
        }
      }
    });
  }
};
let KSInstance = "";
const ideParamsData = {};
let ideParamsSeq = 0;
const KeybridgeEndpoints = ["/DirectXMLPostJSON", "/UserLogin", "/LoginUserInterface", "/TableListJSON", "/TableBrowser", "/SearchJSON"];
function setupProxy(rootPath, hostPort, servicePort, proxyEndpoint, supportedInstances, onNetworkEvent) {
  const app2 = express();
  app2.use(session$1({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }));
  const se = sprightlyExpress({
    cache: false,
    keyFallback: "----",
    throwOnKeyNotfound: false
  });
  app2.engine("html", se);
  app2.set("views", path.join(rootPath, "views"));
  const service = express();
  const protocol = "http";
  const corsOptions = {
    origin: [`${protocol}://localhost:${hostPort}`],
    optionsSuccessStatus: 200
  };
  service.get("/GetDeviceInformation", cors(corsOptions), (req, res) => {
    const net = networkInterfaces();
    const info = [];
    Object.keys(net).forEach((k) => {
      info.push(...net[k]?.map((i) => i.mac) ?? []);
    });
    const mac_id = info.filter((i) => i !== "00:00:00:00:00:00").sort().join(" ").replace(/:/g, "-");
    const deviceInfo = `<?xml version="1.0"?>
<device type="c" xmlns="http://www.corelationinc.com/deviceLanguage/v1.0" version="2.0.0.0">
  <deviceInformation type="c">
  <identifier>MAC: ${mac_id}</identifier>
  <userServicePortNumber>${servicePort}</userServicePortNumber>
  </deviceInformation>
</device>`;
    res.send(deviceInfo);
  });
  service.get("*", (req, res) => {
    res.send("okay");
  });
  app2.post("*/Keyscript_IDE/*", (req, res, next) => {
    req.url = req.url.replace("/Keyscript_IDE/", "/");
    next();
  });
  app2.post("*/KeyscriptServlet/List", bodyParser.urlencoded({ extended: false }), async (req, res) => {
    const parent = req.body.node;
    if (!parent || !parent.startsWith("KeyScripts")) {
      return res.json([]);
    }
    const parentPath = parent.substring("KeyScripts".length + 1);
    const scriptsDir = path.join(rootPath, "public/scripts", parentPath);
    if (!existsSync(scriptsDir)) return res.json([]);
    const q = await readdir(scriptsDir, { withFileTypes: true });
    const nodes = q.filter((r) => r.isDirectory() || r.name.endsWith(".js")).map((r) => {
      if (r.isDirectory())
        return { text: r.name, id: `${parent}\\${r.name}`, cls: "folder" };
      const scriptPath = parentPath.length ? path.join(parentPath, r.name) : r.name;
      return { text: r.name, id: `${parent}\\${r.name}`, leaf: true, cls: "file", scriptPath: scriptPath.replace(/\\/g, "/") };
    });
    res.json(nodes);
  });
  app2.post("*", proxy(proxyEndpoint, {
    https: proxyEndpoint.startsWith("https"),
    proxyReqPathResolver: function(req) {
      if (req.path.startsWith("/Keyscript_IDE/"))
        return req.url.replace(/^\/Keyscript_IDE/, `/${KSInstance}`);
      if (KeybridgeEndpoints.includes(req.path))
        return `/${KSInstance}${req.url}`;
      return req.url;
    },
    proxyReqBodyDecorator: function(bodyContent, srcReq) {
      if (srcReq.originalUrl.endsWith("/SessionStore")) {
        const seq = `//${++ideParamsSeq}//`;
        const usp = new URLSearchParams(bodyContent.toString("utf-8"));
        srcReq.params = { ...srcReq.params, seq };
        ideParamsData[seq] = usp.get("value") ?? "";
      }
      if (onNetworkEvent) {
        onNetworkEvent({
          type: "request",
          id: srcReq.requestId ??= Math.random().toString(36).substr(2, 9),
          method: srcReq.method,
          url: srcReq.url,
          body: bodyContent.toString("utf-8")
        });
      }
      return bodyContent;
    },
    userResDecorator: function(proxyRes, proxyResData, userReq, userRes) {
      if (onNetworkEvent) {
        onNetworkEvent({
          type: "response",
          id: userReq.requestId,
          status: proxyRes.statusCode,
          body: proxyResData.toString("utf-8")
        });
      }
      if (userReq.originalUrl.endsWith("/SessionStore")) {
        try {
          const store = JSON.parse(proxyResData.toString("utf-8"));
          const seq = userReq.params.seq;
          const params = ideParamsData[seq];
          delete ideParamsData[seq];
          if (store.success) {
            ideParamsData[store.id] = params;
          }
        } catch (e) {
        }
      } else if (userReq.originalUrl.endsWith("/UserLogin")) {
        try {
          const data = JSON.parse(proxyResData.toString("utf8"));
          if (data.JSESSIONID) {
            const cookies = proxyRes.headers["set-cookie"] ?? [];
            const newCookies = cookies.map((c) => c.replace(/Path=\/\w+;/, "Path=/;"));
            userRes.setHeader("set-cookie", newCookies);
          }
        } catch (e) {
        }
      }
      return proxyResData;
    }
  }));
  if (process.env.NODE_ENV === "development") ;
  else {
    app2.use("/ide", express.static(path.join(rootPath, "out/renderer")));
  }
  const headElement = readFileSync(path.join(rootPath, "views/templates/head-section.html")).toString("utf8").replace(/{{ protocol }}/g, protocol).replace(/{{ hostPort }}/g, `${hostPort}`).replace(/{{ servicePort }}/g, `${servicePort}`);
  app2.get(supportedInstances.map((i) => `/${i}/Keyscript_IDE/RunScript`), (req, res) => {
    const scriptPath = req.query.scriptPath;
    const js = scriptPath.substring(0, scriptPath.length - 3);
    const file = path.join(rootPath, `public/scripts/${js}.js`);
    const parametersId = req.query.scriptParametersId?.toString() ?? "-";
    const scriptParameters = ideParamsData[parametersId] ?? "{ crlogin: {}, crscript: {} }";
    delete ideParamsData[parametersId];
    if (existsSync(file)) {
      res.render("iframe-target.html", { script: js, "head-section": headElement, scriptParameters });
    } else {
      res.status(404).send("<html><body>Script not found.</body></html>");
    }
  });
  app2.get(supportedInstances.flatMap((i) => [`/${i}`, `/${i}/*`]), (req, res, next) => {
    const parts = req.path.split("/");
    if (parts.length > 1) KSInstance = parts[1];
    next();
  });
  app2.use(express.static(path.join(rootPath, "public")));
  app2.listen(hostPort, "localhost");
  service.listen(servicePort, "localhost");
  return { app: app2, service };
}
function setupIpc() {
  ipcMain.handle("file:read", async (_, filePath) => {
    try {
      if (!existsSync(filePath)) return null;
      return await readFile(filePath, "utf-8");
    } catch (e) {
      console.error("Failed to read file:", e);
      return null;
    }
  });
  ipcMain.handle("file:write", async (_, filePath, content) => {
    try {
      await writeFile(filePath, content, "utf-8");
      return { success: true };
    } catch (e) {
      console.error("Failed to write file:", e);
      return { success: false, error: e.message };
    }
  });
  let ptyProcess = null;
  ipcMain.on("terminal:init", (event, rootDir) => {
    const shell2 = process.platform === "win32" ? "powershell.exe" : "bash";
    ptyProcess = pty.spawn(shell2, [], {
      name: "xterm-color",
      cols: 80,
      rows: 24,
      cwd: rootDir,
      env: process.env
    });
    ptyProcess.onData((data) => {
      event.reply("terminal:data", data);
    });
  });
  ipcMain.on("terminal:write", (_, data) => {
    ptyProcess?.write(data);
  });
  ipcMain.on("terminal:resize", (_, { cols, rows }) => {
    ptyProcess?.resize(cols, rows);
  });
}
dotenv.config();
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, "../preload/index.js"),
      sandbox: false,
      webviewTag: true
      // Critical for script execution
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: "deny" };
  });
  const port = process.env.PORT || 3e3;
  if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadURL(`http://localhost:${port}/ide/index.html`);
  }
}
app.whenReady().then(() => {
  electronApp.setAppUserModelId("com.electron");
  app.on("browser-window-created", (_, window) => {
    optimizer.watchWindowShortcuts(window);
  });
  const rootPath = process.cwd();
  const hostPort = Number(process.env.PORT || 3e3);
  const servicePort = hostPort + 1;
  const proxyEndpoint = process.env.PROXY_ENDPOINT || "keystone:8443";
  const supportedInstances = (process.env.SUPPORTED_INSTANCES || "Test").split("|");
  setupProxy(rootPath, hostPort, servicePort, proxyEndpoint, supportedInstances, (event) => {
    const windows = BrowserWindow.getAllWindows();
    if (windows.length > 0) {
      windows[0].webContents.send("network:event", event);
    }
  });
  setupIpc();
  createWindow();
  app.on("activate", function() {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
