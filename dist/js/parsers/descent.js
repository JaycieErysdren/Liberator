let KaitaiStream = require("kaitai-struct/KaitaiStream")
let fileTree = require("../modules/filetree")

module.exports = {
	parsePig: function(window, data, fileName) {
		let DescentPig = require("../formats/DescentPig")
		let pigFile = new DescentPig(new KaitaiStream(data))

		let jsonData = []

		jsonData.push(fileTree.item("file", "#", fileName, "./images/silk/package.png", true))
		jsonData.push(fileTree.item("bitmaps", "file", "Bitmaps", "./images/silk/folder.png", false))
		jsonData.push(fileTree.item("sounds", "file", "Sounds", "./images/silk/folder.png", false))

		for (let i = 0; i < pigFile.bitmaps.length; i++) {
			let bitmap = pigFile.bitmaps[i]
			let bitmapText = "[" + i.toString() + "] " + bitmap.name
			let bitmapID = i.toString() + "_" + bitmap.name
			jsonData.push(fileTree.item(bitmapID, "bitmaps", bitmapText, "./images/silk/picture.png", true))
		}

		for (let i = 0; i < pigFile.sounds.length; i++) {
			let sound = pigFile.sounds[i]
			let soundText = "[" + i.toString() + "] " + sound.name
			let soundID = i.toString() + "_" + sound.name
			jsonData.push(fileTree.item(soundID, "sounds", soundText, "./images/silk/sound.png", true))
		}

		let fileInfo = [
			["File Name: ", fileName],
			["File Type: ", "Descent Pigfile"],
			["File Size: ", data.length.toString() + " bytes"],
			["", ""],
			["Number of Bitmaps: ", pigFile.bitmaps.length.toString()],
			["Number of Sounds: ", pigFile.sounds.length.toString()]
		]

		window.webContents.send("fileInfoSet", fileInfo)
		window.webContents.send("startJSTree", jsonData)
	},
	parseHog: function(window, data, fileName) {
		let DescentHog = require("../formats/DescentHog")
		let hogFile = new DescentHog(new KaitaiStream(data))

		let jsonData = []
		jsonData.push({ "id" : "file", "parent" : "#", "text" : fileName, "icon": "./images/silk/package.png", "state": { "opened": true } })

		for (let i = 0; i < hogFile.chunks.length; i++) {
			let chunk = hogFile.chunks[i]
			let chunkText = "[" + i.toString() + "] " + chunk.name
			jsonData.push({ "id" : chunk.name, "parent" : "file", "text" : chunkText, "icon": "./images/silk/page.png", "state": { "opened": true } })
		}


		let fileInfo = [
			["File Name: ", fileName],
			["File Type: ", "Descent Hogfile"],
			["File Size: ", data.length.toString() + " bytes"],
			["", ""],
			["Number of Files: ", hogFile.chunks.length.toString()]
		]

		window.webContents.send("fileInfoSet", fileInfo)
		window.webContents.send("startJSTree", jsonData)
	}
}