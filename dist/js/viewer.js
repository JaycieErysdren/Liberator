import * as THREE from '/js/three.module.js'
import { OrbitControls } from '/js/OrbitControls.js'
import { GUI } from "/js/lil-gui.module.min.js"

export {
	load_lev, // SlaveDriver Engine level
	load_pix, // BRender Engine pixelmap
	load_pic, // SlaveDriver Engine bitmap (quake)
	load_pcs, // SlaveDriver Engine bitmap (powerslave)
	load_tmf, // Tank Engine model
	load_ms3dmm_chunk, // Microsoft 3D Movie Maker Chunk
}

function construct_gui_panel() {

	const panel = new GUI( { autoPlace: false } )
	panel.domElement.id = "viewer-controls"
	document.getElementById("viewer").appendChild(panel.domElement)
	const folder1 = panel.addFolder("visibility")

	let settings = {
		"show asset": true
	}

	folder1.add(settings, "show asset")
}

function construct_scene(object_array, campos, camdist) {
	let camera, controls, scene, renderer;

	init()
	render()

	function init() {
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 8192)
		camera.position.set(campos[0], campos[1], campos[2])
		scene = new THREE.Scene()

		object_array.forEach(function(item) {
			scene.add(item)
		})

		scene.background = new THREE.Color(0x909090)

		renderer = new THREE.WebGLRenderer({antialias: true})
		removeChildren(document.getElementById("viewer"))
		document.getElementById("viewer").appendChild(renderer.domElement)
		resizeCanvasToDisplaySize()

		controls = new OrbitControls( camera, renderer.domElement )
		controls.addEventListener("change", render)
		controls.minDistance = camdist[0]
		controls.maxDistance = camdist[1]
		controls.maxPolarAngle = Math.PI / 2
	}

	function removeChildren(parent) {
		while (parent.lastChild) {
			parent.removeChild(parent.lastChild)
		}
	}

	function resizeCanvasToDisplaySize() {
		const canvas = document.getElementById("viewer")
		const width = canvas.clientWidth
		const height = canvas.clientHeight
	  
		if (canvas.width !== width || canvas.height !== height) {
			renderer.setSize(width, height)
			camera.aspect = width / height
			camera.updateProjectionMatrix()
			render()
		}
	}

	window.addEventListener("resize", resizeCanvasToDisplaySize, false )

	function render() {
		renderer.render(scene, camera)
	}
}

function load_ms3dmm_chunk(arrayBuffer, filename) {
	var chunkFile = new Ms3dmmChunk(new KaitaiStream(arrayBuffer));

	// parse chunk indexes

	const chunkIndex = chunkFile.chunkIndex

	function display_palette(chunk) {
		let chunkPalette = chunk.chunkData.data

		let width = 16
		let height = 16

		let size = width * height
		let data = new Uint8Array(4 * size)

		let i = 0

		// compute texture, accounting for big endian
		for (let y = 0; y < height; y++) {
			for (let x = 0; x < height; x++) {
				let stride = i * 4
				let pos = (((height - y - 1) * width) + x) * 4

				data[stride] = chunkPalette[pos]
				data[stride + 1] = chunkPalette[pos] + 1
				data[stride + 2] = chunkPalette[pos] + 2
				data[stride + 3] = 255

				i += 1
			}
		}

		// compute texture
		for (let i = 0; i < size; i++) {
			let stride = i * 4

			data[stride] = chunkPalette[stride]
			data[stride + 1] = chunkPalette[stride + 1]
			data[stride + 2] = chunkPalette[stride + 2]
			data[stride + 3] = 255
		}

		let spriteMap = new THREE.DataTexture(data, width, height);
		spriteMap.needsUpdate = true;
		spriteMap.minFilter = THREE.NearestFilter
	
		let spriteMaterial = new THREE.SpriteMaterial({map: spriteMap});
		let spriteObject = new THREE.Sprite(spriteMaterial);
		spriteObject.scale.set(width, height, 1)
		spriteObject.position.x = 0
		spriteObject.position.y = 0
		spriteObject.position.z = 0
	
		construct_scene([spriteObject], [width + height, 0, 0], [128, 4096])
	}

	for (let i = 0; i < chunkFile.fileIndex.numChunks; i++) {
		let chunk = chunkIndex[i].chunk
		console.log(chunk.authorProgram)
		if (chunk.authorProgram == "RCLG") {
			display_palette(chunk)
		}
	}
}

