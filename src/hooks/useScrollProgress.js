import { useEffect, useState } from 'react'

function getProgress() {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const scrollHeight = document.documentElement.scrollHeight - window.innerHeight

  if (scrollHeight <= 0) {
    return 0
  }

  return Math.min(1, Math.max(0, scrollTop / scrollHeight))
}

export default function useScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => setProgress(getProgress())

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return progress
}
