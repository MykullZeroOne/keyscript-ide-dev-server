#!/bin/bash
set -e

INSTALL_DIR="$HOME/.corelation-service"
PLIST_NAME="com.revfcu.corelation-service"
PLIST_PATH="$HOME/Library/LaunchAgents/$PLIST_NAME.plist"
NODE_PATH=$(which node 2>/dev/null)

if [ -z "$NODE_PATH" ]; then
  echo "Error: Node.js is not installed. Install it from https://nodejs.org or via: brew install node"
  exit 1
fi

echo "Using Node.js at: $NODE_PATH"

# Unload existing service if present
launchctl unload "$PLIST_PATH" 2>/dev/null || true

# Install service files
mkdir -p "$INSTALL_DIR"
cp "$(dirname "$0")/corelation-service.mjs" "$INSTALL_DIR/"

# Create LaunchAgent plist
mkdir -p "$HOME/Library/LaunchAgents"
cat > "$PLIST_PATH" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>$PLIST_NAME</string>
    <key>ProgramArguments</key>
    <array>
        <string>$NODE_PATH</string>
        <string>$INSTALL_DIR/corelation-service.mjs</string>
    </array>
    <key>RunAtLoad</key>
    <true/>
    <key>KeepAlive</key>
    <true/>
    <key>StandardOutPath</key>
    <string>$INSTALL_DIR/service.log</string>
    <key>StandardErrorPath</key>
    <string>$INSTALL_DIR/service.log</string>
</dict>
</plist>
EOF

# Load and start the service
launchctl load "$PLIST_PATH"

echo ""
echo "=== Corelation Service Mock Installed ==="
echo ""
echo "The service is now running and will auto-start on login."
echo ""
echo "FIRST TIME SETUP:"
echo "  1. Open https://127.0.0.1:51763 in your browser"
echo "  2. Accept the self-signed certificate"
echo "  3. Navigate to your Keystone URL (e.g. https://keystonedev.revfcu.com:8443/Development/)"
echo ""
echo "Logs: $INSTALL_DIR/service.log"
echo "Uninstall: run uninstall.sh"
