const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
	// renderer to main
	openFile: () => ipcRenderer.invoke("dialog:openFile"),
	closeApp: () => ipcRenderer.send("closeApp"),
	extractToDirectory: (fileInfo) => ipcRenderer.send("extractToDirectory", fileInfo),
	// main to renderer
	consoleMessage: (callback) => ipcRenderer.on("consoleMessage", callback),
	fileInfoMessage: (callback) => ipcRenderer.on("fileInfoMessage", callback),
	fileInfoSet: (callback) => ipcRenderer.on("fileInfoSet", callback),
	addActionButton: (callback) => ipcRenderer.on("addActionButton", callback),
	clearHTMLbyID: (callback) => ipcRenderer.on("clearHTMLbyID", callback),
	startJSTree: (callback) => ipcRenderer.on("startJSTree", callback),
	buildThreeScene: (callback) => ipcRenderer.on("buildThreeScene", callback),
	clearThreeScene: (callback) => ipcRenderer.on("clearThreeScene", callback)
})

window.addEventListener("DOMContentLoaded", () => {
	const replaceText = (selector, text) => {
		const element = document.getElementById(selector)
		if (element) element.innerText = text
	}
  
	for (const dependency of ["chrome", "node", "electron"]) {
		replaceText(`${dependency}-version`, process.versions[dependency])
	}
})