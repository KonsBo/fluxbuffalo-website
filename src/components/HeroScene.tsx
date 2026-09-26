import { Suspense, lazy } from 'react'
import './ParticleCanvas.tsx'

const ParticleCanvas = lazy(() => import('./ParticleCanvas'))
     type HeroSceneProps = {
  intensity?: 'strong' | 'subtle'
}                                     
function HeroScene({ intensity = 'strong' }: HeroSceneProps) {
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) return null

  return (
    <div className="hero-scene" aria-hidden="true">
      <Suspense fallback={null}>
        <ParticleCanvas intensity={intensity} />
      </Suspense>
    </div>
  )
}

export default HeroScene