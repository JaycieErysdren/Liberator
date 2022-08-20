let KaitaiStream = require("kaitai-struct/KaitaiStream")
let fileTree = require("../modules/filetree")
let liberatorUtils = require("../modules/liberatorutils")
let fs = require("fs")

module.exports = {
	parseDataFile: function(window, data, fileName) {
		let BrenderDatafile = require("../formats/BrenderDatafile")
		let brenderFile = new BrenderDatafile(new KaitaiStream(data))

		let fileInfo

		let jsonData = []

		if (brenderFile.chunks[1].type == 3) {
			// pixelmap
			jsonData.push(fileTree.item("file", "#", fileName, "./images/silk/picture.png", true))
			let pixelmap = brenderFile.chunks[1].data
			if (pixelmap.bitmapType == 3) {
				// 8-bit paletted pixelmap
				let width = pixelmap.width
				let height = pixelmap.height

				let size = width * height
				let pixelData = new Uint8Array(4 * size)	

				let palette = []

				let pixPalette = pixelmap.palette.data.pixelData.data.dataRgb // wow
				let pixData = pixelmap.pixelData.data.dataPaletted

				// compute palette
				for (let i = 0; i < 256; i++) {
					palette.push([
						pixPalette[i].r,
						pixPalette[i].g,
						pixPalette[i].b,
						255
					])
				}

				for (let i = 0; i < size; i++) {
					let stride = i * 4
			
					pixelData[stride] = palette[pixData[i]][0]
					pixelData[stride + 1] = palette[pixData[i]][1]
					pixelData[stride + 2] = palette[pixData[i]][2]
					pixelData[stride + 3] = palette[pixData[i]][3]
				}

				let spriteObject = {"type": "threeSprite", "position": [0, 0, 0], "pixel_data": pixelData, "width": width, "height": height}

				let threeInfo = {
					"objects": [spriteObject],
					"camera_position": [width + height, 0, 0],
					"camera_draw_distance": [128, 4096]
				}
		
				window.webContents.send("buildThreeScene", threeInfo)

				fileInfo = [
					["File Name: ", fileName],
					["File Type: ", "BRender Pixelmap"],
					["File Size: ", liberatorUtils.fileSize(data.length)],
					["", ""],
					["Width: ", width.toString()],
					["Height: ", height.toString()]
				]

				window.webContents.send("clearHTMLbyID", "actions")
				window.webContents.send("addActionButton", {"buttonText": "Save as PNG", "buttonFunction": "brenderpix-save-png"})
			}
		}

		window.webContents.send("fileInfoSet", fileInfo)
		window.webContents.send("startJSTree", jsonData)
	}
}