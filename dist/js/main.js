//
// imports
//

const tauriOpenFile = window.__TAURI__.dialog.open
const tauriDocumentDir = window.__TAURI__.path.documentDir
const tauriReadBinaryFile = window.__TAURI__.fs.readBinaryFile
const tauriInvoke = window.__TAURI__.invoke

//
// window init
//

document.onload = initWindow()

function initWindow() {
	consoleAddMessage("<span class='good'>Initialized Liberator.</span>")

	var menuBarButtons = document.getElementsByClassName("menu-bar-item")

	for (let i = 0; i < menuBarButtons.length; i++) {
		let func = menuBarButtons[i].dataset.func
		menuBarButtons[i].addEventListener("click", function() { menuBarCall(func); })
	}
}

//
// sub-functions
//

function menuBarCall(func) {
	if (func == "open") {
		openFile()
	}
	else if (func == "quit") {
		tauriInvoke("quit").then((response) => console.log(response))
	}
}

function parseFile(filename, arrayBuffer) {
	if (arrayBuffer == null) {
		consoleAddMessage("<span class='error'>Error:</span> Couldn't load file.")
		return
	}

	consoleAddMessage("<span class='good'>Loaded File:</span> " + filename)
	let ext = filename.split(".").pop()
	if (ext == "LEV" || ext == "lev") {
		consoleAddMessage("<span class='good'>Assuming File Type:</span> SlaveDriver Engine Level")
		import("/js/viewer.js").then((module) => { module.load_lev(arrayBuffer, "QUAKE") })
	} else {
		consoleAddMessage("<span class='error'>Error:</span> Couldn't determine file type.")
	}
}

function openFile() {
	function selectFile(filename) {
		if (Array.isArray(filename)) {
			consoleAddMessage("<span class='error'>Error:</span> Invalid file selection response.")
		} else if (filename === null) {
			consoleAddMessage("<span class='warning'>Warning:</span> User cancelled file selection.")
		} else {
			tauriReadBinaryFile(filename).then((arrayBuffer) => parseFile(filename, arrayBuffer))
		}
	}
	tauriOpenFile({
		multiple: false,
		filters: [{
			name: "Supported Formats",
			extensions: ["lev", "pic", "pix", "LEV", "PIC", "PIX"]
		}]
	}).then((filename) => selectFile(filename))
}

function consoleAddMessage(message) {
	let console = document.getElementById("console")
	let container = document.getElementById("console-container")
	console.innerHTML += message + "<br>"
	container.scrollTop = container.scrollHeight
}

function fileInfoClear() {
	let infobox = document.getElementById("file-info")
	infobox.innerHTML = ""
}

function fileInfoAddMessage(message) {
	let infobox = document.getElementById("file-info")
	let container = document.getElementById("file-info-container")
	infobox.innerHTML += message + "<br>"
	container.scrollTop = container.scrollHeight
}