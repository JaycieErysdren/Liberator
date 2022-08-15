let KaitaiStream = require("kaitai-struct/KaitaiStream")
let fileTree = require("../modules/filetree")

module.exports = {
	parseDataFile: function(window, data, fileName) {
		let BrenderDatafile = require("../formats/BrenderDatafile")
		let brenderFile = new BrenderDatafile(new KaitaiStream(data))

		let fileInfo

		let jsonData = []
		jsonData.push(fileTree.item("file", "#", fileName, "./images/silk/page.png", true))

		if (brenderFile.chunks[1].type == 3) {
			// pixelmap
			let pixelmapHeader = brenderFile.chunks[1].data
			if (pixelmapHeader.bitmapType == 3) {
				// 8-bit paletted pixelmap
				let width = pixelmapHeader.width
				let height = pixelmapHeader.height

				let size = width * height
				let pixelData = new Uint8Array(4 * size)	

				let palette = []

				let pixPalette = brenderFile.chunks[3].data.pixelData
				let pixData = brenderFile.chunks[4].data.pixelData

				// compute palette
				for (let i = 0; i < 256; i++) {
					palette.push([
						pixPalette[i].r,
						pixPalette[i].g,
						pixPalette[i].b,
						255
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

				fileInfo = [
					["File Name: ", fileName],
					["File Type: ", "BRender Pixelmap"],
					["File Size: ", (data.length / 1000).toString() + " kilobytes"],
					["", ""],
					["Width: ", width.toString()],
					["Height: ", height.toString()],
				]

				window.webContents.send("clearHTMLbyID", "actions")
				window.webContents.send("addActionButton", {"buttonText": "Save as PNG", "buttonFunction": "brenderpix-save-png"})
			}
		}

		window.webContents.send("fileInfoSet", fileInfo)
		window.webContents.send("startJSTree", jsonData)
	}
}