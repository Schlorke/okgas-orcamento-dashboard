"use client"

import { Canvas } from "@react-three/fiber"
import { Particles } from "./particles"

interface WaveAnimationProps {
  hovering?: boolean
  className?: string
}

/**
 * Animação de ondas com partículas WebGL (fundo com pontinhos brancos cintilantes).
 * Deps: three, @react-three/fiber, @react-three/drei
 */
export const WaveAnimation = ({
  hovering = false,
  className = "",
}: WaveAnimationProps) => {
  const config = {
    speed: 1.0,
    noiseScale: 0.6,
    noiseIntensity: 0.52,
    timeScale: 1,
    focus: 3.8,
    aperture: 1.79,
    pointSize: 10.0,
    opacity: 0.8,
    planeScale: 10.0,
    size: 512,
  }

  return (
    <div
      className={`wave-animation ${className}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <Canvas
        camera={{
          position: [1.26, 2.66, -1.82],
          fov: 50,
          near: 0.01,
          far: 300,
        }}
        gl={{ antialias: false, alpha: true }}
        dpr={[1, 1.5]}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <color attach="background" args={["#000"]} />
        <Particles
          speed={config.speed}
          aperture={config.aperture}
          focus={config.focus}
          size={config.size}
          noiseScale={config.noiseScale}
          noiseIntensity={config.noiseIntensity}
          timeScale={config.timeScale}
          pointSize={config.pointSize}
          opacity={config.opacity}
          planeScale={config.planeScale}
          introspect={hovering}
        />
      </Canvas>
    </div>
  )
}

export default WaveAnimation
