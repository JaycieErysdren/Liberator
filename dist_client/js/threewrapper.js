import * as THREE from "./dependencies/three.module.js"
import { OrbitControls } from "./dependencies/OrbitControls.js"

export {
	buildThreeScene
}

function buildThreeScene(data) {
	let camera, controls, scene, renderer

	let object_array = data["objects"]
	let campos = data["camera_position"]
	let camdist = data["camera_draw_distance"]

	init()
	render()

	function init() {
		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 8192)
		camera.position.set(campos[0], campos[1], campos[2])
		scene = new THREE.Scene()

		object_array.forEach(function(item) {
			if (item["type"] == "threeSprite") {
				let spriteMap = new THREE.DataTexture(item["pixel_data"], item["width"], item["height"]);
				spriteMap.needsUpdate = true;
				spriteMap.minFilter = THREE.NearestFilter	
		
				let spriteMaterial = new THREE.SpriteMaterial({map: spriteMap});
				let spriteObject = new THREE.Sprite(spriteMaterial);
				spriteObject.scale.set(item["width"], item["height"], 1)
				spriteObject.position.x = item["position"][0]
				spriteObject.position.y = item["position"][1]
				spriteObject.position.z = item["position"][2]

				scene.add(spriteObject)
			}
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