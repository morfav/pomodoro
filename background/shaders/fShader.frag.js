const code = `
#ifdef GL_ES
precision mediump float;
#endif

uniform float iTime;
uniform vec2 iResolution;

void main(void) {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  float transparency = 1.0;
  
  vec3 col = vec3(0.5, 0.15, 0.45)
    + vec3(0.2, 0.08, 0.2)
    * abs(sin(vec3(uv.x + 0.1 * sin(iTime), uv.y * 0.5 + 2.0, uv.x + 3.0 - 0.1 * sin(iTime))));

  vec2 light_source = vec2(0.75, 0.75);
  float dist_light = distance(uv, light_source);

  float glow_size = dist_light * 2.0;
  float glow_period = abs(sin(.2*iTime));
  float glow_intensity = abs(sin(.2*iTime));

  float glow_strength = 0.2;

  float glow = glow_strength * (1.0 - glow_intensity * glow_period * glow_size);

  vec3 mountain = 1.0 - vec3(smoothstep(0.3 * sin(10.0 * uv.x - 0.2), 0.3 * sin(10.0 * uv.x - 0.2) + 0.1, uv.y));

  gl_FragColor = vec4(col + glow - 0.4 * mountain, transparency);
}
`

export default code;

/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
  // Normalized pixel coordinates (from 0 to 1)
  vec2 uv = fragCoord/iResolution.xy;

  // Time varying pixel color
  //vec3 col = vec3(0.4, 0.15, 0.5) + + vec3(0.5, 0.3, 0.5)*cos(iTime+uv.xyx+vec3(0,2,4));
  vec3 col = vec3(0.5, 0.15, 0.45)
  + vec3(0.2, 0.08, 0.2)
  * abs(sin(vec3(uv.x + 0.1 * sin(iTime), uv.y * 0.5 + 2.0, uv.x + 3.0 - 0.1 * sin(iTime))));

  vec2 light_source = vec2(0.75, 0.75);
  float dist_light = distance(uv, light_source);

  float glow_size = dist_light * 2.0;
  float glow_period = abs(sin(.2*iTime));
  float glow_intensity = abs(sin(.2*iTime));

  float glow_strength = 0.2;

  float glow = glow_strength * (1.0 - glow_intensity * glow_period * glow_size);


  vec3 mountain = 1.0 - vec3(smoothstep(0.6 * sin(10.0 * uv.x - 0.2), 0.6 * sin(10.0 * uv.x - 0.2) + 0.1, uv.y));
  // Output to screen
  fragColor = vec4(col + glow - 0.4 * mountain, 1.0);
}
*/
