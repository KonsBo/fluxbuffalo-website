import { Suspense, lazy } from 'react'

const DriftField = lazy(() => import('./DriftField'))

type DriftSceneProps = {
  opacity?: number
  pointCount?: number
  radius?: number
  connectDistance?: number
  driftSpeed?: number
  driftAmount?: number
  color?: string
  lineColor?: string
}

function DriftScene(props: DriftSceneProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) return null

  return (
    <div className="ring-scene" aria-hidden="true">
      <Suspense fallback={null}>
        <DriftField {...props} />
      </Suspense>
    </div>
  )
}

export default DriftScene
