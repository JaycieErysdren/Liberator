import * as THREE from "./dependencies/three.module.js"
import { OrbitControls } from "./dependencies/OrbitControls.js"

export {
	buildThreeScene,
	clearThreeScene
}

function clearThreeScene() {
	let parent = document.getElementById("viewer")
	while (parent.lastChild) {
		parent.removeChild(parent.lastChild)
	}
}

function buildThreeScene(data) {
	let camera, controls, scene, renderer

	let object_array = data["objects"]
	let campos = data["camera_position"]
	let camdist = data["camera_move_distance"]

	init()
	render()

	function init() {
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 8192)
		camera.position.set(campos[0], campos[1], campos[2])
		scene = new THREE.Scene()

		object_array.forEach(function(item) {
			if (item["type"] == "threeSprite") {
				let spriteMap = new THREE.DataTexture(item["pixel_data"], item["width"], item["height"])
				spriteMap.minFilter = THREE.NearestFilter
				spriteMap.minFilter = THREE.NearestFilter
				spriteMap.needsUpdate = true

				let spriteMaterial = new THREE.SpriteMaterial({map: spriteMap})
				let spriteObject = new THREE.Sprite(spriteMaterial)
				spriteObject.scale.set(item["width"], item["height"], 1)
				spriteObject.position.x = item["position"][0]
				spriteObject.position.y = item["position"][1]
				spriteObject.position.z = item["position"][2]

				scene.add(spriteObject)
			} else if (item["type"] == "threeMesh") {
				let threeGeometry = new THREE.BufferGeometry()
				threeGeometry.setAttribute("position", new THREE.BufferAttribute(item["vertices"], 3))

				if (item["uvs"]) {
					threeGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(item["uvs"], 2))
				}

				if (item["groups"]) {
					for (let i = 0; i < item["groups"].length; i++) {
						let threeGroup = item["groups"][i]
						threeGeometry.addGroup(threeGroup["start"], threeGroup["count"], threeGroup["material_index"])
					}
				}

				if (item["colors"]) {
					threeGeometry.setAttribute("color", new THREE.Float32BufferAttribute(item["colors"], 3))
				}

				let finalMaterials

				if (item["materials"]) {
					let threeMaterials = []

					for (let i = 0; i < item["materials"].length; i++) {
						let inMaterial = item["materials"][i]
						let inWidth = inMaterial["width"]
						let inHeight = inMaterial["height"]
						let inPixelData = inMaterial["pixel_data"]
						let inVertexShader = inMaterial["vertex_shader"]
						let inFragmentShader = inMaterial["fragment_shader"]

						let outTexture = new THREE.DataTexture(inPixelData, inWidth, inHeight)
						outTexture.minFilter = THREE.NearestFilter
						outTexture.magFilter = THREE.NearestFilter
						outTexture.needsUpdate = true

						let shaderUniforms = {
							diffuse: { type: "t", value: outTexture }
						}

						let outMaterial = new THREE.ShaderMaterial({
							uniforms: shaderUniforms,
							vertexShader: inVertexShader,
							fragmentShader: inFragmentShader
						})

						threeMaterials.push(outMaterial)
					}

					finalMaterials = threeMaterials
				} else {
					finalMaterials = new THREE.MeshBasicMaterial()
				}

				let threeMesh = new THREE.Mesh(threeGeometry, finalMaterials)
				threeMesh.updateMatrix()

				let threeGroup = new THREE.Group()
				threeGroup.add(threeMesh)

				if (item["scale"]) {
					threeGroup.scale.copy(new THREE.Vector3(item["scale"][0], item["scale"][1], item["scale"][2]))
				} else {
					threeGroup.scale.copy(new THREE.Vector3(1, 1, 1))
				}

				new THREE.Box3().setFromObject( threeGroup ).getCenter( threeGroup.position ).multiplyScalar( - 1 )

				scene.add(threeGroup)
			}
		})

		scene.background = new THREE.Color(0x909090)

		renderer = new THREE.WebGLRenderer({antialias: true})
		clearThreeScene()
		document.getElementById("viewer").appendChild(renderer.domElement)
		resizeCanvasToDisplaySize()

		controls = new OrbitControls( camera, renderer.domElement )
		controls.addEventListener("change", render)
		controls.minDistance = camdist[0]
		controls.maxDistance = camdist[1]
		controls.maxPolarAngle = Math.PI / 2
	}

	function resizeCanvasToDisplaySize() {
		let canvas = document.getElementById("viewer")
		let width = canvas.clientWidth
		let height = canvas.clientHeight

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
