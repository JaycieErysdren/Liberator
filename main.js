//
// backend process
//

//
// requirements
//

let fs = require("fs")
let { app, BrowserWindow, ipcMain, dialog } = require("electron")
let path = require("path")

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

const formats_descent = [
	"hog", "pig",
	"HOG", "PIG"
]

const formats_all = formats_3dmm.concat(formats_slavedriver, formats_brender, formats_tankengine, formats_idtech, formats_descent)

let mainWindow

//
// main
//

function createWindow() {
	mainWindow = new BrowserWindow({
		width: 1280,
		height: 720,
		webPreferences: {
			preload: path.join(__dirname, "preload.js")
		}
	})
	mainWindow.setMenuBarVisibility(true) // FIXME: change to "false" before releasing a version
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
			{ name: "idTech Engines", extensions: formats_idtech },
			{ name: "Descent Engine", extensions: formats_descent },
		],
		defaultPath: "/home/jaycie/Projects/Liberator/meta/test_files" //REMOVEME
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
			mainWindow.webContents.send("consoleMessage", {firstMessage: "Error: ", spanClass: "error", secondMessage: err.message})
			return
		} else {
			mainWindow.webContents.send("consoleMessage", {firstMessage: "File loaded successfully.", spanClass: "good", secondMessage: ""})
			let fileExt = filePath.split(".").pop()
			let fileExtLower = fileExt.toLowerCase()
			let fileType
			let fileName = filePath.split('\\').pop().split('/').pop()

			if (formats_3dmm.includes(fileExt)) {
				fileType = "Microsoft 3D Movie Maker Chunkfile"
			} else if (formats_slavedriver.includes(fileExt)) {
				if (fileExtLower == "lev") {
					fileType = "SlaveDriver Level"
				} else if (fileExtLower == "pcs") {
					fileType = "SlaveDriver Bitmap Collection"
				} else if (fileExtLower == "pix") {
					fileType = "SlaveDriver Bitmap"
				}
			} else if (formats_brender.includes(fileExt)) {
				fileType = "BRender Datafile"
			} else if (formats_tankengine.includes(fileExt)) {
				fileType = "Tank Engine Model"
			} else if (formats_idtech.includes(fileExt)) {
				if (fileExtLower == "pak") {
					fileType = "idTech Packfile V1"
				} else if (fileExtLower == "pk3") {
					fileType = "idTech Packfile V3"
				}
			} else if (formats_descent.includes(fileExt)) {
				let DescentParser = require("./dist/js/parsers/descent")
				if (fileExtLower == "hog") {
					fileType = "Descent Hogfile"
					DescentParser.parseHog(mainWindow, data, fileName)
				} else if (fileExtLower == "pig") {
					fileType = "Descent Pigfile"
					DescentParser.parsePig(mainWindow, data, fileName)
				}
			} else {
				mainWindow.webContents.send("consoleMessage", {firstMessage: "Error: ", spanClass: "error", secondMessage: "Unknown file type!"})
				return
			}

			let fileMessage = "\"" + fileType + "\" based on extension \"" + fileExt + "\""
			mainWindow.webContents.send("consoleMessage", {firstMessage: "Assuming file type: ", spanClass: "good", secondMessage: fileMessage})
		}
	})
}