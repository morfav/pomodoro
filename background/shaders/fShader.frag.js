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
        
    vec2 lightSource = vec2(0.5, 0.75);
    float distLight = distance(uv, lightSource);
    
    float glowSize = distLight * 3.0;
    float glowPeriod = abs(sin(.2*iTime));
    float glowIntensity = abs(sin(.2*iTime));
   
    float glowStrength = 0.6;
    
    float glow = glowStrength * (1.0 - glowIntensity * glowPeriod * glowSize);
       
    gl_FragColor = vec4(col + 0.5 * glow, 1.0);
}
`

export default code;
