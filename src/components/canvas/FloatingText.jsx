import { Text } from '@react-three/drei'

export default function FloatingText({ children = 'Creative Developer', ...props }) {
  return (
    <Text fontSize={0.35} color="#d6ddff" anchorX="center" anchorY="middle" {...props}>
      {children}
    </Text>
  )
}
