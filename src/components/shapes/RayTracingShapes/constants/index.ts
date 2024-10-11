export const SHADER_THREE_JS_BASIC_COLOR_MAP = `
  // As Resterization and Instansed Rasterization Render Types use MeshBasicMaterial, Three JS by default doing tone mapping and linearToOutputTexel
  // This part need to have same output color
  
  float toneMappingExposure = 1.0;
  #ifndef saturate
    #define saturate( a ) clamp( a, 0.0, 1.0 )
  #endif
  
  vec4 sRGBTransferOETF( in vec4 value ) {
    return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
  }
  vec4 linearToOutputTexel( vec4 value ) {
      return ( sRGBTransferOETF( value ) );
  }
  
  vec3 RRTAndODTFit( vec3 v ) {
    vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
    vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
    return a / b;
 }
  
  vec3 ACESFilmicToneMapping( vec3 color ) {
    const mat3 ACESInputMat = mat3(
    vec3( 0.59719, 0.07600, 0.02840 ), vec3( 0.35458, 0.90834, 0.13383 ), vec3( 0.04823, 0.01566, 0.83777 )
    );
    const mat3 ACESOutputMat = mat3(
    vec3(  1.60475, -0.10208, -0.00327 ), vec3( -0.53108, 1.10813, -0.07276 ), vec3( -0.07367, -0.00605, 1.07602 )
    );
    color *= toneMappingExposure / 0.6;
    color = ACESInputMat * color;
    color = RRTAndODTFit( color );
    color = ACESOutputMat * color;
    return saturate( color );
}
  
  vec3 toneMapping( vec3 color ) {
    return ACESFilmicToneMapping( color );
  }
`;

export const SHADER_RECTANGLE_UTILS = `
  vec2 rectangleVertices[4] = vec2[](
   vec2(-0.5, 0.5),
   vec2(0.5, 0.5),
   vec2(0.5, -0.5),
   vec2(-0.5, -0.5)
  );
  
   bool isPointInRectangle(vec2 p, vec2 position, vec2 size, vec2 scale, mat2 rotation) {
    bool inside = false;
    int numVertices = 4;
    vec2 vertices[4] = rectangleVertices;
    
    for (int i = 0; i < numVertices; i++) {
        vertices[i].xy = vertices[i].xy*size*scale*rotation + position;
    }
    
    for (int i = 0, j = numVertices - 1; i < numVertices; j = i++) {
        // Check if the point is in either bound of the vertices
        if (((vertices[i].y > p.y) != (vertices[j].y > p.y)) &&
            (p.x < (vertices[j].x - vertices[i].x) * (p.y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x)) {
            inside = !inside;
        }
    }
    return inside;
   } 
`;
export const SHADER_TRIANGLE_UTILS = `
   vec2 triangleVertices[3] = vec2[](
       vec2(0.0, -0.5),
       vec2(-0.5, 0.5),
       vec2(0.5, 0.5)
   );
   
   bool isPointInTriangle(vec2 p, vec2 position, vec2 size, vec2 scale, mat2 rotation) {
    bool inside = false;
    int numVertices = 3;
    vec2 vertices[3] = triangleVertices;
    
    for (int i = 0; i < numVertices; i++) {
        vertices[i].xy = vertices[i].xy*size*scale*rotation + position;
    }
    
    for (int i = 0, j = numVertices - 1; i < numVertices; j = i++) {
        // Check if the point is in either bound of the vertices
        if (((vertices[i].y > p.y) != (vertices[j].y > p.y)) &&
            (p.x < (vertices[j].x - vertices[i].x) * (p.y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x)) {
            inside = !inside;
        }
    }
    return inside;
   } 
`;

