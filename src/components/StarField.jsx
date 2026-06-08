import { useEffect, useRef } from 'react'

const STAR_COUNT = 340

function randColor() {
  const r = Math.random()
  if (r < 0.13) return [190, 215, 255]  // blue-white (hot)
  if (r < 0.22) return [255, 240, 200]  // yellow-white (sun-like)
  if (r < 0.28) return [255, 210, 185]  // orange giant
  return [255, 255, 255]
}

function makeStar(w, h) {
  const tier = Math.random()
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    r: tier < 0.68
      ? Math.random() * 0.7 + 0.18   // dim tiny: 0.18–0.88
      : tier < 0.92
        ? Math.random() * 0.7 + 0.9  // mid: 0.9–1.6
        : Math.random() * 0.6 + 1.7, // bright: 1.7–2.3
    baseAlpha: Math.random() * 0.45 + 0.28,
    amp:  Math.random() * 0.22 + 0.04,
    freq: Math.random() * 0.007 + 0.002,
    phase: Math.random() * Math.PI * 2,
    color: randColor(),
  }
}

export default function StarField() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const starsRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)
    starsRef.current = Array.from({ length: STAR_COUNT }, () => makeStar(w, h))

    let raf
    let t = 0

    const RADIUS = 140  // glow detection radius in px

    const draw = () => {
      t += 0.016
      ctx.clearRect(0, 0, w, h)

      const mx = mouse.current.x
      const my = mouse.current.y

      for (const s of starsRef.current) {
        const twinkle = Math.sin(t * s.freq * 60 + s.phase) * s.amp

        const dx = s.x - mx
        const dy = s.y - my
        const dist2 = dx * dx + dy * dy
        const dist = Math.sqrt(dist2)
        const prox = Math.max(0, 1 - dist / RADIUS)
        const glow = prox * prox  // quadratic falloff — sharper edge

        const alpha = Math.min(1, s.baseAlpha + twinkle + glow * 0.78)
        const radius = s.r * (1 + glow * 4)
        const [sr, sg, sb] = s.color

        // Outer halo — only paint when visible
        if (glow > 0.01) {
          const hR = radius * 10
          const grad = ctx.createRadialGradient(s.x, s.y, radius, s.x, s.y, hR)
          grad.addColorStop(0, `rgba(${sr},${sg},${sb},${(glow * 0.42).toFixed(3)})`)
          grad.addColorStop(0.35, `rgba(${sr},${sg},${sb},${(glow * 0.14).toFixed(3)})`)
          grad.addColorStop(1, `rgba(${sr},${sg},${sb},0)`)
          ctx.beginPath()
          ctx.arc(s.x, s.y, hR, 0, Math.PI * 2)
          ctx.fillStyle = grad
          ctx.fill()
        }

        // Star core
        ctx.beginPath()
        ctx.arc(s.x, s.y, radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${sr},${sg},${sb},${alpha.toFixed(3)})`
        ctx.fill()

        // Cross diffraction spike for brighter stars when glowing
        if (s.r > 1.5 && glow > 0.08) {
          const spk = radius * 5.5 * glow
          ctx.save()
          ctx.strokeStyle = `rgba(${sr},${sg},${sb},${(glow * 0.55).toFixed(3)})`
          ctx.lineWidth = 0.7
          ctx.beginPath()
          ctx.moveTo(s.x - spk, s.y); ctx.lineTo(s.x + spk, s.y)
          ctx.moveTo(s.x, s.y - spk); ctx.lineTo(s.x, s.y + spk)
          ctx.stroke()
          ctx.restore()
        }
      }

      raf = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
    }

    const onResize = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      starsRef.current = Array.from({ length: STAR_COUNT }, () => makeStar(w, h))
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('resize', onResize)
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}
