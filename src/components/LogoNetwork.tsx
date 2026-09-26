import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const OUTLINE_POINTS: Array<[number, number]> = [
  [0.83, -0.02],
  [-0.59, 0.266],
  [-0.437, 0.996],
  [-0.089, 0.837],
  [0.728, 0.837],
  [1.065, 0.643],
  [1.407, 0.654],
  [1.693, 0.403],
  [1.8, -0.061],
  [1.575, -0.235],
  [1.34, -0.174],
  [1.111, -0.449],
  [0.717, -0.7],
  [0.375, -0.608],
  [0.13, -1.006],
  [-0.064, -0.929],
  [-0.62, -0.853],
  [-0.697, -0.633],
  [-1.524, -0.694],
  [-1.78, -0.531],
  [-1.468, -0.357],
  [-1.596, -0.112],
  [-1.8, -0.557],
]

const STRUT_SEGMENTS: Array<[[number, number], [number, number]]> = [
  [[-0.947, 0.485], [-0.697, -0.633]],
  [[-0.947, 0.485], [-1.136, -0.674]],
  [[-0.089, 0.837], [-0.416, -0.853]],
  [[-0.089, 0.837], [0.375, -0.608]],
  [[0.728, 0.837], [0.13, -1.006]],
  [[0.728, 0.837], [1.111, -0.449]],
  [[1.065, 0.643], [0.717, -0.7]],
  [[1.407, 0.654], [1.34, -0.174]],
  [[1.693, 0.403], [1.111, -0.449]],
  [[1.8, -0.061], [1.575, -0.235]],
  [[1.111, -0.449], [1.575, -0.235]],
  [[0.375, -0.608], [0.717, -0.7]],
  [[1.407, 0.654], [1.575, 1.006]],
  [[1.575, 1.006], [1.56, 0.511]],
  [[1.693, 0.403], [1.504, 0.832]],
]

type Point2D = [number, number]

type LogoNetworkProps = {
  opacity?: number
  lineColor?: string
  nodeColor?: string
}

function createDepthMap() {
  const depths = new Map<string, number>()

  function getDepth(x: number, y: number) {
    const key = `${x},${y}`

    if (!depths.has(key)) {
      const z =
        Math.sin(x * 3.4) * 0.8 +
        Math.cos(y * 2.7) * 0.24 +
        Math.sin((x + y) * 4.1) * 0.12

      depths.set(key, z)
    }

    return depths.get(key)!
  }

  return getDepth
}

function makeVector(
  point: Point2D,
  getDepth: (x: number, y: number) => number,
) {
  const [x, y] = point

  return new THREE.Vector3(x, y, getDepth(x, y))
}

function Tube({
  start,
  end,
  color,
  opacity,
}: {
  start: THREE.Vector3
  end: THREE.Vector3
  color: string
  opacity: number
}) {
  const { position, quaternion, length } = useMemo(() => {
    const midpoint = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5)

    const direction = new THREE.Vector3().subVectors(end, start)
    const segmentLength = direction.length()

    const orientation = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      direction.normalize(),
    )

    return {
      position: midpoint,
      quaternion: orientation,
      length: segmentLength,
    }
  }, [start, end])

  return (
    <mesh position={position} quaternion={quaternion} renderOrder={1}>
      <cylinderGeometry args={[0.01, 0.01, length, 8]} />

      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function Node({
  position,
  nodeColor,
}: {
  position: THREE.Vector3
  nodeColor: string
}) {
  return (
    <mesh position={position} renderOrder={5}>
      <sphereGeometry args={[0.045, 16, 16]} />

      <meshBasicMaterial
        color={nodeColor}
        transparent={false}
        opacity={1}
        blending={THREE.NormalBlending}
        depthWrite
        toneMapped={false}
      />
    </mesh>
  )
}
function LogoNetworkScene({
  opacity = 0.28,
  lineColor = '#157ea8',
  nodeColor = '#ce7979ff',
}: LogoNetworkProps) {
  const groupRef = useRef<THREE.Group>(null)

  const { nodes, segments } = useMemo(() => {
    const getDepth = createDepthMap()
    const uniqueNodes = new Map<string, THREE.Vector3>()
    const allSegments: Array<[THREE.Vector3, THREE.Vector3]> = []

    function addNode(point: Point2D) {
      const key = `${point[0]},${point[1]}`

      if (!uniqueNodes.has(key)) {
        uniqueNodes.set(key, makeVector(point, getDepth))
      }

      return uniqueNodes.get(key)!
    }

    for (let index = 0; index < OUTLINE_POINTS.length; index += 1) {
      const start = OUTLINE_POINTS[index]
      const end = OUTLINE_POINTS[(index + 1) % OUTLINE_POINTS.length]

      allSegments.push([addNode(start), addNode(end)])
    }

    for (const [start, end] of STRUT_SEGMENTS) {
      allSegments.push([addNode(start), addNode(end)])
    }

    return {
      nodes: Array.from(uniqueNodes.values()),
      segments: allSegments,
    }
  }, [])

  useFrame((state) => {
    if (!groupRef.current) return

    if (document.body.classList.contains('a11y-pause-motion')) {
      return
    }

    const time = state.clock.elapsedTime

    groupRef.current.rotation.y = time * 0.06
    groupRef.current.rotation.x = Math.sin(time * 0.32) * 0.14
    groupRef.current.rotation.z = Math.cos(time * 0.2) * 0.035

    groupRef.current.position.x = Math.sin(time * 0.2) * 0.035
    groupRef.current.position.y = 0.46 + Math.cos(time * 0.28) * 0.045
    groupRef.current.position.z = 0

    const scale = 2.18 + Math.sin(time * 0.42) * 0.025
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <>
      <ambientLight intensity={0.5} />

      <pointLight
        position={[3.5, 3, 4]}
        intensity={8}
        color="#8fe4ff"
      />

      <pointLight
        position={[-3, -2, 3]}
        intensity={3}
        color="#157ea8"
      />

      <group ref={groupRef}>
        {segments.map(([start, end], index) => (
          <Tube
            key={`tube-${index}`}
            start={start}
            end={end}
            color={lineColor}
            opacity={opacity * 0.32}
          />
        ))}

        {nodes.map((position, index) => (
  <Node
    key={`node-${index}`}
    position={position}
    nodeColor={nodeColor}
  />
))}
      </group>
    </>
  )
}

function LogoNetwork({
  opacity = 0.88,
  lineColor = '#157ea8',
  nodeColor = '#1c07bcff',
}: LogoNetworkProps) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{
        position: [0, 0.1, 10.8],
        fov: 54,
        near: 0.1,
        far: 100,
      }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
    >
      <LogoNetworkScene
        opacity={opacity}
        lineColor={lineColor}
        nodeColor={nodeColor}
      />
    </Canvas>
  )
}

export default LogoNetwork