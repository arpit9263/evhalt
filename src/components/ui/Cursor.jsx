import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot  = useRef(null)
  const ring = useRef(null)
  const pos  = useRef({ x: 0, y: 0 })
  const rpos = useRef({ x: 0, y: 0 })
  const raf  = useRef(null)

  useEffect(() => {
    const onMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px'
        dot.current.style.top  = e.clientY + 'px'
      }
    }

    const animate = () => {
      rpos.current.x += (pos.current.x - rpos.current.x) * 0.1
      rpos.current.y += (pos.current.y - rpos.current.y) * 0.1
      if (ring.current) {
        ring.current.style.left = rpos.current.x + 'px'
        ring.current.style.top  = rpos.current.y + 'px'
      }
      raf.current = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    raf.current = requestAnimationFrame(animate)

    const addActive  = () => ring.current?.classList.add('active')
    const rmvActive  = () => ring.current?.classList.remove('active')
    window.addEventListener('mousedown', addActive)
    window.addEventListener('mouseup',   rmvActive)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', addActive)
      window.removeEventListener('mouseup',   rmvActive)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  )
}