function load_tmf(arrayBuffer, filename) {
	var tmfFile = new TankengineTmf(new KaitaiStream(arrayBuffer));

	clearHTMLbyID("file-info")
	fileInfoAddMessage("<span class='good'>File Type:</span> Tank Engine Model")
	fileInfoAddMessage("")
	fileInfoAddMessage("<span class='good'>Textures:</span> " + tmfFile.header.numTextures)
	fileInfoAddMessage("<span class='good'>Meshes:</span> " + tmfFile.header.numMeshes)

	// three.js objects
	let tmfGroup = new THREE.Group()

	// input data
	const tmfMeshes = tmfFile.meshes
	const tmfTextures = tmfFile.textures

	for (let meshNum = 0; meshNum < tmfFile.header.numMeshes; meshNum++) {
		let tmfSubMesh = tmfMeshes[meshNum]

		let uvs = []
		let verts = []

		let verts_temp = []

		// xyz then xya

		for (let vertexNum = 0; vertexNum < tmfSubMesh.header.numVertices; vertexNum++) {
			let coords = tmfSubMesh.vertices[vertexNum].coords
			verts_temp.push([coords[0], coords[1], coords[2]])
		}

		console.log(verts_temp)

		for (let quadNum = 0; quadNum < tmfSubMesh.header.numQuads; quadNum++) {
			let quad = tmfSubMesh.quads[quadNum]
			let x = verts_temp[quad.vertexIndices[0]]
			let y = verts_temp[quad.vertexIndices[1]]
			let z = verts_temp[quad.vertexIndices[2]]
			let a = verts_temp[quad.vertexIndices[3]]
			// first tri
			verts.push(x[0] / 65536, x[1] / 65536, x[2] / 65536)
			verts.push(y[0] / 65536, y[1] / 65536, y[2] / 65536)
			verts.push(z[0] / 65536, z[1] / 65536, z[2] / 65536)
			// second tri
			verts.push(x[0] / 65536, x[1] / 65536, x[2] / 65536)
			verts.push(z[0] / 65536, z[1] / 65536, z[2] / 65536)
			verts.push(a[0] / 65536, a[1] / 65536, a[2] / 65536)
		}

		let threeVertices = new Float32Array(verts)
		let threeUVs = new Float32Array(uvs)

		console.log(threeVertices)

		let tmfGeometry = new THREE.BufferGeometry()
		tmfGeometry.setAttribute("position", new THREE.BufferAttribute(threeVertices, 3));

		let tmfMaterial = new THREE.MeshBasicMaterial()
		let tmfMesh = new THREE.Mesh(tmfGeometry, tmfMaterial);
		tmfMesh.updateMatrix();

		tmfGroup.add(tmfMesh)
	}

	let scale = new THREE.Vector3(1, -1, 1)
	tmfGroup.scale.copy(scale);

	construct_scene([tmfGroup], [32, 32, 32], [2, 64])
}

