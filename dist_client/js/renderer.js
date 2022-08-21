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
	let messageWindowRoot = document.getElementById("messages-input-catcher")

	messageWindowRoot.addEventListener("click", () => {
		hideMessage()
	})

	messageWindowCloseButton.addEventListener("click", () => {
		hideMessage()
	})

	let aboutWindow = document.getElementById("about-tabs")
	let aboutWindowTabButtons = aboutWindow.getElementsByClassName("liberator-tab-button")

	for (let i = 0; i < aboutWindowTabButtons.length; i++) {
		let tabButton = aboutWindowTabButtons[i]
		let tabButtonID = aboutWindowTabButtons[i].id
		let tabID = tabButton.dataset.tab

		tabButton.addEventListener("click", async() => {
			switchTab(aboutWindow, tabID, tabButtonID)
		})
	}

	switchTab(aboutWindow, "about-information", "about-button-information")

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
// tabs
//

function switchTab(parent, tabID, tabButtonID) {
	let allTabs = parent.getElementsByClassName("liberator-tab-content")
	let allTabButtons = parent.getElementsByClassName("liberator-tab-bar")[0].getElementsByClassName("liberator-tab-button")
	let thisTab = document.getElementById(tabID)
	let thisTabButton = document.getElementById(tabButtonID)

	for (let i = 0; i < allTabButtons.length; i++) {
		allTabButtons[i].style.backgroundColor = "#171717"
	}

	thisTabButton.style.backgroundColor = "#232323"

	for (let i = 0; i < allTabs.length; i++) {
		allTabs[i].style.display = "none"
	}

	thisTab.style.display = "block"
}

//
// console
//

window.electronAPI.consoleMessage((event, value) => {
	let firstMessage = value["firstMessage"]
	let spanClass = value["spanClass"]
	let secondMessage = value["secondMessage"]

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
	let firstMessage = value["firstMessage"]
	let spanClass = value["spanClass"]
	let secondMessage = value["secondMessage"]

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
	let buttonText = value["buttonText"]
	let buttonFunction = value["buttonFunction"]

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

window.electronAPI.clearThreeScene((event, data) => {
	threeWrapper.clearThreeScene()
})

//
// generic functions
//

window.electronAPI.clearHTMLbyID((event, data) => {
	clearHTMLbyID(data)
})

function clearHTMLbyID(item) {
	let container = document.getElementById(item)
	container.innerHTML = ""
}