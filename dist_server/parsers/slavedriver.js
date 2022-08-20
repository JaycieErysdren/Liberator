let KaitaiStream = require("kaitai-struct/KaitaiStream")
let fileTree = require("../modules/filetree")

module.exports = {
	parsePic: function(window, data, fileName) {
		let PicQuake = require("../formats/SlavedriverPicQuake")
		let picFile = new PicQuake(new KaitaiStream(data))

		let jsonData = []
		jsonData.push(fileTree.item("file", "#", fileName, "./images/silk/picture.png", true))

		let picPalette = picFile.palette
		let picData = picFile.bitmap

		let width = picFile.width
		let height = picFile.height
	
		let size = width * height
		let pixelData = new Uint8Array(4 * size)	

		let outPalette = []

		// compute palette
		for (let i = 0; i < 256; i++) {
			outPalette.push([
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
	
				pixelData[stride] = outPalette[picData[pos]][0]
				pixelData[stride + 1] = outPalette[picData[pos]][1]
				pixelData[stride + 2] = outPalette[picData[pos]][2]
				pixelData[stride + 3] = outPalette[picData[pos]][3]
	
				i += 1
			}
		}

		let spriteObject = {"type": "threeSprite", "position": [0, 0, 0], "pixel_data": pixelData, "width": width, "height": height}

		let threeInfo = {
			"objects": [spriteObject],
			"camera_position": [width + height, 0, 0],
			"camera_move_distance": [128, 4096]
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
		jsonData.push(fileTree.item("resources", "file", "Other Resources", "./images/silk/package.png", false))
		jsonData.push(fileTree.item("sounds", "file", "Sounds", "./images/silk/package.png", false))
		jsonData.push(fileTree.item("textures", "file", "Textures", "./images/silk/package.png", false))

		// parsed kaitaistruct arrays
		let levVertices = levFile.vertices
		let levQuads = levFile.quads
		let levSectors = levFile.sectors
		let levHeader = levFile.header
		let levPlanes = levFile.planes
		let levTiles = levFile.tiles
		let levResources = levFile.resources

		let levColors = [
			[-16,-16,-16],	[-16,-15,-15],	[-15,-14,-14],
			[-14,-13,-13],	[-13,-12,-12],	[-12,-11,-11],
			[-11,-10,-10],	[-10,-9,-9],	[-9,-8,-8],
			[-8,-7,-7],		[-7,-6,-6],		[-6,-5,-5],
			[-5,-4,-4],		[-4,-3,-3],		[-3,-2,-2],
			[-2,-1,-1],		[-1,0,0],		[0,0,0]
		]

		// export arrays
		let threeMaterials = []
		let threePolyGroups = []
		let threePolyGroupUVs = []
		let threePolyGroupColors = []

		// functions
		function convert_vertex_color(lookup) {
			let color_out = []
			let color_in = levColors[lookup]
	
			color_out.push((31 + color_in[0]) / 31)
			color_out.push((31 + color_in[1]) / 31)
			color_out.push((31 + color_in[2]) / 31)
	
			return color_out
		}
	
		function add_vertex(arrayCoords, coords) {
			arrayCoords.push(coords[0])
			arrayCoords.push(coords[1])
			arrayCoords.push(coords[2])
		}
	
		function add_polygroup(x, y, z, index, tri_num) {
			add_vertex(threePolyGroups[index], x.coords)
			add_vertex(threePolyGroups[index], y.coords)
			add_vertex(threePolyGroups[index], z.coords)
	
			threePolyGroupColors[index].push(x.color[0])
			threePolyGroupColors[index].push(x.color[1])
			threePolyGroupColors[index].push(x.color[2])
	
			threePolyGroupColors[index].push(y.color[0])
			threePolyGroupColors[index].push(y.color[1])
			threePolyGroupColors[index].push(y.color[2])
	
			threePolyGroupColors[index].push(z.color[0])
			threePolyGroupColors[index].push(z.color[1])
			threePolyGroupColors[index].push(z.color[2])
	
			if (tri_num == 0) {
				// vertex 1
				threePolyGroupUVs[index].push(0)
				threePolyGroupUVs[index].push(0)
				// vertex 2
				threePolyGroupUVs[index].push(1)
				threePolyGroupUVs[index].push(0)
				// vertex 3
				threePolyGroupUVs[index].push(1)
				threePolyGroupUVs[index].push(1)
			}
			else if (tri_num == 1) {
				// vertex 1
				threePolyGroupUVs[index].push(0)
				threePolyGroupUVs[index].push(0)
				// vertex 2
				threePolyGroupUVs[index].push(1)
				threePolyGroupUVs[index].push(1)
				// vertex 3
				threePolyGroupUVs[index].push(0)
				threePolyGroupUVs[index].push(1)
			}
		}
	
		function convert_int16_16_vector(vector) {
			return [Math.round(vector[0] / 65536.0), Math.round(vector[1] / 65536.0), Math.round(vector[2] / 65536.0)]
		}

		let numTextures = 0
		let numOtherResources = 0

		for (let i = 0; i < levResources.numResources; i++) {
			let levResource = levResources.resources[i]

			if (levResource.resourceType == 130) {
				jsonData.push(fileTree.item("texture" + numTextures.toString(), "textures", "Texture " + numTextures.toString(), "./images/silk/picture.png", true))
				numTextures++

				const levTexture = levResource.data
				const levTexturePalette = levTexture.palette
				const levTextureBitmap = levTexture.bitmap

				const width = 64
				const height = 64

				const size = width * height
				const pixelData = new Uint8Array(4 * size)

				var outPalette = []

				// compute palette
				for (let i = 0; i < 16; i++) {
					outPalette.push([
						(levTexturePalette[i].r / 31) * 255,
						(levTexturePalette[i].g / 31) * 255,
						(levTexturePalette[i].b / 31) * 255,
						levTexturePalette[i].a * 255
					])
				}

				// compute texture
				for (let i = 0; i < size; i++) {
					const stride = i * 4

					pixelData[stride] = Math.round(outPalette[levTextureBitmap[i]][0])
					pixelData[stride + 1] = Math.round(outPalette[levTextureBitmap[i]][1])
					pixelData[stride + 2] = Math.round(outPalette[levTextureBitmap[i]][2])
					pixelData[stride + 3] = Math.round(outPalette[levTextureBitmap[i]][3])
				}

				let vertexShader = "attribute vec3 color; varying vec3 vColor; varying vec2 vUv; void main() { vColor = color; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }"
				let fragmentShader = "varying vec3 vColor; varying vec2 vUv; uniform sampler2D diffuse; void main() { vec4 color = texture2D(diffuse, vUv); color.rgb -= vec3(1.0) - vColor.rgb; gl_FragColor = vec4(color.rgb, 1.0); }"

				let threeMaterial = {
					"pixel_data": pixelData,
					"width": width,
					"height": height,
					"vertex_shader": vertexShader,
					"fragment_shader": fragmentShader
				}

				threeMaterials.push(threeMaterial)
				threePolyGroups.push([])
				threePolyGroupUVs.push([])
				threePolyGroupColors.push([])
			} else {
				jsonData.push(fileTree.item("resource" + numOtherResources.toString(), "resources", "Resource " + numOtherResources.toString(), "./images/silk/page.png", true))
				numOtherResources++
			}
		}

		// this loop is a bit of a mess so i'm going to explain it a bit
		// first, parse through all sectors
		for (let sectorID = 0; sectorID < levHeader.numSectors; sectorID++) {
			let levSector = levSectors[sectorID]
			// if the sector's plane IDs are valid, loop through them
			if (levSector.planeStartIndex > -1 && levSector.planeEndIndex < levHeader.numPlanes + 1) {
				for (let planeID = levSector.planeStartIndex; planeID < levSector.planeEndIndex + 1; planeID++) {
					let levPlane = levPlanes[planeID]
					// if the plane's quad IDs are valid, loop through them
					if (levPlane.quadStartIndex > -1 && levPlane.quadEndIndex < (levHeader.numQuads + 1)) {
						for (let quadID = levPlane.quadStartIndex; quadID < levPlane.quadEndIndex + 1; quadID++) {
							let levQuad = levQuads[quadID]

							// get coordinate vectors from each vertex of the quad
							let x = levVertices[levQuad.vertexIndices[0] + levPlane.vertexStartIndex]
							let y = levVertices[levQuad.vertexIndices[1] + levPlane.vertexStartIndex]
							let z = levVertices[levQuad.vertexIndices[2] + levPlane.vertexStartIndex]
							let a = levVertices[levQuad.vertexIndices[3] + levPlane.vertexStartIndex]

							// add first triangle (x, y, z)
							add_polygroup(
								{coords: x.coords, color: convert_vertex_color(x.colorLookup)},
								{coords: y.coords, color: convert_vertex_color(y.colorLookup)},
								{coords: z.coords, color: convert_vertex_color(z.colorLookup)},
								levQuad.textureIndex,
								0
							)

							// add second triangle (x, z, a)
							add_polygroup(
								{coords: x.coords, color: convert_vertex_color(x.colorLookup)},
								{coords: z.coords, color: convert_vertex_color(z.colorLookup)},
								{coords: a.coords, color: convert_vertex_color(a.colorLookup)},
								levQuad.textureIndex,
								1
							)
						}
					}
					// if the plane's tile IDs are valid, loop through them
					if (levPlane.tileIndex < levHeader.numTiles + 1) {
						let levTile = levTiles[levPlane.tileIndex]

						let base = levTile.baseVector
						let horizontal = levTile.horizontalVector
						let vertical = levTile.verticalVector

						for (let tileY = 0; tileY < levTile.height; tileY++) {
							for (let tileX = 0; tileX < levTile.width; tileX++) {
								let x = [base[0] + tileX * horizontal[0] + tileY * vertical[0], base[1] + tileX * horizontal[1] + tileY * vertical[1], base[2] + tileX * horizontal[2] + tileY * vertical[2]]
								let y = [x[0] + horizontal[0], x[1] + horizontal[1], x[2] + horizontal[2]]
								let z = [x[0] + horizontal[0] + vertical[0], x[1] + horizontal[1] + vertical[1], x[2] + horizontal[2] + vertical[2]]
								let a = [x[0] + vertical[0], x[1] + vertical[1], x[2] + vertical[2]]

								x = convert_int16_16_vector(x)
								y = convert_int16_16_vector(y)
								z = convert_int16_16_vector(z)
								a = convert_int16_16_vector(a)

								let points = levTile.width + 1
								let color_base = (tileY * points) + tileX

								let x_color = levTile.getColorData[color_base]
								let y_color = levTile.getColorData[color_base + 1]
								let z_color = levTile.getColorData[color_base + 1 + points]
								let a_color = levTile.getColorData[color_base + points]

								let tileIndex = (tileY * levTile.width) + tileX
								let textureIndex = levTile.getTileTextureData[(tileIndex * 2) + 1]

								// add first triangle (x, y, z)
								add_polygroup(
									{coords: x, color: convert_vertex_color(x_color)},
									{coords: y, color: convert_vertex_color(y_color)},
									{coords: z, color: convert_vertex_color(z_color)},
									textureIndex,
									0
								)

								// add second triangle (x, z, a)
								add_polygroup(
									{coords: x, color: convert_vertex_color(x_color)},
									{coords: z, color: convert_vertex_color(z_color)},
									{coords: a, color: convert_vertex_color(a_color)},
									textureIndex,
									1
								)
							}
						}
					}
				}
			}
		}

		let finalVerts = []
		let finalUVs = []
		let finalColors = []
		let finalGroups = []

		for (let i = 0; i < threePolyGroups.length; i++) {
			finalVerts.push(...threePolyGroups[i])
			finalUVs.push(...threePolyGroupUVs[i])
			finalColors.push(...threePolyGroupColors[i])
		}

		for (let i = 0; i < threePolyGroups.length; i++) {
			let stride = 0

			for (let x = 0; x < i; x++) {
				stride += threePolyGroups[x].length / 3
			}

			finalGroups.push({"start": stride, "count": threePolyGroups[i].length / 3, "material_index": i})
		}

		// convert to Float32Array, not sure if necessary
		finalVerts = new Float32Array(finalVerts)
		finalUVs = new Float32Array(finalUVs)
		finalColors = new Float32Array(finalColors)

		let threeObject = {"type": "threeMesh", "vertices": finalVerts, "colors": finalColors, "uvs": finalUVs, "groups": finalGroups, "materials": threeMaterials, "scale": [-1, 1, 1]}

		let threeInfo = {
			"objects": [threeObject],
			"camera_position": [1024, 1024, 1024],
			"camera_move_distance": [128, 4096]
		}

		window.webContents.send("buildThreeScene", threeInfo)

		for (let i = 0; i < levResources.numSounds; i++) {
			//let sound = levResources.sounds[i]
			jsonData.push(fileTree.item("sound" + i.toString(), "sounds", "Sound " + i.toString(), "./images/silk/sound.png", true))
		}

		let fileInfo = [
			["File Name: ", fileName],
			["File Type: ", "SlaveDriver Engine Level (Quake)"],
			["File Size: ", (data.length / 1000).toString() + " kilobytes"],
			["", ""],
			["Textures: ", numTextures.toString()],
			["Sounds: ", levResources.numSounds.toString()],
			["Other Resources: ", numOtherResources.toString()]
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