function load_pcs(arrayBuffer, filename) {
	var pcsFile = new SlavedriverPcsPowerslave(new KaitaiStream(arrayBuffer));

	clearHTMLbyID("file-info")
	fileInfoAddMessage("<span class='good'>File Type:</span> SlaveDriver Bitmap")
	fileInfoAddMessage("")
	fileInfoAddMessage("<span class='good'>Width:</span> " + pcsFile.bitmaps[0].width)
	fileInfoAddMessage("<span class='good'>Height:</span> " + pcsFile.bitmaps[0].height)

	const pcsPalette = pcsFile.bitmaps[0].palette
	const pcsData = pcsFile.bitmaps[0].bitmap

	const width = pcsFile.bitmaps[0].width
	const height = pcsFile.bitmaps[0].height

	const size = width * height
	const data = new Uint8Array(4 * size)

	let palette = []

	// compute palette
	for (let i = 0; i < 256; i++) {
		palette.push([
			Math.round((pcsPalette[i].r / 31) * 255),
			Math.round((pcsPalette[i].g / 31) * 255),
			Math.round((pcsPalette[i].b / 31) * 255),
			Math.round(pcsPalette[i].a * 255)
		])
	}

	let i = 0

	// compute texture, accounting for big endian
	for (let y = 0; y < height; y++) {
		for (let x = 0; x < width; x++) {
			let stride = i * 4
			let pos = ((height - y - 1) * width) + x

			data[stride] = palette[pcsData[pos]][0]
			data[stride + 1] = palette[pcsData[pos]][1]
			data[stride + 2] = palette[pcsData[pos]][2]
			data[stride + 3] = palette[pcsData[pos]][3]

			i += 1
		}
	}

	let spriteMap = new THREE.DataTexture(data, width, height);
	spriteMap.needsUpdate = true;
	spriteMap.minFilter = THREE.NearestFilter

	let spriteMaterial = new THREE.SpriteMaterial({map: spriteMap});
	let spriteObject = new THREE.Sprite(spriteMaterial);
	spriteObject.scale.set(width, height, 1)
	spriteObject.position.x = 0
	spriteObject.position.y = 0
	spriteObject.position.z = 0

	construct_scene([spriteObject], [width + height, 0, 0], [128, 4096])
	//construct_gui_panel()
}

function load_pic(arrayBuffer, filename) {
	var picFile = new SlavedriverPicQuake(new KaitaiStream(arrayBuffer));

	clearHTMLbyID("file-info")
	fileInfoAddMessage("<span class='good'>File Type:</span> SlaveDriver Bitmap")
	fileInfoAddMessage("")
	fileInfoAddMessage("<span class='good'>Width:</span> " + picFile.width)
	fileInfoAddMessage("<span class='good'>Height:</span> " + picFile.height)

	clearHTMLbyID("file-structure-tree")
	let fs_root = startTree("file-structure-tree", filename)
	let fs_palette = addTreeItem(fs_root, "palette", null)
	let fs_width = addTreeItem(fs_root, "width", picFile.width)
	let fs_height = addTreeItem(fs_root, "height", picFile.height)
	let fs_bitmap = addTreeItem(fs_root, "bitmap", null)

	const picPalette = picFile.palette
	const picData = picFile.bitmap

	const width = picFile.width
	const height = picFile.height

	const size = width * height
	const data = new Uint8Array(4 * size)

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

			data[stride] = palette[picData[pos]][0]
			data[stride + 1] = palette[picData[pos]][1]
			data[stride + 2] = palette[picData[pos]][2]
			data[stride + 3] = palette[picData[pos]][3]

			i += 1
		}
	}

	let spriteMap = new THREE.DataTexture(data, width, height);
	spriteMap.needsUpdate = true;
	spriteMap.minFilter = THREE.NearestFilter

	let spriteMaterial = new THREE.SpriteMaterial({map: spriteMap});
	let spriteObject = new THREE.Sprite(spriteMaterial);
	spriteObject.scale.set(width, height, 1)
	spriteObject.position.x = 0
	spriteObject.position.y = 0
	spriteObject.position.z = 0

	construct_scene([spriteObject], [width + height, 0, 0], [128, 4096])
}

