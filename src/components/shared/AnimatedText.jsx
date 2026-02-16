export default function AnimatedText({ as: Tag = 'p', className = '', children }) {
  return <Tag className={className}>{children}</Tag>
}
