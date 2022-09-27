let KaitaiStream = require("kaitai-struct/KaitaiStream")
let fileTree = require("../modules/filetree")
let liberatorUtils = require("../modules/liberatorutils")
let fs = require("fs")
let Jimp = require("jimp")

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
			["File Size: ", liberatorUtils.fileSize(data.length)],
			["", ""],
			["Number of Bitmaps: ", pigFile.bitmaps.length.toString()],
			["Number of Sounds: ", pigFile.sounds.length.toString()]
		]

		window.webContents.send("clearHTMLbyID", "actions")
		window.webContents.send("addActionButton", {"buttonText": "Extract All", "buttonFunction": "pigfile-extract-all"})
		window.webContents.send("addActionButton", {"buttonText": "Extract Selected", "buttonFunction": "pigfile-extract-selected"})
		window.webContents.send("addActionButton", {"buttonText": "Extract Bitmaps", "buttonFunction": "pigfile-extract-bitmaps"})
		window.webContents.send("addActionButton", {"buttonText": "Extract Sounds", "buttonFunction": "pigfile-extract-sounds"})

		window.webContents.send("fileInfoSet", fileInfo)
		window.webContents.send("startJSTree", jsonData)
	},
	extractPig: function(window, data, fileName, outputDirectory) {
		let DescentPig = require("../formats/DescentPig")
		let pigFile = new DescentPig(new KaitaiStream(data))

		for (let i = 0; i < pigFile.bitmaps.length; i++) {
			let bitmap = pigFile.bitmaps[i]

			let dataToWrite

			if (bitmap.flags & 8) {
				dataToWrite = Uint8Array.from(bitmap.getRleData.pixels)
			} else {
				dataToWrite = Uint8Array.from(bitmap.getLinearData)
			}

			let outFileName = i.toString() + " - " + bitmap.name

			fs.writeFile(outputDirectory + "/" + outFileName, dataToWrite, (err) => {
				if (err) {
					window.webContents.send("consoleMessage", {"firstMessage": "Error: ", "spanClass": "error", "secondMessage": "Couldn't write file. Error text: " + err})
				} else {
					window.webContents.send("consoleMessage", {"firstMessage": "Successfully wrote " + outFileName + " to disk.", "spanClass": "good", "secondMessage": ""})
				}
			})
		}
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
			["File Size: ", liberatorUtils.fileSize(data.length)],
			["", ""],
			["Number of Files: ", hogFile.chunks.length.toString()]
		]

		window.webContents.send("clearHTMLbyID", "actions")
		window.webContents.send("addActionButton", {"buttonText": "Extract All", "buttonFunction": "hogfile-extract-all"})
		window.webContents.send("addActionButton", {"buttonText": "Extract Selected", "buttonFunction": "hogfile-extract-selected"})

		window.webContents.send("fileInfoSet", fileInfo)
		window.webContents.send("startJSTree", jsonData)
	}
}

