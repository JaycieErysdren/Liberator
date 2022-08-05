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

	// testing, ignore

	//let test_array_header = [
	//	"unknown01", "unknown02", "numSectors", "numPlanes",
	//	"numVertices", "numQuads", "lenTileTextureData", "numTiles",
	//	"lenTileColorData", "numEntities", "lenEntityData", "numEntityPolylinks",
	//	"numEntityPolylinkData1Segments", "numEntityPolylinkData2Segments", "numUnknown",
	//]

	//let test_array = ["skyData", "header", test_array_header, "sectors"]

	//let filestructure_root = fileStructureTreeStart("file-structure-tree", "TITLE.LEV")
	//fileStructureTreeCreate(filestructure_root, test_array)
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
		consoleAddMessage("<span class='good'>Assuming File Type:</span> SlaveDriver Level")
		import("/js/viewer.js").then((module) => { module.load_lev(arrayBuffer, "QUAKE") })
	} else if (ext == "PIX" || ext == "pix") {
		consoleAddMessage("<span class='good'>Assuming File Type:</span> BRender Pixelmap")
		import("/js/viewer.js").then((module) => { module.load_pix(arrayBuffer) })
	} else if (ext == "PIC" || ext == "pic") {
		consoleAddMessage("<span class='good'>Assuming File Type:</span> SlaveDriver Bitmap")
		import("/js/viewer.js").then((module) => { module.load_pic(arrayBuffer) })
	} else if (ext == "PCS" || ext == "pcs") {
		consoleAddMessage("<span class='good'>Assuming File Type:</span> SlaveDriver Bitmap")
		import("/js/viewer.js").then((module) => { module.load_pcs(arrayBuffer) })
	} else if (ext == "TMF" || ext == "tmf") {
		consoleAddMessage("<span class='good'>Assuming File Type:</span> Tank Engine Model")
		import("/js/viewer.js").then((module) => { module.load_tmf(arrayBuffer) })
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
			extensions: ["lev", "pic", "pix", "pcs", "tmf", "LEV", "PIC", "PIX", "PCS", "TMF"]
		}]
	}).then((filename) => selectFile(filename))
}

function consoleAddMessage(message) {
	let console = document.getElementById("console")
	let container = document.getElementById("console-container")
	console.innerHTML += message + "<br>"
	container.scrollTop = container.scrollHeight
}

// file info

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

// file structure tree

function clearHTMLbyID(item) {
	let container = document.getElementById(item)
	container.innerHTML = ""
}

function fileStructureTreeStart(id, message) {
	let container = document.getElementById(id)
	let ul = document.createElement("ul")
	let li = document.createElement("li")
	li.appendChild(document.createTextNode(message))
	ul.appendChild(li)
	container.appendChild(ul)

	return ul
}

function fileStructureTreeCreate(root, array) {
	let ul = document.createElement("ul")
	let li
	root.appendChild(ul)
	array.forEach(function(item) {
		if (Array.isArray(item)) {
			fileStructureTreeCreate(li, item)
		} else {
			li = document.createElement("li")
			li.appendChild(document.createTextNode(item))
			ul.appendChild(li)	
		}
	})
 }