export default function InteractionPrompt({ visible, text }) {
  if (!visible) {
    return null
  }

  return <div className="interaction-prompt glass-card">{text}</div>
}
