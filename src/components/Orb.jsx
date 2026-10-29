import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// A quiet, generative 3D field lives behind the navigation: a soft moving constellation.
export default function NavWorld() {
  const mountRef = useRef(null)
  useEffect(() => {
    const host = mountRef.current
    if (!host) return
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, 1, .1, 100)
    camera.position.z = 7
    const renderer = new THREE.WebGLRenderer({ alpha:true, antialias:true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.setClearColor(0x000000, 0)
    host.appendChild(renderer.domElement)
    const count = 110
    const positions = new Float32Array(count * 3)
    const base = new Float32Array(count * 3)
    for (let i=0;i<count;i++) {
      const x = (Math.random()-.5)*12
      const y = (Math.random()-.5)*3.4
      const z = (Math.random()-.5)*2
      positions.set([x,y,z],i*3); base.set([x,y,z],i*3)
    }
    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position',new THREE.BufferAttribute(positions,3))
    const material = new THREE.PointsMaterial({ color:0x5d5d55, size:.018, transparent:true, opacity:.62, sizeAttenuation:true })
    const points = new THREE.Points(geometry,material)
    scene.add(points)
    const linePositions = []
    for(let i=0;i<count;i++) {
      let nearest=-1, distance=1.5
      for(let j=i+1;j<count;j++) {
        const dx=base[i*3]-base[j*3],dy=base[i*3+1]-base[j*3+1],dz=base[i*3+2]-base[j*3+2]
        const d=Math.sqrt(dx*dx+dy*dy+dz*dz)
        if(d<distance){distance=d;nearest=j}
      }
      if(nearest>=0) linePositions.push(base[i*3],base[i*3+1],base[i*3+2],base[nearest*3],base[nearest*3+1],base[nearest*3+2])
    }
    const lineGeometry = new THREE.BufferGeometry()
    lineGeometry.setAttribute('position',new THREE.Float32BufferAttribute(linePositions,3))
    const lineMaterial = new THREE.LineBasicMaterial({ color:0x77776e,transparent:true,opacity:.12 })
    const lines = new THREE.LineSegments(lineGeometry,lineMaterial)
    scene.add(lines)
    let frame=0, pointerX=0, pointerY=0, targetX=0, targetY=0
    const resize=()=>{const w=Math.max(host.clientWidth,1),h=Math.max(host.clientHeight,1);camera.aspect=w/h;camera.updateProjectionMatrix();renderer.setSize(w,h,false)}
    const onMove=e=>{const r=host.getBoundingClientRect();targetX=(e.clientX-r.left)/r.width-.5;targetY=(e.clientY-r.top)/r.height-.5}
    host.addEventListener('pointermove',onMove)
    const observer=new ResizeObserver(resize);observer.observe(host);resize()
    const animate=()=>{
      frame=requestAnimationFrame(animate)
      const t=performance.now()*.00025
      pointerX+=(targetX-pointerX)*.018;pointerY+=(targetY-pointerY)*.018
      for(let i=0;i<count;i++){positions[i*3+1]=base[i*3+1]+Math.sin(t*2+i*.55)*.08;positions[i*3]+=Math.cos(t+i*.19)*.025}
      geometry.attributes.position.needsUpdate=true
      points.rotation.y=pointerX*.12+Math.sin(t)*.04
      points.rotation.x=pointerY*.08
      lines.rotation.copy(points.rotation)
      renderer.render(scene,camera)
    }
    const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if(!reduce) animate(); else renderer.render(scene,camera)
    return ()=>{cancelAnimationFrame(frame);observer.disconnect();host.removeEventListener('pointermove',onMove);geometry.dispose();material.dispose();lineGeometry.dispose();lineMaterial.dispose();renderer.dispose();renderer.domElement.remove()}
  },[])
  return <div ref={mountRef} className="nav-world" aria-hidden="true"/>
}
