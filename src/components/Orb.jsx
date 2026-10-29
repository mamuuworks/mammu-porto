import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Orb() {
  const mountRef = useRef(null)
  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100)
    camera.position.z = 5.2
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.setClearColor(0x000000, 0)
    mount.appendChild(renderer.domElement)
    const geometry = new THREE.IcosahedronGeometry(1.34, 5)
    const material = new THREE.MeshStandardMaterial({ color: 0x777777, roughness: .28, metalness: .72, wireframe: true })
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)
    const inner = new THREE.Mesh(new THREE.IcosahedronGeometry(.78, 3), new THREE.MeshStandardMaterial({ color: 0x202020, roughness: .32, metalness: .5, wireframe: true }))
    scene.add(inner)
    const light = new THREE.PointLight(0xffffff, 30)
    light.position.set(2, 3, 4)
    scene.add(light, new THREE.AmbientLight(0xffffff, 1.6))
    let frame, pointerX = 0, pointerY = 0
    const onMove = (e) => { const r = mount.getBoundingClientRect(); pointerX = ((e.clientX-r.left)/r.width-.5)*.5; pointerY = ((e.clientY-r.top)/r.height-.5)*.5 }
    mount.addEventListener('pointermove', onMove)
    const animate = () => {
      frame = requestAnimationFrame(animate)
      mesh.rotation.y += .0027; mesh.rotation.x += .0011
      inner.rotation.y -= .0038; inner.rotation.z += .0015
      mesh.rotation.x += (pointerY-mesh.rotation.x)*.002
      mesh.rotation.y += pointerX*.002
      renderer.render(scene, camera)
    }
    animate()
    const resize = () => { if (!mount.clientWidth) return; camera.aspect = mount.clientWidth / mount.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(mount.clientWidth, mount.clientHeight) }
    const observer = new ResizeObserver(resize); observer.observe(mount)
    return () => { cancelAnimationFrame(frame); observer.disconnect(); mount.removeEventListener('pointermove', onMove); geometry.dispose(); material.dispose(); inner.geometry.dispose(); inner.material.dispose(); renderer.dispose(); renderer.domElement.remove() }
  }, [])
  return <div ref={mountRef} className="absolute inset-0" aria-label="Abstract animated 3D wireframe sculpture" role="img" />
}