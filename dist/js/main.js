//
// imports
//

const tauriOpenFile = window.__TAURI__.dialog.open
const tauriDocumentDir = window.__TAURI__.path.documentDir
const tauriReadBinaryFile = window.__TAURI__.fs.readBinaryFile
const tauriInvoke = window.__TAURI__.invoke

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
	"pix",
	"PIX"
]

const formats_tankengine = [
	"tmf",
	"TMF"
]

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

function parseFile(filepath, arrayBuffer) {
	if (arrayBuffer == null) {
		consoleAddMessage("<span class='error'>Error:</span> Couldn't load file.")
		return
	}

	let filename = filepath.split('\\').pop().split('/').pop()

	consoleAddMessage("<span class='good'>Loaded File:</span> " + filename)
	let ext = filename.split(".").pop()
	if (ext == "LEV" || ext == "lev") {
		consoleAddMessage("<span class='good'>Assuming File Type:</span> SlaveDriver Level")
		import("/js/viewer.js").then((module) => { module.load_lev(arrayBuffer, filename, "QUAKE") })
	} else if (ext == "PIX" || ext == "pix") {
		consoleAddMessage("<span class='good'>Assuming File Type:</span> BRender Pixelmap")
		import("/js/viewer.js").then((module) => { module.load_pix(arrayBuffer, filename) })
	} else if (ext == "PIC" || ext == "pic") {
		consoleAddMessage("<span class='good'>Assuming File Type:</span> SlaveDriver Bitmap")
		import("/js/viewer.js").then((module) => { module.load_pic(arrayBuffer, filename) })
	} else if (ext == "PCS" || ext == "pcs") {
		consoleAddMessage("<span class='good'>Assuming File Type:</span> SlaveDriver Bitmap")
		import("/js/viewer.js").then((module) => { module.load_pcs(arrayBuffer, filename) })
	} else if (ext == "TMF" || ext == "tmf") {
		consoleAddMessage("<span class='good'>Assuming File Type:</span> Tank Engine Model")
		import("/js/viewer.js").then((module) => { module.load_tmf(arrayBuffer, filename) })
	} else if (formats_3dmm.includes(ext)) {
		consoleAddMessage("<span class='good'>Assuming File Type:</span> Microsft 3D Movie Maker Chunk")
		import("/js/viewer.js").then((module) => { module.load_ms3dmm(arrayBuffer, filename) })
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
		filters: [
			{
				name: "Supported Formats",
				extensions: formats_3dmm.concat(formats_slavedriver, formats_brender, formats_tankengine)
			},
			{
				name: "Microsoft 3D Movie Maker",
				extensions: formats_3dmm
			},
			{
				name: "SlaveDriver Engine",
				extensions: formats_slavedriver
			},
			{
				name: "BRender Engine",
				extensions: formats_brender
			},
			{
				name: "Tank Engine",
				extensions: formats_tankengine
			}
		]
	}).then((filename) => selectFile(filename))
}

function consoleAddMessage(message) {
	let console = document.getElementById("console")
	let container = document.getElementById("console-container")
	console.innerHTML += message + "<br>"
	container.scrollTop = container.scrollHeight
}

// file info

function fileInfoAddMessage(message) {
	let infobox = document.getElementById("file-info")
	infobox.innerHTML += message + "<br>"
}

// file structure tree

function clearHTMLbyID(item) {
	let container = document.getElementById(item)
	container.innerHTML = ""
}

function startTree(id, title) {
	let container = document.getElementById(id)
	let root_list = document.createElement("ul")
	let title_list = document.createElement("ul")
	let title_listitem = document.createElement("li")
	title_listitem.appendChild(document.createTextNode(title))
	root_list.appendChild(title_listitem)
	title_listitem.appendChild(title_list)
	container.appendChild(root_list)

	return title_list
}

function addTreeItem(container, key, value) {
	let folder_list = document.createElement("ul")
	let folder_list_header = document.createElement("li")

	if (value != null) {
		let text_span_key = document.createElement("span")
		let text_span_value = document.createElement("span")

		text_span_key.appendChild(document.createTextNode(key))
		text_span_key.className = "blue"

		text_span_value.appendChild(document.createTextNode(" = " + value))

		folder_list_header.appendChild(text_span_key)
		folder_list_header.appendChild(text_span_value)

		container.appendChild(folder_list_header)
		return folder_list_header
	} else {
		let text_span = document.createElement("span")

		text_span.appendChild(document.createTextNode(key))
		text_span.className = "good"
		folder_list_header.appendChild(text_span)

		folder_list_header.appendChild(folder_list)
		container.appendChild(folder_list_header)
		return folder_list
	}	
}