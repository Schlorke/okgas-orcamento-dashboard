"use client"

import * as THREE from "three"
import { useMemo, useState, useRef, useEffect } from "react"
import { createPortal, useFrame } from "@react-three/fiber"
import { useFBO } from "@react-three/drei"

import { DofPointsMaterial } from "./shaders/pointMaterial"
import { SimulationMaterial } from "./shaders/simulationMaterial"

interface ParticlesProps {
  speed: number
  aperture: number
  focus: number
  size?: number
  noiseScale?: number
  noiseIntensity?: number
  timeScale?: number
  pointSize?: number
  opacity?: number
  planeScale?: number
  introspect?: boolean
}

export function Particles({
  speed,
  aperture,
  focus,
  size = 512,
  noiseScale = 1.0,
  noiseIntensity = 0.5,
  timeScale = 0.5,
  pointSize = 2.0,
  opacity = 1.0,
  planeScale = 1.0,
  introspect = false,
}: ParticlesProps) {
  const revealStartTime = useRef<number | null>(null)
  const [isRevealing, setIsRevealing] = useState(true)
  const revealDuration = 3.5

  const simMatRef = useRef<SimulationMaterial | null>(null)
  const dofMatRef = useRef<DofPointsMaterial | null>(null)

  const simulationMaterial = useMemo(() => {
    return new SimulationMaterial(planeScale)
  }, [planeScale])

  const target = useFBO(size, size, {
    minFilter: THREE.NearestFilter,
    magFilter: THREE.NearestFilter,
    format: THREE.RGBAFormat,
    type: THREE.FloatType,
  })

  const dofPointsMaterial = useMemo(() => {
    const m = new DofPointsMaterial()
    m.uniforms.positions.value = target.texture
    m.uniforms.initialPositions.value =
      simulationMaterial.uniforms.positions.value
    return m
  }, [simulationMaterial, target.texture])

  const [scene] = useState(() => new THREE.Scene())
  const [camera] = useState(
    () => new THREE.OrthographicCamera(-1, 1, 1, -1, 1 / Math.pow(2, 53), 1)
  )
  const [positions] = useState(
    () =>
      new Float32Array([
        -1, -1, 0, 1, -1, 0, 1, 1, 0, -1, -1, 0, 1, 1, 0, -1, 1, 0,
      ])
  )
  const [uvs] = useState(
    () => new Float32Array([0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0])
  )

  const particles = useMemo(() => {
    const length = size * size
    const particlesData = new Float32Array(length * 3)
    for (let i = 0; i < length; i++) {
      const i3 = i * 3
      particlesData[i3 + 0] = (i % size) / size
      particlesData[i3 + 1] = i / size / size
    }
    return particlesData
  }, [size])

  // Keep refs in sync
  useEffect(() => {
    dofMatRef.current = dofPointsMaterial
  }, [dofPointsMaterial])

  useEffect(() => {
    simMatRef.current = simulationMaterial
  }, [simulationMaterial])

  useFrame((state, delta) => {
    const dofMat = dofMatRef.current
    const simMat = simMatRef.current
    if (!dofMat || !simMat) return

    state.gl.setRenderTarget(target)
    state.gl.clear()
    state.gl.render(scene, camera)
    state.gl.setRenderTarget(null)

    const currentTime = state.clock.elapsedTime

    if (revealStartTime.current === null) {
      revealStartTime.current = currentTime
    }

    const revealElapsed = currentTime - revealStartTime.current
    const revealProgress = Math.min(revealElapsed / revealDuration, 1.0)
    const easedProgress = 1 - Math.pow(1 - revealProgress, 3)
    const revealFactor = easedProgress * 4.0

    if (revealProgress >= 1.0 && isRevealing) {
      setIsRevealing(false)
    }

    dofMat.uniforms.uTime.value = currentTime
    dofMat.uniforms.uFocus.value = focus
    dofMat.uniforms.uBlur.value = aperture

    // Damp transition
    const uT = dofMat.uniforms.uTransition
    const tTarget = introspect ? 1.0 : 0.0
    const tSmooth = introspect ? 0.35 : 0.2
    uT.value += (tTarget - uT.value) * (1 - Math.exp(-tSmooth * delta * 60))

    simMat.uniforms.uTime.value = currentTime
    simMat.uniforms.uNoiseScale.value = noiseScale
    simMat.uniforms.uNoiseIntensity.value = noiseIntensity
    simMat.uniforms.uTimeScale.value = timeScale * speed

    dofMat.uniforms.uPointSize.value = pointSize
    dofMat.uniforms.uOpacity.value = opacity
    dofMat.uniforms.uRevealFactor.value = revealFactor
    dofMat.uniforms.uRevealProgress.value = easedProgress
  })

  return (
    <>
      {createPortal(
        <mesh material={simulationMaterial as THREE.Material}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[positions, 3]}
            />
            <bufferAttribute attach="attributes-uv" args={[uvs, 2]} />
          </bufferGeometry>
        </mesh>,
        scene
      )}
      <points material={dofPointsMaterial as THREE.Material}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[particles, 3]} />
        </bufferGeometry>
      </points>
    </>
  )
}
