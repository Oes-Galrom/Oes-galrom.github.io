// fragment shader
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 resolution;
uniform vec2 gridSize;
uniform float gridState[10000];
uniform float time;

void main() {
  vec2 uv = gl_FragCoord.xy / resolution.xy;
  vec2 cellSize = 1.0 / gridSize;
  vec2 cell = floor(uv / cellSize);

  int index = int(cell.y * gridSize.x + cell.x);
  float state = gridState[index];

  float minDist = 10000.0;
  for (int y = 0; y < int(gridSize.y); y++) {
    for (int x = 0; x < int(gridSize.x); x++) {
      int i = y * int(gridSize.x) + x;
      if (gridState[i] > 0.0) {
        vec2 otherCell = vec2(float(x), float(y));
        float dist = length((cell - otherCell) * cellSize * resolution);
        if (dist < minDist) {
          minDist = dist;
        }
      }
    }
  }

  float ripple = smoothstep(0.0, 1.0, 5.0 - abs(minDist - state));
  vec4 color = mix(vec4(0.0, 0.0, 0.0, 1.0), vec4(0.0, 0.5, 1.0, 1.0), ripple);
  gl_FragColor = color;
}
