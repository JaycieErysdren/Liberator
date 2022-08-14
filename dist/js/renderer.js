//
// renderer process
//

//
// global vars
//

var filePath

//
// window initialization
//

document.onload = initWindow()

function initWindow() {
	consoleAddMessage("Initialized Liberator.", "good")

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
			consoleAddMessage("Error: ", "error", "Invalid file selection response.")
		} else if (filePath === undefined) {
			consoleAddMessage("Warning: ", "warning", "User cancelled file selection.")
		} else {
			consoleAddMessage("User selected file: ", "good", filePath)
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

	consoleAddMessage(firstMessage, spanClass, secondMessage)
})

window.electronAPI.startJSTree((event, data) => {
	$("#file-structure-tree").jstree("destroy").empty()
	$("#file-structure-tree").jstree({
		"core" : {
			"data" : data
		}
	})
})

function consoleAddMessage(firstMessage, spanClass = "", secondMessage = "") {
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