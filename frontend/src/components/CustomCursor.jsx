import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (window.innerWidth < 900) return

    const handleMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`
      }
    }

    const isHoverable = (el) => {
      if (!el || typeof el.closest !== 'function') return false
      return !!el.closest('a, button, [data-cursor="hover"], input, textarea, select')
    }

    const handleEnter = (e) => {
      if (isHoverable(e.target)) {
        ringRef.current?.classList.add('hovered')
      }
    }
    const handleLeave = (e) => {
      if (isHoverable(e.target)) {
        ringRef.current?.classList.remove('hovered')
      }
    }

    let rafId
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18
      ring.current.y += (pos.current.y - ring.current.y) * 0.18
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`
      }
      rafId = requestAnimationFrame(animate)
    }
    animate()

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseover', handleEnter)
    document.addEventListener('mouseout', handleLeave)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseover', handleEnter)
      document.removeEventListener('mouseout', handleLeave)
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-neon-cyan pointer-events-none z-[9999] hidden md:block"
        style={{ boxShadow: '0 0 12px #00e5ff', mixBlendMode: 'difference' }}
      />
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 w-9 h-9 rounded-full border border-neon-cyan/60 pointer-events-none z-[9999] hidden md:block transition-[width,height,background] duration-200"
        style={{ mixBlendMode: 'difference' }}
      />
      <style>{`
        .cursor-ring.hovered {
          width: 64px !important;
          height: 64px !important;
          background: rgba(0, 229, 255, 0.08);
        }
      `}</style>
    </>
  )
}
