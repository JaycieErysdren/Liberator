let KaitaiStream = require("kaitai-struct/KaitaiStream")
let fileTree = require("../modules/filetree")
let liberatorUtils = require("../modules/liberatorutils")
let fs = require("fs")

module.exports = {
	parsePak: function(window, data, fileName) {
		let IdPak = require("../formats/IdPak")
		let pakFile = new IdPak(new KaitaiStream(data))

		let pakDict = []

		let jsonData = []
		jsonData.push(fileTree.item("file", "#", fileName, "./images/silk/package.png", true))

		for (let i = 0; i < pakFile.getFileTable.length; i++) {
			let file = pakFile.getFileTable[i]
			let filePath = file.filepath
			let fileName = filePath.split("/").pop()
			let filePathArray = filePath.split("/")
			let fileDirectory = filePath.substring(0, filePath.lastIndexOf("/")) + "/";
			let fileParent

			if (filePathArray.length == 1) {
				fileParent = "file"
			} else {
				fileParent = fileDirectory
			}

			let pathParent = ""

			for (let i = 0; i < filePathArray.length - 1; i++) {
				let path = filePathArray[i] + "/"
				let pathCurrent = pathParent + path

				if (!pakDict.includes(path)) {
					let pathParent

					if (i == 0) {
						pathParent = "file"
					} else {
						pathParent = filePathArray[i - 1] + "/"
					}

					jsonData.push(fileTree.item(pathCurrent, pathParent, filePathArray[i], "./images/silk/folder.png", false))
					pakDict.push(path)
				}

				pathParent = pathCurrent
			}

			jsonData.push(fileTree.item(filePath, fileParent, fileName, "./images/silk/page.png", true))
		}

		let fileInfo = [
			["File Name: ", fileName],
			["File Type: ", "idTech Packfile V1"],
			["File Size: ", liberatorUtils.fileSize(data.length)],
			["", ""],
			["Number of Files: ", pakFile.getFileTable.length.toString()]
		]

		window.webContents.send("clearHTMLbyID", "actions")
		window.webContents.send("addActionButton", {"buttonText": "Extract All", "buttonFunction": "pakfile-extract-all"})
		window.webContents.send("addActionButton", {"buttonText": "Extract Selected", "buttonFunction": "pakfile-extract-selected"})

		window.webContents.send("fileInfoSet", fileInfo)
		window.webContents.send("startJSTree", jsonData)
	}
}
