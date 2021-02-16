const code = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float iTime;
uniform vec2 iResolution;

void main(void) {
  vec2 p = gl_FragCoord.xy / iResolution.xy;
  float transparency = 1.0;
  float c = 0.45;
  
  if (p.y > abs(sin(p.x + iTime/5.0)) * 0.1) {
    c = 0.0;
  }

  gl_FragColor = vec4(vec3(c), transparency);
}
`

export default code;
