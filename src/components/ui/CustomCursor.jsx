export default function CustomCursor({ pointerLocked }) {
  if (pointerLocked) {
    return null
  }

  return <div className="cursor-overlay" />
}
