import { useRef, useState } from 'react'
import { Canvas, useFrame, type RootState } from '@react-three/fiber'
import * as THREE from 'three'

const RINGS = 3
const POINTS_PER_RING = 36
const RING_GAP = 0.5
const BASE_RADIUS =1.2
const CONNECT_DISTANCE = 1.65

function createRingPoints(radiusOffset: number, phaseOffset: number) {
  const points: THREE.Vector3[] = []

  for (let r = 0; r < RINGS; r++) {
    const radius = BASE_RADIUS + radiusOffset + r * RING_GAP

    for (let i = 0; i < POINTS_PER_RING; i++) {
      const angle = (i / POINTS_PER_RING) * Math.PI * 2 + phaseOffset
      const jitterR = (Math.random() - 0.5) * 0.12
      const jitterZ = (Math.random() - 0.5) * 0.3

      points.push(
        new THREE.Vector3(
          Math.cos(angle) * (radius + jitterR),
          Math.sin(angle) * (radius + jitterR),
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

function RingLayer({
  radiusOffset,
  phaseOffset,
  opacity,
  rotationSign,
}: {
  radiusOffset: number
  phaseOffset: number
  opacity: number
  rotationSign: number
}) {
  const groupRef = useRef<THREE.Group>(null)
  const [scene] = useState(() => {
    const points = createRingPoints(radiusOffset, phaseOffset)
    return buildGeometry(points)
  })

useFrame((state: RootState) => {
  if (!groupRef.current) return

  if (document.body.classList.contains('a11y-pause-motion')) {
    return
  }

  const t = state.clock.elapsedTime

    groupRef.current.rotation.z = t * 0.045 * rotationSign
    groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.06

    const breathe = 1 + Math.sin(t * 0.15) * 0.15
    groupRef.current.scale.setScalar(breathe)
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[scene.linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#157ea8" transparent opacity={opacity * 0.3} />
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

type RingNetworkSceneProps = {
  opacity?: number
}

function RingNetworkScene({ opacity = 0.7 }: RingNetworkSceneProps) {
  return (
    <>
      <RingLayer radiusOffset={0} phaseOffset={0} opacity={opacity} rotationSign={1} />
      <RingLayer
        radiusOffset={0.42}
        phaseOffset={Math.PI / POINTS_PER_RING}
        opacity={opacity * 0.5}
        rotationSign={-1}
      />
    </>
  )
}

type RingNetworkProps = {
  opacity?: number
}

function RingNetwork({ opacity = 0.7 }: RingNetworkProps) {
  return (
    <Canvas
      dpr={[1, 3.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <RingNetworkScene opacity={opacity} />
    </Canvas>
  )
}

export default RingNetwork
