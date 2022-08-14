let KaitaiStream = require("kaitai-struct/KaitaiStream")

module.exports = {
	parsePig: function(window, data, fileName) {
		let DescentPig = require("../formats/DescentPig")
		let pigFile = new DescentPig(new KaitaiStream(data))

		let jsonData = []
		jsonData.push({ "id": "file", "parent": "#", "text": fileName, "icon": "./images/silk/package.png", "state": { "opened": true } })

		for (let i = 0; i < pigFile.bitmaps.length; i++) {
			let bitmap = pigFile.bitmaps[i]
			let bitmapText = "[" + i.toString() + "] " + bitmap.name
			let bitmapID = i.toString() + "_" + bitmap.name
			jsonData.push({ "id": bitmapID, "parent": "file", "text": bitmapText, "icon": "./images/silk/picture.png", "state": { "opened": true } })
		}

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

		window.webContents.send("startJSTree", jsonData)
	}
}