function load_pix(arrayBuffer, filename) {
	var pixFile = new BrenderPix(new KaitaiStream(arrayBuffer));

	if (pixFile.bitmapType != 3) {
		consoleAddMessage("<span class='error'>Error:</span> Unsupprted type in pixelmap: " + pixFile.bitmapType)
		return
	}

	clearHTMLbyID("file-info")
	fileInfoAddMessage("<span class='good'>File Type:</span> BRender Pixelmap")
	fileInfoAddMessage("")
	fileInfoAddMessage("<span class='good'>Pixelmap Type:</span> " + pixFile.bitmapType)
	fileInfoAddMessage("<span class='good'>Internal Identifier:</span> " + pixFile.header.identifier)
	fileInfoAddMessage("")
	fileInfoAddMessage("<span class='good'>Width:</span> " + pixFile.header.width)
	fileInfoAddMessage("<span class='good'>Height:</span> " + pixFile.header.height)

	clearHTMLbyID("file-structure-tree")
	let fs_root = startTree("file-structure-tree", filename)
	let fs_magic = addTreeItem(fs_root, "magic", "0x0 0x0 0x0 0x12, 0x0 0x0 0x0 0x08, 0x0 0x0 0x0 0x02, 0x0 0x0 0x0 0x02")
	let fs_bitmaptype = addTreeItem(fs_root, "bitmapType", pixFile.bitmapType)
	let fs_header = addTreeItem(fs_root, "header", null)
	let fs_header_01 = addTreeItem(fs_header, "lenHeader", pixFile.header.lenHeader)
	let fs_header_02 = addTreeItem(fs_header, "bitmapType", pixFile.header.bitmapType)
	let fs_header_03 = addTreeItem(fs_header, "rowBytes", pixFile.header.rowBytes)
	let fs_header_04 = addTreeItem(fs_header, "width", pixFile.header.width)
	let fs_header_05 = addTreeItem(fs_header, "height", pixFile.header.height)
	let fs_header_06 = addTreeItem(fs_header, "originX", pixFile.header.originX)
	let fs_header_07 = addTreeItem(fs_header, "originY", pixFile.header.originY)
	let fs_header_08 = addTreeItem(fs_header, "identifier", pixFile.header.identifier)

	const pixPalette = pixFile.bitmap.paletteData
	const pixData = pixFile.bitmap.imageData

	const width = pixFile.header.width
	const height = pixFile.header.height

	const size = width * height
	const data = new Uint8Array( 4 * size)

	let palette = []

	// compute palette
	for (let i = 0; i < 256; i++) {
		palette.push([
			Math.round(pixPalette[i].r),
			Math.round(pixPalette[i].g),
			Math.round(pixPalette[i].b),
			255
		])
	}

	// compute texture
	for (let i = 0; i < size; i++) {
		const stride = i * 4

		data[stride] = palette[pixData[i]][0]
		data[stride + 1] = palette[pixData[i]][1]
		data[stride + 2] = palette[pixData[i]][2]
		data[stride + 3] = palette[pixData[i]][3]
	}

	let spriteMap = new THREE.DataTexture(data, width, height);
	spriteMap.needsUpdate = true;
	spriteMap.minFilter = THREE.NearestFilter

	let spriteMaterial = new THREE.SpriteMaterial({map: spriteMap});
	let spriteObject = new THREE.Sprite(spriteMaterial);
	spriteObject.scale.set(width, height, 1)
	spriteObject.position.x = 0
	spriteObject.position.y = 0
	spriteObject.position.z = 0

	construct_scene([spriteObject], [width + height, 0, 0], [128, 4096])
}

