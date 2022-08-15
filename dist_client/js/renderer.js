//
// renderer process
//

//
// imports
//

import * as threeWrapper from "./threewrapper.js"

//
// global vars
//

var filePath

//
// window initialization
//

document.onload = initWindow()

function initWindow() {
	consoleMessage("Initialized Liberator.", "good")

	let openFileButton = document.getElementById("menu-bar-open-file")
	let quitButton = document.getElementById("menu-bar-quit")
	let aboutButton = document.getElementById("menu-bar-about")
	let messageWindowCloseButton = document.getElementById("liberator-message-close-button")

	messageWindowCloseButton.addEventListener("click", () => {
		hideMessage()
	})

	openFileButton.addEventListener("click", async() => {
		filePath = await window.electronAPI.openFile()

		if (Array.isArray(filePath)) {
			consoleMessage("Error: ", "error", "Invalid file selection response.")
		} else if (filePath === undefined) {
			consoleMessage("Warning: ", "warning", "User cancelled file selection.")
		} else {
			consoleMessage("User selected file: ", "good", filePath)
		}
	})
	quitButton.addEventListener("click", () => {
		window.electronAPI.closeApp()
	})
	aboutButton.addEventListener("click", () => {
		showMessage("message-about")
	})
}

//
// console
//

window.electronAPI.consoleMessage((event, value) => {
	firstMessage = value["firstMessage"]
	spanClass = value["spanClass"]
	secondMessage = value["secondMessage"]

	consoleMessage(firstMessage, spanClass, secondMessage)
})

function consoleMessage(firstMessage, spanClass = "", secondMessage = "") {
	let console = document.getElementById("console")
	let container = document.getElementById("console-container")

	if (spanClass != "") {
		console.innerHTML += "<span class='" + spanClass + "'>" + firstMessage + "</span>" + secondMessage + "<br>"
	} else {
		console.innerHTML += firstMessage + secondMessage + "<br>"
	}

	container.scrollTop = container.scrollHeight
}

//
// dialog messages
//

function showMessage(messageID) {
	let messageContainer = document.getElementById("messages-root")
	messageContainer.style.display = "block"
	let messageDIV = document.getElementById(messageID)
	messageDIV.style.display = "block"
}

function hideMessage() {
	let messageContainer = document.getElementById("messages-root")
	messageContainer.style.display = "none"

	let messageDIVs = document.getElementsByClassName("liberator-message")
	for (let i = 0; i < messageDIVs.length; i++) {
		messageDIVs[i].style.display = "none"
	}
}

//
// file structure tree
//

window.electronAPI.startJSTree((event, data) => {
	$("#file-structure-tree").jstree("destroy").empty()
	$("#file-structure-tree").jstree({
		"plugins": ["sort"],
		"core": {
			"themes": {
				"name": "default-dark"
			},
			"data": data
		}
	})
})

//
// file information window
//

window.electronAPI.fileInfoMessage((event, value) => {
	firstMessage = value["firstMessage"]
	spanClass = value["spanClass"]
	secondMessage = value["secondMessage"]

	fileInfoMessage(firstMessage, spanClass, secondMessage)
})

window.electronAPI.fileInfoSet((event, value) => {
	clearHTMLbyID("file-info")
	for (let i = 0; i < value.length; i++) {
		fileInfoMessage(value[i][0], "good", value[i][1])
	}
})

function fileInfoMessage(firstMessage, spanClass = "", secondMessage = "") {
	let infoBox = document.getElementById("file-info")

	if (spanClass != "") {
		infoBox.innerHTML += "<span class='" + spanClass + "'>" + firstMessage + "</span>" + secondMessage + "<br>"
	} else {
		infoBox.innerHTML += firstMessage + secondMessage + "<br>"
	}
}

//
// action buttons
//

window.electronAPI.addActionButton((event, value) => {
	buttonText = value["buttonText"]
	buttonFunction = value["buttonFunction"]

	addActionButton(buttonText, buttonFunction)
})

function addActionButton(buttonText, buttonFunction) {
	let container = document.getElementById("actions")

	let button = document.createElement("div")
	button.setAttribute("class", "liberator-action-button")
	button.setAttribute("data-func", buttonFunction)
	button.appendChild(document.createTextNode(buttonText))

	button.addEventListener("click", () => {
		window.electronAPI.extractToDirectory([filePath, buttonFunction])
	})

	container.appendChild(button)
}

//
// viewer window
//

window.electronAPI.buildThreeScene((event, data) => {
	threeWrapper.buildThreeScene(data)
})

//
// generic functions
//

window.electronAPI.clearHTMLbyID((event, value) => {
	clearHTMLbyID(value)
})

function clearHTMLbyID(item) {
	let container = document.getElementById(item)
	container.innerHTML = ""
}