let descentPalette = [
	[0, 0, 0, 255], [48, 48, 40, 255], [40, 48, 32, 255], [40, 40, 32, 255],
	[32, 40, 32, 255], [32, 32, 32, 255], [24, 32, 32, 255], [24, 32, 40, 255],
	[24, 40, 40, 255], [24, 40, 48, 255], [32, 40, 48, 255], [40, 40, 48, 255],
	[40, 48, 48, 255], [40, 48, 56, 255], [48, 48, 56, 255], [56, 48, 56, 255],
	[56, 64, 64, 255], [56, 72, 72, 255], [72, 72, 72, 255], [80, 72, 64, 255],
	[80, 89, 80, 255], [89, 97, 72, 255], [89, 97, 105, 255], [105, 113, 105, 255],
	[113, 121, 113, 255], [129, 129, 121, 255], [40, 56, 56, 255], [32, 48, 48, 255],
	[32, 40, 40, 255], [32, 32, 40, 255], [24, 24, 32, 255], [24, 24, 24, 255],
	[24, 24, 16, 255], [32, 32, 16, 255], [40, 32, 24, 255], [48, 40, 32, 255],
	[24, 32, 24, 255], [16, 24, 24, 255], [16, 24, 32, 255], [16, 16, 24, 255],
	[8, 8, 8, 255], [8, 16, 16, 255], [8, 8, 16, 255], [8, 8, 8, 255], [0, 8, 8, 255],
	[0, 0, 8, 255], [0, 0, 0, 255], [32, 40, 56, 255], [246, 246, 246, 255],
	[238, 238, 238, 255], [230, 230, 230, 255], [222, 222, 222, 255], [214, 214, 214, 255],
	[206, 206, 206, 255], [198, 198, 198, 255], [190, 190, 190, 255], [182, 182, 182, 255],
	[174, 174, 174, 255], [165, 165, 165, 255], [157, 157, 157, 255], [149, 149, 149, 255],
	[141, 141, 141, 255], [137, 137, 137, 255], [129, 129, 129, 255], [121, 121, 121, 255],
	[113, 113, 113, 255], [105, 105, 105, 255], [97, 97, 97, 255], [89, 89, 89, 255],
	[80, 80, 80, 255], [72, 72, 72, 255], [64, 64, 64, 255], [56, 56, 56, 255],
	[48, 48, 48, 255], [40, 40, 40, 255], [32, 32, 32, 255], [24, 24, 24, 255],
	[16, 16, 16, 255], [12, 12, 12, 255], [4, 4, 4, 255], [226, 226, 255, 255],
	[178, 178, 255, 255], [133, 133, 255, 255], [85, 85, 255, 255], [40, 40, 255, 255],
	[0, 0, 255, 255], [0, 0, 230, 255], [0, 0, 206, 255], [0, 0, 182, 255],
	[0, 0, 157, 255], [0, 0, 133, 255], [0, 0, 109, 255], [0, 0, 85, 255],
	[0, 0, 60, 255], [0, 0, 36, 255], [0, 0, 12, 255], [250, 178, 255, 255],
	[246, 129, 255, 255], [246, 85, 255, 255], [242, 0, 255, 255], [210, 0, 226, 255],
	[182, 0, 198, 255], [153, 0, 174, 255], [125, 0, 145, 255], [97, 0, 117, 255],
	[72, 0, 93, 255], [48, 0, 64, 255], [28, 0, 36, 255], [8, 0, 12, 255],
	[238, 218, 218, 255], [230, 210, 210, 255], [222, 202, 202, 255], [214, 194, 194, 255],
	[206, 186, 186, 255], [198, 178, 178, 255], [194, 170, 170, 255], [186, 161, 161, 255],
	[178, 153, 153, 255], [170, 145, 145, 255], [161, 137, 137, 255], [153, 129, 129, 255],
	[149, 125, 125, 255], [137, 109, 109, 255], [125, 97, 97, 255], [117, 85, 85, 255],
	[105, 76, 76, 255], [93, 64, 64, 255], [85, 52, 52, 255], [72, 44, 44, 255],
	[60, 36, 36, 255], [48, 20, 20, 255], [36, 8, 8, 255], [24, 0, 0, 255],
	[12, 0, 0, 255], [165, 153, 125, 255], [137, 125, 85, 255], [113, 97, 56, 255],
	[89, 72, 28, 255], [60, 48, 12, 255], [36, 28, 0, 255], [12, 8, 0, 255],
	[198, 242, 186, 255], [165, 218, 149, 255], [137, 198, 117, 255], [113, 174, 93, 255],
	[89, 153, 68, 255], [68, 129, 48, 255], [52, 109, 28, 255], [36, 85, 16, 255],
	[24, 64, 4, 255], [12, 40, 0, 255], [4, 20, 0, 255], [121, 255, 121, 255],
	[0, 255, 0, 255], [0, 230, 0, 255], [0, 210, 0, 255], [0, 186, 0, 255],
	[0, 161, 0, 255], [0, 141, 0, 255], [0, 117, 0, 255], [0, 97, 0, 255],
	[0, 72, 0, 255], [0, 52, 0, 255], [0, 28, 0, 255], [0, 8, 0, 255],
	[255, 230, 105, 255], [234, 198, 80, 255], [214, 170, 60, 255], [198, 141, 44, 255],
	[178, 113, 28, 255], [161, 85, 16, 255], [141, 60, 4, 255], [109, 32, 0, 255],
	[80, 16, 0, 255], [52, 4, 0, 255], [24, 0, 0, 255], [255, 255, 0, 255],
	[194, 194, 0, 255], [137, 137, 0, 255], [80, 80, 0, 255], [24, 24, 0, 255],
	[255, 255, 186, 255], [255, 255, 121, 255], [255, 255, 56, 255], [255, 234, 56, 255],
	[255, 210, 44, 255], [255, 190, 36, 255], [255, 165, 32, 255], [255, 137, 24, 255],
	[255, 113, 20, 255], [255, 85, 12, 255], [255, 56, 8, 255], [255, 24, 4, 255],
	[255, 0, 0, 255], [234, 0, 0, 255], [218, 0, 0, 255], [202, 0, 0, 255],
	[186, 0, 0, 255], [170, 0, 0, 255], [153, 0, 0, 255], [137, 0, 0, 255],
	[117, 0, 0, 255], [101, 0, 0, 255], [85, 0, 0, 255], [64, 0, 0, 255],
	[48, 0, 0, 255], [28, 0, 0, 255], [12, 0, 0, 255], [255, 165, 80, 255],
	[255, 125, 0, 255], [206, 93, 0, 255], [161, 64, 0, 255], [113, 40, 0, 255],
	[68, 20, 0, 255], [24, 4, 0, 255], [141, 141, 222, 255], [117, 117, 190, 255],
	[93, 93, 157, 255], [72, 72, 129, 255], [48, 48, 97, 255], [32, 32, 64, 255],
	[16, 16, 36, 255], [194, 174, 174, 255], [165, 149, 149, 255], [141, 129, 125, 255],
	[117, 109, 101, 255], [93, 89, 80, 255], [68, 64, 56, 255], [44, 44, 36, 255],
	[20, 20, 16, 255], [190, 137, 218, 255], [157, 113, 186, 255], [129, 93, 153, 255],
	[101, 68, 121, 255], [72, 48, 89, 255], [48, 28, 56, 255], [20, 12, 24, 255],
	[105, 190, 80, 255], [89, 165, 68, 255], [76, 145, 56, 255], [64, 121, 48, 255],
	[52, 101, 40, 255], [36, 76, 28, 255], [28, 56, 20, 255], [16, 36, 12, 255],
	[255, 186, 186, 255], [255, 137, 137, 255], [255, 89, 89, 255], [255, 40, 40, 255],
	[250, 202, 186, 255], [246, 178, 153, 255], [246, 153, 125, 255], [190, 109, 85, 255],
	[137, 68, 48, 255], [85, 36, 24, 255], [255, 255, 255, 255]
]