function load_lev(arrayBuffer, filename, game) {
	if (game == "QUAKE") {
		var levFile = new SlavedriverLevQuake(new KaitaiStream(arrayBuffer));
	}
	else if (game == "DUKE") {
		var levFile = new SlavedriverLevDuke(new KaitaiStream(arrayBuffer));
	}

	// three.js arrays
	var levMaterials = [];
	let levPolyGroups = [];
	let levPolyGroupUVs = [];
	let levPolyGroupColors = [];

	// parsed kaitaistruct arrays
	var levVertices = levFile.vertices;
	var levQuads = levFile.quads;
	var levSectors = levFile.sectors;
	var levHeader = levFile.header;
	var levPlanes = levFile.planes;
	var levTiles = levFile.tiles;
	var levResources = levFile.resources;

	var lev_saturncolors = [
		[-16,-16,-16],	[-16,-15,-15],	[-15,-14,-14],
		[-14,-13,-13],	[-13,-12,-12],	[-12,-11,-11],
		[-11,-10,-10],	[-10,-9,-9],	[-9,-8,-8],
		[-8,-7,-7],		[-7,-6,-6],		[-6,-5,-5],
		[-5,-4,-4],		[-4,-3,-3],		[-3,-2,-2],
		[-2,-1,-1],		[-1,0,0],		[0,0,0]
	]

	function convert_vertex_color(lookup) {
		var color_out = []
		var color_in = lev_saturncolors[lookup]

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
		add_vertex(levPolyGroups[index], x.coords)
		add_vertex(levPolyGroups[index], y.coords)
		add_vertex(levPolyGroups[index], z.coords)

		levPolyGroupColors[index].push(x.color[0])
		levPolyGroupColors[index].push(x.color[1])
		levPolyGroupColors[index].push(x.color[2])

		levPolyGroupColors[index].push(y.color[0])
		levPolyGroupColors[index].push(y.color[1])
		levPolyGroupColors[index].push(y.color[2])

		levPolyGroupColors[index].push(z.color[0])
		levPolyGroupColors[index].push(z.color[1])
		levPolyGroupColors[index].push(z.color[2])

		if (tri_num == 0) {
			// vertex 1
			levPolyGroupUVs[index].push(0)
			levPolyGroupUVs[index].push(0)
			// vertex 2
			levPolyGroupUVs[index].push(1)
			levPolyGroupUVs[index].push(0)
			// vertex 3
			levPolyGroupUVs[index].push(1)
			levPolyGroupUVs[index].push(1)
		}
		else if (tri_num == 1) {
			// vertex 1
			levPolyGroupUVs[index].push(0)
			levPolyGroupUVs[index].push(0)
			// vertex 2
			levPolyGroupUVs[index].push(1)
			levPolyGroupUVs[index].push(1)
			// vertex 3
			levPolyGroupUVs[index].push(0)
			levPolyGroupUVs[index].push(1)
		}
	}

	function convert_int16_16_vector(vector) {
		return [Math.round(vector[0] / 65536.0), Math.round(vector[1] / 65536.0), Math.round(vector[2] / 65536.0)]
	}

	// loop through all embedded resources and generate textures for the bitmaps
	for (let resourceID = 0; resourceID < levResources.numResources; resourceID++) {
		const levResource = levResources.resources[resourceID]
		if (levResource.resourceType == 130) {
			const levTexture = levResource.data
			const levTexturePalette = levTexture.palette
			const levTextureBitmap = levTexture.bitmap

			const width = 64
			const height = 64

			const size = width * height
			const data = new Uint8Array( 4 * size)

			var palette = []

			// compute palette
			for (let i = 0; i < 16; i++) {
				palette.push([
					(levTexturePalette[i].r / 31) * 255,
					(levTexturePalette[i].g / 31) * 255,
					(levTexturePalette[i].b / 31) * 255,
					(levTexturePalette[i].a / 31) * 255
				])
			}

			// compute texture
			for (let i = 0; i < size; i++) {
				const stride = i * 4

				data[stride] = Math.round(palette[levTextureBitmap[i]][0])
				data[stride + 1] = Math.round(palette[levTextureBitmap[i]][1])
				data[stride + 2] = Math.round(palette[levTextureBitmap[i]][2])
				data[stride + 3] = Math.round(palette[levTextureBitmap[i]][3])
			}

			const texture = new THREE.DataTexture(data, width, height);
			texture.needsUpdate = true;
			texture.minFilter = THREE.NearestFilter

			const shaderUniforms = { 
				diffuse: { type: "t", value: texture }
			}

			const vertexShader = "attribute vec3 color; varying vec3 vColor; varying vec2 vUv; void main() { vColor = color; vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }"
			const fragmentShader = "varying vec3 vColor; varying vec2 vUv; uniform sampler2D diffuse; void main() { vec4 color = texture2D(diffuse, vUv); color.rgb -= vec3(1.0) - vColor.rgb; gl_FragColor = vec4(color.rgb, 1.0); }"

			const material = new THREE.ShaderMaterial({
				uniforms: shaderUniforms,
				vertexShader: vertexShader,
				fragmentShader: fragmentShader,
			})

			levMaterials.push(material)
			levPolyGroups.push([])
			levPolyGroupUVs.push([])
			levPolyGroupColors.push([])
		}
	}

	// populate file info window

	clearHTMLbyID("file-info")
	fileInfoAddMessage("<span class='good'>File Name:</span> " + filename)
	fileInfoAddMessage("<span class='good'>File Type:</span> SlaveDriver Level")
	fileInfoAddMessage("")
	fileInfoAddMessage("<span class='good'>Internal Level Name:</span> " + levFile.levelName)
	fileInfoAddMessage("")
	fileInfoAddMessage("<span class='good'>Vertices:</span> " + levHeader.numVertices)
	fileInfoAddMessage("<span class='good'>Sectors:</span> " + levHeader.numSectors)
	fileInfoAddMessage("<span class='good'>Planes:</span> " + levHeader.numPlanes)
	fileInfoAddMessage("<span class='good'>Quads:</span> " + levHeader.numQuads)
	fileInfoAddMessage("<span class='good'>Tiles:</span> " + levHeader.numTiles)
	fileInfoAddMessage("")
	fileInfoAddMessage("<span class='good'>Entities:</span> " + levHeader.numEntities)
	fileInfoAddMessage("<span class='good'>Entity Polylinks:</span> " + levHeader.numEntityPolylinks)
	fileInfoAddMessage("")
	fileInfoAddMessage("<span class='good'>Textures:</span> " + levMaterials.length)
	fileInfoAddMessage("<span class='good'>Sounds:</span> " + levResources.numSounds)
	fileInfoAddMessage("<span class='good'>Other Resources:</span> " + (levResources.numResources - levMaterials.length))


	// populate file structure window
	// todo: find a cleaner way to do this

	clearHTMLbyID("file-structure-tree")
	let fs_root = startTree("file-structure-tree", filename)
	let fs_skyData = addTreeItem(fs_root, "skyData", null)
	let fs_skyData_01 = addTreeItem(fs_skyData, "palette", null)
	let fs_skyData_02 = addTreeItem(fs_skyData, "bitmaps", null)
	let fs_header = addTreeItem(fs_root, "header", null)
	let fs_header_01 = addTreeItem(fs_header, "unknown01", levHeader.unknown01)
	let fs_header_02 = addTreeItem(fs_header, "unknown02", levHeader.unknown02)
	let fs_header_03 = addTreeItem(fs_header, "numSectors", levHeader.numSectors)
	let fs_header_04 = addTreeItem(fs_header, "numPlanes", levHeader.numPlanes)
	let fs_header_05 = addTreeItem(fs_header, "numVertices", levHeader.numVertices)
	let fs_header_06 = addTreeItem(fs_header, "numQuads", levHeader.numQuads)
	let fs_header_07 = addTreeItem(fs_header, "lenTileTextureData", levHeader.lenTileTextureData)
	let fs_header_08 = addTreeItem(fs_header, "numTiles", levHeader.numTiles)
	let fs_header_09 = addTreeItem(fs_header, "lenTileColorData", levHeader.lenTileColorData)
	let fs_header_10 = addTreeItem(fs_header, "numEntities", levHeader.numEntities)
	let fs_header_11 = addTreeItem(fs_header, "lenEntityData", levHeader.lenEntityData)
	let fs_header_12 = addTreeItem(fs_header, "numEntityPolylinks", levHeader.numEntityPolylinks)
	let fs_header_13 = addTreeItem(fs_header, "numEntityPolylinkData1Segments", levHeader.numEntityPolylinkData1Segments)
	let fs_header_14 = addTreeItem(fs_header, "numEntityPolylinkData2Segments", levHeader.numEntityPolylinkData2Segments)
	let fs_header_15 = addTreeItem(fs_header, "numUnknown", levHeader.numUnknown)

	// this loop is a bit of a mess so i'm going to explain it a bit
	// first, parse through all sectors
	for (let sectorID = 0; sectorID < levHeader.numSectors; sectorID++) {
		const levSector = levSectors[sectorID]
		// if the sector's plane IDs are valid, loop through them
		if (levSector.planeStartIndex > -1 && levSector.planeEndIndex < levHeader.numPlanes + 1) {
			for (let planeID = levSector.planeStartIndex; planeID < levSector.planeEndIndex + 1; planeID++) {
				const levPlane = levPlanes[planeID]
				// if the plane's quad IDs are valid, loop through them
				if (levPlane.quadStartIndex > -1 && levPlane.quadEndIndex < (levHeader.numQuads + 1)) {
					for (let quadID = levPlane.quadStartIndex; quadID < levPlane.quadEndIndex + 1; quadID++) {
						const levQuad = levQuads[quadID]

						// get coordinate vectors from each vertex of the quad
						const x = levVertices[levQuad.vertexIndices[0] + levPlane.vertexStartIndex]
						const y = levVertices[levQuad.vertexIndices[1] + levPlane.vertexStartIndex]
						const z = levVertices[levQuad.vertexIndices[2] + levPlane.vertexStartIndex]
						const a = levVertices[levQuad.vertexIndices[3] + levPlane.vertexStartIndex]

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
					const levTile = levTiles[levPlane.tileIndex]

					const base = levTile.baseVector
					const horizontal = levTile.horizontalVector
					const vertical = levTile.verticalVector

					for (let tileY = 0; tileY < levTile.height; tileY++) {
						for (let tileX = 0; tileX < levTile.width; tileX++) {
							var x = [base[0] + tileX * horizontal[0] + tileY * vertical[0], base[1] + tileX * horizontal[1] + tileY * vertical[1], base[2] + tileX * horizontal[2] + tileY * vertical[2]]
							var y = [x[0] + horizontal[0], x[1] + horizontal[1], x[2] + horizontal[2]]
							var z = [x[0] + horizontal[0] + vertical[0], x[1] + horizontal[1] + vertical[1], x[2] + horizontal[2] + vertical[2]]
							var a = [x[0] + vertical[0], x[1] + vertical[1], x[2] + vertical[2]]

							x = convert_int16_16_vector(x)
							y = convert_int16_16_vector(y)
							z = convert_int16_16_vector(z)
							a = convert_int16_16_vector(a)

							var points = levTile.width + 1
							var color_base = (tileY * points) + tileX

							var x_color = levTile.getColorData[color_base]
							var y_color = levTile.getColorData[color_base + 1]
							var z_color = levTile.getColorData[color_base + 1 + points]
							var a_color = levTile.getColorData[color_base + points]

							var tileIndex = (tileY * levTile.width) + tileX
							var textureIndex = levTile.getTileTextureData[(tileIndex * 2) + 1]

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

	var verts = []
	var uvs = []
	var colors = []

	for (let x = 0; x < levPolyGroups.length; x++) {
		verts.push(...levPolyGroups[x])
		uvs.push(...levPolyGroupUVs[x])
		colors.push(...levPolyGroupColors[x])
	}

	// three.js geometry arrays
	const threeVertices = new Float32Array(verts);
	const threeUVs = new Float32Array(uvs);

	const levGeometry = new THREE.BufferGeometry();
	levGeometry.setAttribute("position", new THREE.BufferAttribute(threeVertices, 3));
	levGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(threeUVs, 2));

	// vertex colors
	const vertexCount = levGeometry.attributes.position.count

	for (let x = 0; x < levPolyGroups.length; x++) {
		let stride = 0

		for (let i = 0; i < x; i++) {
			stride += levPolyGroups[i].length / 3
		}

		levGeometry.addGroup(stride, levPolyGroups[x].length / 3, x)
	}

	const threeColors = new Float32Array(colors);
	levGeometry.setAttribute("color", new THREE.Float32BufferAttribute(threeColors, 3));

	const levMaterial = new THREE.MeshBasicMaterial()
	const levMesh = new THREE.Mesh(levGeometry, levMaterials);
	levMesh.updateMatrix();

	let levGroup = new THREE.Group();
	levGroup.add(levMesh)

	const scale = new THREE.Vector3(-1, 1, 1)
	levGroup.scale.copy(scale);
	new THREE.Box3().setFromObject( levGroup ).getCenter( levGroup.position ).multiplyScalar( - 1 );

	construct_scene([levGroup], [1024, 1024, 1024], [128, 4096])
}