export const SHADER_STAR_UTILS = `


  vec2 starVertices[10] = vec2[](
   vec2(-0.29389262199401855, 0.404508501291275),
   vec2(-0.2377641350030899, 0.07725425064563751),
   vec2(-0.4755282700061798, -0.15450850129127502),
   vec2(-0.14694631099700928, -0.2022542506456375),
   vec2(3.0616171314629196e-17, -0.5),
   vec2(0.14694631099700928, -0.2022542506456375),
   vec2(0.4755282700061798, -0.15450850129127502),
   vec2(0.2377641350030899, 0.07725425064563751),
   vec2(0.29389262199401855, 0.404508501291275),
   vec2(1.5308085657314598e-17, 0.25)
  );
 
  
   bool isPointInStar(vec2 p, vec2 position, vec2 size, vec2 scale, mat2 rotation) {
    bool inside = false;
    int numVertices = 10;
    vec2 vertices[10] = starVertices;
    
     for (int i = 0; i < numVertices; i++) {
        vertices[i].xy = vertices[i].xy*size*scale*rotation + position;
    }
    
    for (int i = 0, j = numVertices - 1; i < numVertices; j = i++) {
        // Check if the point is in either bound of the vertices
        if (((vertices[i].y > p.y) != (vertices[j].y > p.y)) &&
            (p.x < (vertices[j].x - vertices[i].x) * (p.y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x)) {
            inside = !inside;
        }
    }
    return inside;
  } 
`;

