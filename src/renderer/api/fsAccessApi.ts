/**
 * File System Access API wrapper — uses browser-native showDirectoryPicker()
 * to grant read/write access to a local directory.
 *
 * This replaces server-based file operations when running in web/Docker mode.
 * Files stay local — no uploads or volume mounts needed.
 */

interface FileEntry {
  name: string
  isDirectory: boolean
  path: string
}

/** Currently opened directory handle */
let rootHandle: FileSystemDirectoryHandle | null = null
let rootName = ''

/**
 * Show the native OS folder picker and store the handle.
 * Returns the folder name, or null if cancelled.
 */
export async function openLocalFolder(): Promise<string | null> {
  try {
    const handle = await (window as any).showDirectoryPicker({ mode: 'readwrite' })
    rootHandle = handle
    rootName = handle.name
    return handle.name
  } catch {
    // User cancelled
    return null
  }
}

export function getRootHandle(): FileSystemDirectoryHandle | null {
  return rootHandle
}

export function getRootName(): string {
  return rootName
}

export function hasLocalFolder(): boolean {
  return rootHandle !== null
}

/**
 * Resolve a path relative to root handle into a nested directory handle + file name.
 * e.g. "subfolder/file.js" → { dirHandle: <subfolder>, fileName: "file.js" }
 */
async function resolvePath(relativePath: string): Promise<{
  dirHandle: FileSystemDirectoryHandle
  fileName: string
}> {
  const parts = relativePath.split('/').filter(Boolean)
  const fileName = parts.pop()!
  let dir = rootHandle!
  for (const part of parts) {
    dir = await dir.getDirectoryHandle(part)
  }
  return { dirHandle: dir, fileName }
}

/**
 * Resolve a path to a directory handle.
 */
async function resolveDir(relativePath: string): Promise<FileSystemDirectoryHandle> {
  if (!relativePath || relativePath === '/' || relativePath === '.') return rootHandle!
  const parts = relativePath.split('/').filter(Boolean)
  let dir = rootHandle!
  for (const part of parts) {
    dir = await dir.getDirectoryHandle(part)
  }
  return dir
}

/**
 * List entries in a directory (relative to root).
 */
export async function listDirectory(relativePath: string = ''): Promise<FileEntry[]> {
  if (!rootHandle) return []
  try {
    const dir = await resolveDir(relativePath)
    const entries: FileEntry[] = []
    for await (const [name, handle] of (dir as any).entries()) {
      if (name.startsWith('.')) continue
      entries.push({
        name,
        isDirectory: handle.kind === 'directory',
        path: relativePath ? `${relativePath}/${name}` : name
      })
    }
    return entries.sort((a, b) => {
      if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1
      return a.name.localeCompare(b.name)
    })
  } catch {
    return []
  }
}

/**
 * Read a file's text content.
 */
export async function readFile(relativePath: string): Promise<string | null> {
  if (!rootHandle) return null
  try {
    const { dirHandle, fileName } = await resolvePath(relativePath)
    const fileHandle = await dirHandle.getFileHandle(fileName)
    const file = await fileHandle.getFile()
    return await file.text()
  } catch {
    return null
  }
}

/**
 * Write text content to a file.
 */
export async function writeFile(relativePath: string, content: string): Promise<{ success: boolean; error?: string }> {
  if (!rootHandle) return { success: false, error: 'No folder open' }
  try {
    const { dirHandle, fileName } = await resolvePath(relativePath)
    const fileHandle = await dirHandle.getFileHandle(fileName, { create: true })
    const writable = await (fileHandle as any).createWritable()
    await writable.write(content)
    await writable.close()
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}

/**
 * Create a new file or directory.
 */
export async function createEntry(relativePath: string, isDirectory: boolean): Promise<{ success: boolean; error?: string }> {
  if (!rootHandle) return { success: false, error: 'No folder open' }
  try {
    const { dirHandle, fileName } = await resolvePath(relativePath)
    if (isDirectory) {
      await dirHandle.getDirectoryHandle(fileName, { create: true })
    } else {
      await dirHandle.getFileHandle(fileName, { create: true })
    }
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}

/**
 * Delete a file or directory.
 */
export async function deleteEntry(relativePath: string): Promise<{ success: boolean; error?: string }> {
  if (!rootHandle) return { success: false, error: 'No folder open' }
  try {
    const { dirHandle, fileName } = await resolvePath(relativePath)
    await (dirHandle as any).removeEntry(fileName, { recursive: true })
    return { success: true }
  } catch (e: any) {
    return { success: false, error: e.message }
  }
}

/**
 * Sync a file to the server workspace so the Keystone proxy can serve it for RunScript.
 * Only needed when running scripts — normal editing stays local.
 */
export async function syncFileToServer(relativePath: string): Promise<void> {
  const content = await readFile(relativePath)
  if (content === null) return
  await fetch('/api/files/write', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ path: relativePath, content })
  })
}

/**
 * Sync all files in the current folder to the server workspace.
 * Used when running scripts to ensure the proxy has all dependencies.
 */
export async function syncAllToServer(dirPath: string = ''): Promise<number> {
  if (!rootHandle) return 0
  let count = 0
  const entries = await listDirectory(dirPath)
  for (const entry of entries) {
    if (entry.isDirectory) {
      count += await syncAllToServer(entry.path)
    } else {
      await syncFileToServer(entry.path)
      count++
    }
  }
  return count
}
