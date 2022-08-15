let KaitaiStream = require("kaitai-struct/KaitaiStream")
let fileTree = require("../modules/filetree")

module.exports = {
	parsePic: function(window, data, fileName) {
		let PicQuake = require("../formats/SlavedriverPicQuake")
		let picFile = new PicQuake(new KaitaiStream(data))

		let jsonData = []
		jsonData.push(fileTree.item("file", "#", fileName, "./images/silk/world.png", true))

		let picPalette = picFile.palette
		let picData = picFile.bitmap

		let width = picFile.width
		let height = picFile.height
	
		let size = width * height
		let pixelData = new Uint8Array(4 * size)	

		let palette = []

		// compute palette
		for (let i = 0; i < 256; i++) {
			palette.push([
				Math.round((picPalette[i].r / 31) * 255),
				Math.round((picPalette[i].g / 31) * 255),
				Math.round((picPalette[i].b / 31) * 255),
				Math.round(picPalette[i].a * 255)
			])
		}

		let i = 0

		// compute texture, accounting for big endian
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < width; x++) {
				let stride = i * 4
				let pos = ((height - y - 1) * width) + x
	
				pixelData[stride] = palette[picData[pos]][0]
				pixelData[stride + 1] = palette[picData[pos]][1]
				pixelData[stride + 2] = palette[picData[pos]][2]
				pixelData[stride + 3] = palette[picData[pos]][3]
	
				i += 1
			}
		}

		let spriteObject = {"type": "threeSprite", "position": [0, 0, 0], "pixel_data": pixelData, "width": width, "height": height}

		let threeInfo = {
			"objects": [spriteObject],
			"camera_position": [width + height, 0, 0],
			"camera_draw_distance": [128, 4096]
		}

		window.webContents.send("buildThreeScene", threeInfo)

		let fileInfo = [
			["File Name: ", fileName],
			["File Type: ", "SlaveDriver Bitmap"],
			["File Size: ", (data.length / 1000).toString() + " kilobytes"],
			["", ""],
			["Width: ", width.toString()],
			["Height: ", height.toString()],
		]

		window.webContents.send("clearHTMLbyID", "actions")
		window.webContents.send("addActionButton", {"buttonText": "Save as PNG", "buttonFunction": "picquake-save-png"})

		window.webContents.send("fileInfoSet", fileInfo)
		window.webContents.send("startJSTree", jsonData)
	},
	parseLev: function(window, data, fileName) {
		let LevQuake = require("../formats/SlavedriverLevQuake")
		let levFile = new LevQuake(new KaitaiStream(data))

		let jsonData = []
		jsonData.push(fileTree.item("file", "#", fileName, "./images/silk/world.png", true))

		let numTextures = 0

		for (let i = 0; i < levFile.resources.numResources; i++) {
			let resource = levFile.resources.resources[i]

			if (resource.resourceType == 130) {
				numTextures++
			}
		}

		let fileInfo = [
			["File Name: ", fileName],
			["File Type: ", "SlaveDriver Engine Level (Quake)"],
			["File Size: ", (data.length / 1000).toString() + " kilobytes"],
			["", ""],
			["Textures: ", numTextures.toString()],
			["Sounds: ", levFile.resources.numSounds.toString()],
			["Other Resources: ", (levFile.resources.numResources - numTextures).toString()]
		]

		window.webContents.send("clearHTMLbyID", "actions")
		window.webContents.send("addActionButton", {"buttonText": "Extract All Assets", "buttonFunction": "levquake-extract-all"})
		window.webContents.send("addActionButton", {"buttonText": "Extract Sky Textures", "buttonFunction": "levquake-extract-sky-textures"})
		window.webContents.send("addActionButton", {"buttonText": "Extract Textures", "buttonFunction": "levquake-extract-textures"})
		window.webContents.send("addActionButton", {"buttonText": "Extract Sounds", "buttonFunction": "levquake-extract-sounds"})

		window.webContents.send("fileInfoSet", fileInfo)
		window.webContents.send("startJSTree", jsonData)
	}
}