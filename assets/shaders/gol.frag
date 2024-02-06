#ifdef GL_ES
precision mediump float;
#endif

varying vec2 vTexCoord;//coordinate of the pixel currently being rendered on screen
uniform sampler2D tex;//texture of the screen being passed from the draw function
uniform vec2 normalRes;//size of the pixel, uniform because its the same, vs varying if different each run


void main() {
  vec2 uv = vTexCoord;
  
  uv.y = 1.0 - uv.y;//inversion of the y coordinate
  
  vec4 col = texture2D(tex, uv);
  float a = col.r;//check the color at the location what the previous color was. the color is stored to determine if alive or dead 
  
  float num = 0.0;//count all the neighbords around the current cell, calculate where their coordinates are within texture. Add whether it is alive or dead
  for(float i = -1.0; i < 2.0; i++) {
    for(float j = -1.0; j < 2.0; j++) {
      float x = uv.x + i * normalRes.x;
      float y = uv.y + j * normalRes.y;

      num += texture2D(tex, vec2(x, y)).r;
    }
  }
  
  num -= a;//dont want the current location(just neighbords)
  
  if(a > 0.5) {//if cell is alive check neighbors, set to dead or alive depending on neighbor state.
    if(num < 1.5) {
      a = 0.0;
    }
    if(num > 3.5) {
      a = 0.0;
    }
  } else {
    if(num > 2.5 && num < 3.5) {
      a = 1.0;
    }
  }
  
  gl_FragColor = vec4(a, a, a, 1.0);//output of the cells life state
}