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
    
    float glowSize = distLight * 2.0;
    float glowPeriod = abs(sin(.2*iTime));
    float glowIntensity = abs(sin(.2*iTime));
   
    float glowStrength = 0.4;
    
    float glow = glowStrength * (1.0 - glowIntensity * glowPeriod * glowSize);
       
    gl_FragColor = vec4(col + 0.5 * glow, 1.0);
}
`

export default code;

/*
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    // Normalized pixel coordinates (from 0 to 1)
    vec2 uv = fragCoord/iResolution.xy;

    vec3 col = vec3(0.5, 0.15, 0.45)
        + vec3(0.2, 0.08, 0.2)
        * abs(sin(vec3(uv.x + 0.1 * sin(iTime), uv.y * 0.5 + 2.0, uv.x + 3.0 - 0.1 * sin(iTime))));

    vec2 lightSource = vec2(0.65, 0.8);
    float distLight = distance(uv, lightSource);

    float glowSize = distLight * 2.0;
    float glowPeriod = abs(sin(.2*iTime));
    float glowIntensity = abs(sin(.2*iTime));

    float glowStrength = 0.2;

    float glow = glowStrength * (1.0 - glowIntensity * glowPeriod * glowSize);

    const float numMountains = 3.0;
    float colour = glow;
    float mountain;
    for (float i = 1.0; i < numMountains + 1.0; i++) {
        float mountainCurve = 0.072 * i * i * sin(pow(i, 1.63) * uv.x + 1.57) - 0.07 * (i - numMountains / i);
        float mountainMask = 1.0 - smoothstep(mountainCurve, mountainCurve + 0.07 / i, uv.y);
        float mountainColour = (numMountains / i - numMountains / 2.0) / (numMountains - 1.0) - 0.2;
        colour = mix(colour, mountainColour, mountainMask);
    }

    fragColor = vec4(col + 0.55 * colour, 1.0);
}
*/
