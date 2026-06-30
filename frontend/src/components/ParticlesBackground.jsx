import { useEffect, useRef } from 'react'

export default function ParticlesBackground() {
  const canvasRef = useRef(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let particles = []
    let animationId
    let width = window.innerWidth
    let height = window.innerHeight

    const setSize = () => {
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      canvas.style.width = width + 'px'
      canvas.style.height = height + 'px'
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }
    setSize()

    const colors = ['#00e5ff', '#b829ff', '#ff2e63']
    // Pre-render glowing particles for high performance
    const glows = {}
    colors.forEach(color => {
      const oc = document.createElement('canvas')
      oc.width = 40
      oc.height = 40
      const octx = oc.getContext('2d')
      octx.beginPath()
      octx.fillStyle = color
      octx.shadowColor = color
      octx.shadowBlur = 8
      octx.arc(20, 20, 2, 0, Math.PI * 2)
      octx.fill()
      glows[color] = oc
    })

    const count = Math.min(80, Math.floor((width * height) / 18000))

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.6 + 0.4,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    const handleResize = () => setSize()

    window.addEventListener('mousemove', handleMouse)
    window.addEventListener('resize', handleResize)

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      particles.forEach((p, i) => {
        // Mouse repulsion
        const dx = p.x - mouseRef.current.x
        const dy = p.y - mouseRef.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 140) {
          const force = (140 - dist) / 140
          p.vx += (dx / dist) * force * 0.15
          p.vy += (dy / dist) * force * 0.15
        }

        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98

        if (p.x < 0) p.x = width
        if (p.x > width) p.x = 0
        if (p.y < 0) p.y = height
        if (p.y > height) p.y = 0

        // Draw pre-rendered glowing particle (ultra-fast)
        const scale = p.r / 2
        const drawSize = 40 * scale
        ctx.drawImage(glows[p.color], p.x - drawSize/2, p.y - drawSize/2, drawSize, drawSize)

        // Draw connecting lines
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const ldx = p.x - p2.x
          const ldy = p.y - p2.y
          const ld = Math.sqrt(ldx * ldx + ldy * ldy)
          if (ld < 120) {
            ctx.beginPath()
            ctx.shadowBlur = 0
            ctx.strokeStyle = `rgba(0, 229, 255, ${(1 - ld / 120) * 0.15})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      })

      animationId = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 -z-20 pointer-events-none"
        aria-hidden="true"
      />
      {/* Floating blobs */}
      <div
        className="blob-glow"
        style={{
          width: 500,
          height: 500,
          background: '#00e5ff',
          top: -100,
          left: -100,
        }}
      />
      <div
        className="blob-glow"
        style={{
          width: 400,
          height: 400,
          background: '#b829ff',
          bottom: -100,
          right: -100,
          animationDelay: '-7s',
        }}
      />
      <div
        className="blob-glow"
        style={{
          width: 350,
          height: 350,
          background: '#ff2e63',
          top: '40%',
          left: '40%',
          animationDelay: '-14s',
          opacity: 0.25,
        }}
      />
    </>
  )
}
