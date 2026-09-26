import { Suspense, lazy } from 'react'

const LogoNetwork = lazy(() => import('./LogoNetwork'))

type LogoSceneProps = {
  opacity?: number
  lineColor?: string
  nodeColor?: string
}

function LogoScene({
  opacity = 0.9,
  lineColor = '#157ea8',
  nodeColor = '#ffffff',
}: LogoSceneProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) return null

  return (
    <div className="ring-scene" aria-hidden="true">
      <Suspense fallback={null}>
        <LogoNetwork
          opacity={opacity}
          lineColor={lineColor}
          nodeColor={nodeColor}
        />
      </Suspense>
    </div>
  )
}

export default LogoScene