uniform float uTime;
uniform vec3 uColorA;
uniform vec3 uColorB;

varying vec2 vUv;

// Simple noise based on sin
float noise(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float smoothNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float a = noise(i);
  float b = noise(i + vec2(1.0, 0.0));
  float c = noise(i + vec2(0.0, 1.0));
  float d = noise(i + vec2(1.0, 1.0));

  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * smoothNoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 center = vUv - 0.5;
  float dist = length(center);
  float angle = atan(center.y, center.x);

  // Swirling pattern
  float swirl = angle + uTime * 0.8 + dist * 6.0;
  float n = fbm(vec2(swirl, dist * 4.0 - uTime * 0.3));

  // Color mixing
  vec3 color = mix(uColorA, uColorB, n);
  color += 0.15 * sin(swirl * 3.0 + uTime);

  // Circular fade with soft edge
  float alpha = smoothstep(0.5, 0.2, dist);

  // Inner glow
  float glow = smoothstep(0.4, 0.0, dist) * 0.3;
  color += glow;

  gl_FragColor = vec4(color, alpha);
}
