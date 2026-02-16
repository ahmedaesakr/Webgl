export default function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      {children}
    </section>
  )
}
