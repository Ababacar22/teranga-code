import { useEffect, useRef } from 'react'

const COLORS = ['#00853f', '#fdc700', '#e31b23', '#fffaf0']

function Confetti() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio || 1

    function resize() {
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.scale(dpr, dpr)
    }
    resize()

    const particles = Array.from({ length: 90 }, () => ({
      x: canvas.clientWidth / 2,
      y: canvas.clientHeight / 3,
      vx: (Math.random() - 0.5) * 8,
      vy: Math.random() * -6 - 2,
      size: Math.random() * 6 + 4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
    }))

    let frame
    let elapsed = 0
    const gravity = 0.25

    function draw() {
      elapsed += 1
      ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      for (const p of particles) {
        p.vy += gravity
        p.x += p.vx
        p.y += p.vy
        p.rotation += p.rotationSpeed

        ctx.save()
        ctx.translate(p.x, p.y)
        ctx.rotate((p.rotation * Math.PI) / 180)
        ctx.fillStyle = p.color
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
        ctx.restore()
      }
      if (elapsed < 130) frame = requestAnimationFrame(draw)
    }
    draw()

    return () => cancelAnimationFrame(frame)
  }, [])

  return <canvas ref={canvasRef} className="confetti-canvas" aria-hidden="true" />
}

export default Confetti
