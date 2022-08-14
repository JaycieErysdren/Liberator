const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
	openFile: () => ipcRenderer.invoke("dialog:openFile"),
	closeApp: () => ipcRenderer.send("closeApp"),
	consoleMessage: (callback) => ipcRenderer.on("consoleMessage", callback),
	fileInfoMessage: (callback) => ipcRenderer.on("fileInfoMessage", callback),
	fileInfoSet: (callback) => ipcRenderer.on("fileInfoSet", callback),
	addActionButton: (callback) => ipcRenderer.on("addActionButton", callback),
	clearHTMLbyID: (callback) => ipcRenderer.on("clearHTMLbyID", callback),
	startJSTree: (callback) => ipcRenderer.on("startJSTree", callback)
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