export const VERTEX_SHADER = `
    in vec3 position;
    out vec2 vUv;

    void main() {
       vUv = (position.xy + 1.0) * 0.5;
       gl_Position = vec4(position, 1.0);
    }
`;

export const FRAGMENT_SHADER = `
  precision highp float;
  uniform vec2 resolution;
  uniform vec3 backgroundColor;
  uniform vec3 dotColor;
  uniform float dotSpacing;
  uniform float dotSize;
  out vec4 fragColor;

  vec2 calculateUV(){
    float pixelShift = .5;
    float x = (gl_FragCoord.x - pixelShift)/resolution.x;
    float y = (gl_FragCoord.y - pixelShift)/resolution.y;
                
    float ndcX = x*2.0 - 1.0;
    float ndcY = y*2.0 - 1.0;   
    
    return vec2(ndcX,ndcY);
  }
  
  float drawCircle(vec2 st, vec2 center, float radius) {
    return 1.0 - smoothstep(radius - 0.01, radius + 0.01, distance(st, center));
 }

  void main() {
      
     vec2 uv = calculateUV();
    
    // Define grid cell size
    vec2 gridSize = vec2(1.0 / dotSpacing, 1.0 / dotSpacing);

    // Find nearest grid point (intersection)
    vec2 nearestPoint = gridSize * floor(uv / gridSize) + 0.5 * gridSize;

    // Circle radius as a fraction of grid cell size
    float radius = dotSize;

    // Draw circle at the nearest grid intersection
    float circle = drawCircle(uv, nearestPoint, radius);

    // Set color: circles in red, background in grey
    vec3 color = mix(backgroundColor, dotColor, circle);
    
    fragColor = vec4(color, 1.0);
 
  }
`;

export const BACKGROUND_COLOR = '#f3f7f9';
export const DOT_COLOR = '#dbe2e8';
export const DOT_SIZE = 0.01;
export const DOT_SPACING = 10;
