import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    setEnabled(isFinePointer && !reduceMotion)
  }, [])

  // Hide the native OS cursor site-wide only while the custom cursor is active.
  useEffect(() => {
    if (!enabled) return
    document.documentElement.classList.add('custom-cursor-active')
    return () => document.documentElement.classList.remove('custom-cursor-active')
  }, [enabled])

  useEffect(() => {
    if (!enabled) return
    let ringX = 0
    let ringY = 0
    let mouseX = 0
    let mouseY = 0

    const showCursor = () => {
      dotRef.current?.classList.remove('opacity-0')
      ringRef.current?.classList.remove('opacity-0')
    }
    const hideCursor = () => {
      dotRef.current?.classList.add('opacity-0')
      ringRef.current?.classList.add('opacity-0')
    }

    const move = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`
      }
      showCursor()
    }

    let raf
    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px)`
      }
      raf = requestAnimationFrame(animateRing)
    }

    const onEnter = (e) => {
      if (e.target.closest('a, button, input, textarea')) {
        ringRef.current?.classList.add('scale-150', 'border-accent')
      }
    }
    const onLeave = () => {
      ringRef.current?.classList.remove('scale-150', 'border-accent')
    }

    // Fade the custom cursor out when the pointer leaves the browser window
    // (tab switch, address bar, outside the viewport) so nothing is stranded
    // on screen with no visible pointer at all.
    const onWindowLeave = (e) => {
      if (!e.relatedTarget && !e.toElement) hideCursor()
    }

    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', onEnter)
    document.addEventListener('mouseout', onLeave)
    document.documentElement.addEventListener('mouseleave', hideCursor)
    document.documentElement.addEventListener('mouseenter', showCursor)
    window.addEventListener('mouseout', onWindowLeave)
    raf = requestAnimationFrame(animateRing)

    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', onEnter)
      document.removeEventListener('mouseout', onLeave)
      document.documentElement.removeEventListener('mouseleave', hideCursor)
      document.documentElement.removeEventListener('mouseenter', showCursor)
      window.removeEventListener('mouseout', onWindowLeave)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent opacity-0 transition-opacity duration-150"
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[90] h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30 opacity-0 transition-[transform,opacity] duration-150 ease-out"
      />
    </>
  )
}