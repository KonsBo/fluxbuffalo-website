import { Suspense, lazy } from 'react'

const RingNetwork = lazy(() => import('./RingNetwork'))

type RingSceneProps = {
  opacity?: number
}

function RingScene({ opacity = 0.7 }: RingSceneProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) return null

  return (
    <div className="ring-scene" aria-hidden="true">
      <Suspense fallback={null}>
        <RingNetwork opacity={opacity} />
      </Suspense>
    </div>
  )
}

export default RingScene
