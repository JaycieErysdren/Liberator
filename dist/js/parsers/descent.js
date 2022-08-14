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
		jsonData.push(fileTree.item("file", "#", fileName, "./images/silk/package.png", true))

		for (let i = 0; i < hogFile.chunks.length; i++) {
			let chunk = hogFile.chunks[i]
			let chunkText = "[" + i.toString() + "] " + chunk.name
			let chunkExt = chunk.name.split(".").pop().toLowerCase()
			let chunkImage

			if (chunkExt == "pcx" || chunkExt == "bbm") {
				chunkImage = "./images/silk/picture.png"
			} else if (chunkExt == "256") {
				chunkImage = "./images/silk/color_swatch.png"
			} else if (chunkExt == "rdl") {
				chunkImage = "./images/silk/world.png"
			} else if (chunkExt == "pof") {
				chunkImage = "./images/silk/shape_group.png"
			} else {
				chunkImage = "./images/silk/page.png"
			}

			jsonData.push(fileTree.item(chunk.name, "file", chunkText, chunkImage, true))
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