//
// backend process
//

//
// requirements
//

let fs = require("fs")

//
// defs
//

const formats_3dmm = [
	"chk", "3th", "3cn", "3mm",
	"CHK", "3TH", "3CN", "3MM"
]

const formats_slavedriver = [
	"lev", "pic", "pcs",
	"LEV", "PIC", "PCS"
]

const formats_brender = [
	"pix", "act", "dat",
	"PIX", "ACT", "DAT"
]

const formats_tankengine = [
	"tmf",
	"TMF"
]

const formats_idtech = [
	"pak", "pk3",
	"PAK", "PK3"
]

const formats_all = formats_3dmm.concat(formats_slavedriver, formats_brender, formats_tankengine, formats_idtech)

let mainWindow

//
// main
//

const { app, BrowserWindow, ipcMain, dialog } = require("electron")
const path = require("path")

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		webPreferences: {
			preload: path.join(__dirname, "preload.js")
		}
	})
	mainWindow.setMenuBarVisibility(false)
	mainWindow.loadFile("dist/index.html")
}

app.whenReady().then(() => {
	ipcMain.handle("dialog:openFile", handleFileOpen)
	ipcMain.on("closeApp", closeApp)

	createWindow()
	app.on("activate", () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow()
		}
	})
})

app.on("window-all-closed", () => {
		if (process.platform !== "darwin") {
		app.quit()
	}
})

//
// ipc
//

async function handleFileOpen() {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		filters: [
			{ name: "Supported Formats", extensions: formats_all },
			{ name: "Microsoft 3D Movie Maker", extensions: formats_3dmm },
			{ name: "SlaveDriver Engine", extensions: formats_slavedriver },
			{ name: "BRender Engine", extensions: formats_brender },
			{ name: "Tank Engine", extensions: formats_tankengine },
			{ name: "idTech Engines", extensions: formats_idtech }
		]
	})
	if (canceled) {
		return
	} else {
		loadFile(filePaths[0])
		return filePaths[0]
	}
}


function closeApp() {
	app.quit()
}

//
// loading files
//

function loadFile(filePath) {
	fs.readFile(filePath, null, (err, data) => {
		if (err) {
			mainWindow.webContents.send("consoleMessage", "An error occured while reading the file: " + err.message)
			return
		}

		mainWindow.webContents.send("consoleMessage", "The file content is: " + data)
	});
}