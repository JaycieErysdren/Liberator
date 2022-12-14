//
// backend process
//

//
// requirements
//

let { app, BrowserWindow, ipcMain, dialog } = require("electron")
let path = require("path")
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

const formats_descent = [
	"hog", "pig",
	"HOG", "PIG"
]

const formats_all = formats_3dmm.concat(formats_slavedriver, formats_brender, formats_tankengine, formats_idtech, formats_descent)

let warning_unsupported = "While the structure of this filetype is known and supported, this program is in early alpha and the parser has not been written yet."

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
	mainWindow.loadFile("dist_client/index.html")
}

app.whenReady().then(() => {
	ipcMain.handle("dialog:openFile", handleFileOpen)
	//ipcMain.handle("dialog:openDirectory", handleDirectoryOpen)
	ipcMain.on("extractToDirectory", handleDirectoryOpen)
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
		defaultPath: "/home/jaycie/Projects/Liberator/local/test_files" //REMOVEME
	})
	if (canceled) {
		return
	} else {
		loadFile(filePaths[0])
		return filePaths[0]
	}
}

async function handleDirectoryOpen(event, fileInfo) {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		properties: ["openDirectory"],
		defaultPath: "/home/jaycie/Projects/Liberator/local/test_files" //REMOVEME
	})
	if (canceled) {
		return
	} else {
		extractToDirectory(filePaths[0], fileInfo[0], fileInfo[1])
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
			mainWindow.webContents.send("consoleMessage", {"firstMessage": "Error: ", "spanClass": "error", "secondMessage": err.message})
			return
		} else {
			mainWindow.webContents.send("consoleMessage", {"firstMessage": "File loaded successfully.", "spanClass": "good", "secondMessage": ""})
			let fileExt = filePath.split(".").pop()
			let fileExtLower = fileExt.toLowerCase()
			let fileType
			let fileName = filePath.split('\\').pop().split('/').pop()

			mainWindow.webContents.send("clearThreeScene", "viewer")

			if (formats_3dmm.includes(fileExt)) {
				fileType = "Microsoft 3D Movie Maker Chunkfile"
				mainWindow.webContents.send("consoleMessage", {"firstMessage": "Warning: ", "spanClass": "warning", "secondMessage": warning_unsupported})
			} else if (formats_slavedriver.includes(fileExt)) {
				let SlaveDriverParser = require("./parsers/slavedriver")
				if (fileExtLower == "lev") {
					fileType = "SlaveDriver Level"
					SlaveDriverParser.parseLev(mainWindow, data, fileName)
				} else if (fileExtLower == "pcs") {
					fileType = "SlaveDriver Bitmap Collection"
					mainWindow.webContents.send("consoleMessage", {"firstMessage": "Warning: ", "spanClass": "warning", "secondMessage": warning_unsupported})
				} else if (fileExtLower == "pic") {
					fileType = "SlaveDriver Bitmap"
					SlaveDriverParser.parsePic(mainWindow, data, fileName)
				}
			} else if (formats_brender.includes(fileExt)) {
				let BRenderParser = require("./parsers/brender")
				fileType = "BRender Datafile"
				BRenderParser.parseDataFile(mainWindow, data, fileName)
			} else if (formats_tankengine.includes(fileExt)) {
				fileType = "Tank Engine Model"
				mainWindow.webContents.send("consoleMessage", {"firstMessage": "Warning: ", "spanClass": "warning", "secondMessage": warning_unsupported})
			} else if (formats_idtech.includes(fileExt)) {
				let idTechParser = require("./parsers/idtech")
				if (fileExtLower == "pak") {
					fileType = "idTech Packfile V1"
					idTechParser.parsePak(mainWindow, data, fileName)
				} else if (fileExtLower == "pk3") {
					fileType = "idTech Packfile V3"
					mainWindow.webContents.send("consoleMessage", {"firstMessage": "Warning: ", "spanClass": "warning", "secondMessage": warning_unsupported})
				}
			} else if (formats_descent.includes(fileExt)) {
				let DescentParser = require("./parsers/descent")
				if (fileExtLower == "hog") {
					fileType = "Descent Hogfile"
					DescentParser.parseHog(mainWindow, data, fileName)
				} else if (fileExtLower == "pig") {
					fileType = "Descent Pigfile"
					DescentParser.parsePig(mainWindow, data, fileName)
				}
			} else {
				mainWindow.webContents.send("consoleMessage", {"firstMessage": "Error: ", "spanClass": "error", "secondMessage": "Unknown file type!"})
				return
			}

			let fileMessage = "\"" + fileType + "\" based on extension \"" + fileExt + "\""
			mainWindow.webContents.send("consoleMessage", {"firstMessage": "Assuming file type: ", "spanClass": "good", "secondMessage": fileMessage})
		}
	})
}

function extractToDirectory(directoryPath, filePath, actionType) {
	console.log("filePath: " + filePath)
	console.log("directoryPath: " + directoryPath)
	console.log("actionType: " + actionType)

	fs.readFile(filePath, null, (err, data) => {
		if (err) {
			mainWindow.webContents.send("consoleMessage", {"firstMessage": "Error: ", "spanClass": "error", "secondMessage": err.message})
			return
		} else {
			let fileName = filePath.split('\\').pop().split('/').pop()

			if (actionType == "pigfile-extract-all") {
				let DescentParser = require("./parsers/descent")
				DescentParser.extractPig(mainWindow, data, fileName, directoryPath)
			} else if (actionType == "levquake-extract-textures") {
				let SlaveDriverParser = require("./parsers/slavedriver")
				SlaveDriverParser.extractLev(mainWindow, data, fileName, directoryPath, false, true, false, "Quake")
			} else if (actionType == "levduke-extract-textures") {
				let SlaveDriverParser = require("./parsers/slavedriver")
				SlaveDriverParser.extractLev(mainWindow, data, fileName, directoryPath, false, true, false, "Duke3D")
			} else {
				mainWindow.webContents.send("consoleMessage", {"firstMessage": "Error: ", "spanClass": "error", "secondMessage": "Unknown action type!"})
				return
			}
		}
	})
}
