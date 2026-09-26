import { useRef, useState } from 'react'
import { Canvas, useFrame, type RootState } from '@react-three/fiber'
import * as THREE from 'three'

const GRID_X = 14
const GRID_Y = 10
const SPACING = 1.85
const CONNECT_DISTANCE = 10.15

function createGrid() {
  const points: THREE.Vector3[] = []

  for (let x = 0; x < GRID_X; x++) {
    for (let y = 0; y < GRID_Y; y++) {
      const posX = (x - GRID_X / 2) * SPACING
      const posY = (y - GRID_Y / 2) * SPACING

      const distanceFromCenter = Math.sqrt(posX * posX + posY * posY * 2.4)
      if (distanceFromCenter < 2.6) continue

      const jitterX = (Math.random() - 0.5) * 0.3
      const jitterY = (Math.random() - 0.5) * 0.3
      const jitterZ = (Math.random() - 0.5) * 0.5

      points.push(
        new THREE.Vector3(
          posX + jitterX,
          posY + jitterY,
          jitterZ,
        ),
      )
    }
  }

  return points
}

function buildGeometry(points: THREE.Vector3[]) {
  const positions = new Float32Array(points.length * 3)
  points.forEach((point, i) => {
    positions[i * 3] = point.x
    positions[i * 3 + 1] = point.y
    positions[i * 3 + 2] = point.z
  })

  const linePositions: number[] = []
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (points[i].distanceTo(points[j]) < CONNECT_DISTANCE) {
        linePositions.push(
          points[i].x, points[i].y, points[i].z,
          points[j].x, points[j].y, points[j].z,
        )
      }
    }
  }

  return {
    pointPositions: positions,
    linePositions: new Float32Array(linePositions),
  }
}

function SpatialNetwork({ opacity = 0.85 }: { opacity?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const [scene] = useState(() => {
    const points = createGrid()
    return buildGeometry(points)
  })

useFrame((state: RootState) => {
  if (!groupRef.current) return

  if (document.body.classList.contains('a11y-pause-motion')) {
    return
  }

  groupRef.current.rotation.y = state.clock.elapsedTime * 0.035
  groupRef.current.rotation.x =
    Math.sin(state.clock.elapsedTime * 0.08) * 0.08
})

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[scene.linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#157ea8" transparent opacity={opacity * 0.25} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[scene.pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial size={0.045} color="#7fd4f5" transparent opacity={opacity} sizeAttenuation />
      </points>
    </group>
  )
}

type ParticleCanvasProps = {
  intensity?: 'strong' | 'subtle'
}

function ParticleCanvas({ intensity = 'strong' }: ParticleCanvasProps) {
  const opacity = intensity === 'subtle' ? 0.4 : 0.85

  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 7], fov: 55 }}
      gl={{ antialias: true, alpha: true }}
    >
      <SpatialNetwork opacity={opacity} />
    </Canvas>
  )
}

export default ParticleCanvas