import { useEffect, useRef } from 'react'
import { Canvas, useFrame, type RootState } from '@react-three/fiber'
import * as THREE from 'three'

const POINT_COUNT = 90
const FIELD_RADIUS = 2.6
const CONNECT_DISTANCE = 1.1
const DRIFT_SPEED = 0.12
const DRIFT_AMOUNT = 0.35

type DriftPoint = {
  base: THREE.Vector3
  seed: number
}

function createDriftPoints(count: number, radius: number) {
  const points: DriftPoint[] = []

  for (let i = 0; i < count; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(Math.random() * 2 - 1)
    const r = Math.cbrt(Math.random()) * radius

    points.push({
      base: new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi) * 0.4,
      ),
      seed: Math.random() * Math.PI * 2,
    })
  }

  return points
}

type DriftFieldSceneProps = {
  opacity?: number
  pointCount?: number
  radius?: number
  connectDistance?: number
  driftSpeed?: number
  driftAmount?: number
  color?: string
  lineColor?: string
}

function DriftFieldScene({
  opacity = 10.6,
  pointCount = POINT_COUNT,
  radius = FIELD_RADIUS,
  connectDistance = CONNECT_DISTANCE,
  driftSpeed = DRIFT_SPEED,
  driftAmount = DRIFT_AMOUNT,
  color = '#7fd4f5',
  lineColor = '#157ea8',
}: DriftFieldSceneProps) {
  const groupRef = useRef<THREE.Group>(null)
  const pointsGeometryRef = useRef<THREE.BufferGeometry>(null)
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null)

  const driftPointsRef = useRef<DriftPoint[]>([])
  const positionsRef = useRef<Float32Array>(new Float32Array(0))
  const linePositionsRef = useRef<Float32Array>(new Float32Array(0))
  const maxLineVerticesRef = useRef(0)

  useEffect(() => {
    const driftPoints = createDriftPoints(pointCount, radius)
    const positions = new Float32Array(driftPoints.length * 3)
    const maxLineVertices = driftPoints.length * driftPoints.length * 3
    const linePositions = new Float32Array(maxLineVertices)

    driftPointsRef.current = driftPoints
    positionsRef.current = positions
    linePositionsRef.current = linePositions
    maxLineVerticesRef.current = maxLineVertices

    if (pointsGeometryRef.current) {
      pointsGeometryRef.current.setAttribute(
        'position',
        new THREE.BufferAttribute(positions, 3),
      )
    }

    if (lineGeometryRef.current) {
      lineGeometryRef.current.setAttribute(
        'position',
        new THREE.BufferAttribute(linePositions, 3),
      )
    }
  }, [pointCount, radius])

  useFrame((state: RootState) => {
  if (document.body.classList.contains('a11y-pause-motion')) {
    return
  }
    const driftPoints = driftPointsRef.current
    const positions = positionsRef.current
    const linePositions = linePositionsRef.current
    const maxLineVertices = maxLineVerticesRef.current

    if (driftPoints.length === 0) return

    const t = state.clock.elapsedTime * driftSpeed

    for (let i = 0; i < driftPoints.length; i++) {
      const point = driftPoints[i]
      const dx = Math.sin(t + point.seed) * driftAmount
      const dy = Math.cos(t * 1.3 + point.seed) * driftAmount
      const dz = Math.sin(t * 0.7 + point.seed) * driftAmount * 0.6

      positions[i * 3] = point.base.x + dx
      positions[i * 3 + 1] = point.base.y + dy
      positions[i * 3 + 2] = point.base.z + dz
    }

    if (pointsGeometryRef.current) {
      const attr = pointsGeometryRef.current.attributes.position
      if (attr) attr.needsUpdate = true
    }

    let lineCount = 0
    for (let i = 0; i < driftPoints.length; i++) {
      for (let j = i + 1; j < driftPoints.length; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (dist < connectDistance && lineCount < maxLineVertices - 6) {
          linePositions[lineCount++] = positions[i * 3]
          linePositions[lineCount++] = positions[i * 3 + 1]
          linePositions[lineCount++] = positions[i * 3 + 2]
          linePositions[lineCount++] = positions[j * 3]
          linePositions[lineCount++] = positions[j * 3 + 1]
          linePositions[lineCount++] = positions[j * 3 + 2]
        }
      }
    }

    if (lineGeometryRef.current) {
      const attr = lineGeometryRef.current.attributes.position
      if (attr) attr.needsUpdate = true
      lineGeometryRef.current.setDrawRange(0, lineCount / 3)
    }

    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      <lineSegments>
        <bufferGeometry ref={lineGeometryRef} />
        <lineBasicMaterial color={lineColor} transparent opacity={opacity * 0.3} />
      </lineSegments>

      <points>
        <bufferGeometry ref={pointsGeometryRef} />
        <pointsMaterial size={0.05} color={color} transparent opacity={opacity} sizeAttenuation />
      </points>
    </group>
  )
}

type DriftFieldProps = DriftFieldSceneProps

function DriftField(props: DriftFieldProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
    >
      <DriftFieldScene {...props} />
    </Canvas>
  )
}

export default DriftField