export const SHADER_CIRCLE_UTILS = `
    vec2 circleVertices[33] = vec2[](
     vec2(0.5, -1.2246468525851679e-16),
     vec2(0.49039262533187866, -0.09754516184329987),
     vec2(0.4619397521018982, -0.19134171307086945),
     vec2(0.41573479771614075, -0.27778512239456177),
     vec2(0.3535533845424652, -0.3535533845424652),
     vec2(0.27778512239456177, -0.41573479771614075),
     vec2(0.19134171307086945, -0.4619397521018982),
     vec2(0.09754516184329987, -0.49039262533187866),
     vec2(-9.184850732644269e-17, -0.5),
     vec2(-0.09754516184329987, -0.49039262533187866),
     vec2(-0.19134171307086945, -0.4619397521018982),
     vec2(-0.27778512239456177, -0.41573479771614075),
     vec2(-0.3535533845424652, -0.3535533845424652),
     vec2(-0.41573479771614075, -0.27778512239456177),
     vec2(-0.4619397521018982, -0.19134171307086945),
     vec2(-0.49039262533187866, -0.09754516184329987),
     vec2(-0.5, 6.123234262925839e-17),
     vec2(-0.49039262533187866, 0.09754516184329987),
     vec2(-0.4619397521018982, 0.19134171307086945),
     vec2(-0.41573479771614075, 0.27778512239456177),
     vec2(-0.3535533845424652, 0.3535533845424652),
     vec2(-0.27778512239456177, 0.41573479771614075),
     vec2(-0.19134171307086945, 0.4619397521018982),
     vec2(-0.09754516184329987, 0.49039262533187866),
     vec2(3.0616171314629196e-17, 0.5),
     vec2(0.09754516184329987, 0.49039262533187866),
     vec2(0.19134171307086945, 0.4619397521018982),
     vec2(0.27778512239456177, 0.41573479771614075),
     vec2(0.3535533845424652, 0.3535533845424652),
     vec2(0.41573479771614075, 0.27778512239456177),
     vec2(0.4619397521018982, 0.19134171307086945),
     vec2(0.49039262533187866, 0.09754516184329987),
     vec2(0.5, 0.0)
    );
    
    bool isPointInCircle(vec2 p, vec2 position, vec2 size, vec2 scale, mat2 rotation) {
    bool inside = false;
    int numVertices = 33;
    vec2 vertices[33] = circleVertices;
    
     for (int i = 0; i < numVertices; i++) {
        vertices[i].xy = vertices[i].xy*size*scale*rotation + position;
    }
    
    for (int i = 0, j = numVertices - 1; i < numVertices; j = i++) {
        // Check if the point is in either bound of the vertices
        if (((vertices[i].y > p.y) != (vertices[j].y > p.y)) &&
            (p.x < (vertices[j].x - vertices[i].x) * (p.y - vertices[i].y) / (vertices[j].y - vertices[i].y) + vertices[i].x)) {
            inside = !inside;
        }
    }
    return inside;
  } 
`;

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
  uniform sampler2D dataTexture;
  uniform vec2 resolution;
  uniform int numShapes;
  uniform float dataTextureWidth;
  uniform float dataTextureHeight;
  uniform float devicePixelRatio;
  out vec4 fragColor;
  
  ${SHADER_RECTANGLE_UTILS}
  ${SHADER_TRIANGLE_UTILS}
  ${SHADER_STAR_UTILS}
  ${SHADER_CIRCLE_UTILS}
  ${SHADER_THREE_JS_BASIC_COLOR_MAP}
  
  vec2 calculateRayTracingPoint(){
    float pixelShift = .5;
    vec2 normalizeFragCoord = gl_FragCoord.xy/devicePixelRatio;
    return vec2(normalizeFragCoord.x - pixelShift, resolution.y -normalizeFragCoord.y - pixelShift);
  }
  
  vec2 getTextureCoords(vec2 pixel){
    return vec2((pixel.x + 0.5) / float(dataTextureWidth), (pixel.y + 0.5) / float(dataTextureHeight));
  }
   

  void main() {
    float pixelShift = 0.5;
    vec2 rayTracingP = calculateRayTracingPoint();
    
    vec4 color = vec4(1.0,1.0,1.0,1.0);
    
    if(float(numShapes) == 0.0){
     discard;
    }
    
    for (int i = 0; i < numShapes; ++i) {
 
        float dataTextureY = float(i);
        // Decode parameters
        vec2 position = texture(dataTexture, getTextureCoords(vec2(.0, dataTextureY))).xy;
        vec2 size = texture(dataTexture, getTextureCoords(vec2(.0, dataTextureY))).zw;
        
        vec2 scale = texture(dataTexture, getTextureCoords(vec2(1.0, dataTextureY))).xy;
        float rotation = texture(dataTexture, getTextureCoords(vec2(1.0, dataTextureY))).z;
        float shapeType = texture(dataTexture, getTextureCoords(vec2(1.0, dataTextureY))).w;
        vec3 shapeColor = texture(dataTexture, getTextureCoords(vec2(2.0, dataTextureY))).xyz;
        
         // rectangle
         if(shapeType == 0.0){
             // fix shift
            position-=vec2(pixelShift);
             
            // Apply rotation
            float cosA = cos(rotation);
            float sinA = sin(rotation);
            
            mat2 rotationMatrix = mat2(cosA, -sinA, sinA, cosA);
        
            if(isPointInRectangle(rayTracingP, position, size, scale, rotationMatrix)){
              color = vec4(shapeColor, 0.0);
            }
         }
         
         //circle
          if(shapeType == 1.0){         
             // fix shift
            position-=vec2(pixelShift);
             
            // Apply rotation
            float cosA = cos(rotation);
            float sinA = sin(rotation);
            
            mat2 rotationMatrix = mat2(cosA, -sinA, sinA, cosA);
        
            if(isPointInCircle(rayTracingP, position, size, scale, rotationMatrix)){
              color = vec4(shapeColor, 0.0);
            }
         }
         
          //triangle
          if(shapeType == 2.0){
            // fix shift
            position-=vec2(pixelShift);
             
            // Apply rotation
            float cosA = cos(rotation);
            float sinA = sin(rotation);
            
            mat2 rotationMatrix = mat2(cosA, -sinA, sinA, cosA);
        
         
            if(isPointInTriangle(rayTracingP, position, size, scale, rotationMatrix)){
              color = vec4(shapeColor, 0.0);
            }
         }
         
         //star
          if(shapeType == 3.0){
            // fix shift
            position-=vec2(pixelShift);
            
            // Apply rotation
            float cosA = cos(rotation);
            float sinA = sin(rotation);
            
            mat2 rotationMatrix = mat2(cosA, -sinA, sinA, cosA);

            if(isPointInStar(rayTracingP, position, size, scale, rotationMatrix)){
              color = vec4(shapeColor, 0.0);
            }
         }
         
     }   
     float alpha = color.a < 1.0 ? 1.0 : 0.0;
     fragColor = vec4(color.rgb, alpha);
     fragColor.rgb = toneMapping( fragColor.rgb );
     fragColor = linearToOutputTexel(fragColor);
  }
`;
