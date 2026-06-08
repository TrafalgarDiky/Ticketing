import { useEffect, useRef } from 'react'
import StarField from './StarField'

export default function AuroraBackground({ children, style = {}, className = '' }) {
  const rootRef = useRef(null)
  const rafRef  = useRef(null)
  const t0      = useRef(Date.now())
  const target  = useRef({ x: 0.5, y: 0.5 })
  const current = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const el = rootRef.current
    if (!el) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      target.current = {
        x: Math.max(0, Math.min(1, (e.clientX - rect.left)  / rect.width)),
        y: Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height)),
      }
    }

    const tick = () => {
      const lerp = 0.032
      current.current.x += (target.current.x - current.current.x) * lerp
      current.current.y += (target.current.y - current.current.y) * lerp

      const { x: mx, y: my } = current.current
      const t = (Date.now() - t0.current) / 1000

      const l1x = (mx - 0.5) * 130 + Math.sin(t * 0.22) * 38
      const l1y = (my - 0.5) * 85  + Math.cos(t * 0.17) * 24

      const l2x = (mx - 0.5) * -95  + Math.sin(t * 0.18 + 1.5) * 48
      const l2y = (my - 0.5) * -70  + Math.cos(t * 0.26 + 2.0) * 30

      const l3x = (mx - 0.5) * 58  + Math.sin(t * 0.33 + 3.2) * 22
      const l3y = (my - 0.5) * -48 + Math.cos(t * 0.11 + 0.8) * 40

      el.style.setProperty('--l1x', `${l1x.toFixed(2)}px`)
      el.style.setProperty('--l1y', `${l1y.toFixed(2)}px`)
      el.style.setProperty('--l2x', `${l2x.toFixed(2)}px`)
      el.style.setProperty('--l2y', `${l2y.toFixed(2)}px`)
      el.style.setProperty('--l3x', `${l3x.toFixed(2)}px`)
      el.style.setProperty('--l3y', `${l3y.toFixed(2)}px`)

      const cursorEl = el.querySelector('.aurora-cursor')
      if (cursorEl) {
        cursorEl.style.left = `${(mx * 100).toFixed(2)}%`
        cursorEl.style.top  = `${(my * 100).toFixed(2)}%`
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      ref={rootRef}
      className={`aurora-root ${className}`}
      style={{
        /* Deep space gradient — horizon faintly lighter, zenith near-black */
        background: 'radial-gradient(ellipse 120% 60% at 50% -5%, #0d1e42 0%, #050f24 38%, #010509 100%)',
        ...style,
      }}
    >
      {/* Canvas-based interactive star field (below aurora blobs) */}
      <StarField />

      {/* Aurora colour blobs — look like northern lights / nebula on night sky */}
      <div
        className="aurora-l1"
        aria-hidden="true"
        style={{ transform: 'translate(var(--l1x,0px), var(--l1y,0px))', opacity: 0.65 }}
      />
      <div
        className="aurora-l2"
        aria-hidden="true"
        style={{ transform: 'translate(var(--l2x,0px), var(--l2y,0px))', opacity: 0.65 }}
      />
      <div
        className="aurora-l3"
        aria-hidden="true"
        style={{ transform: 'translate(var(--l3x,0px), var(--l3y,0px))', opacity: 0.65 }}
      />
      <div className="aurora-cursor" aria-hidden="true" />

      <div className="aurora-content">
        {children}
      </div>
    </div>
  )
}
