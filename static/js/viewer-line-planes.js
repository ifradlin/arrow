export function enableLinePlanes(material, uniforms, capacity) {
  Object.assign(material.uniforms, uniforms);
  const declarations = `
uniform int trailPlaneCount;
uniform mat4 trailClipToWorld;
uniform mat4 trailWorldToView;
uniform vec2 trailViewport;
uniform mat4 trailPlaneFromWorld[${capacity}];
uniform vec2 trailPlaneSize[${capacity}];
uniform sampler2D trailPlaneTexture[${capacity}];
uniform float trailPlaneOpacity[${capacity}];
uniform vec3 trailPlaneFogColor;
uniform float trailPlaneFogDensity;
`;
  const planes = Array.from(
    { length: capacity },
    (_, i) => `
    if (trailPlaneCount > ${i}) {
      vec3 a = (trailPlaneFromWorld[${i}] * vec4(rayStart, 1.0)).xyz;
      vec3 b = (trailPlaneFromWorld[${i}] * vec4(rayEnd, 1.0)).xyz;
      float dz = b.z - a.z;
      if (abs(dz) > 1e-8) {
        float t = -a.z / dz;
        vec2 uv = mix(a.xy, b.xy, t) / trailPlaneSize[${i}] + 0.5;
        if (t > 0.0 && t < 1.0 && all(greaterThanEqual(uv, vec2(0.0))) && all(lessThanEqual(uv, vec2(1.0)))) {
          vec3 imageColor = linearToOutputTexel(texture2D(trailPlaneTexture[${i}], uv)).rgb;
          float depth = -(trailWorldToView * vec4(mix(rayStart, rayEnd, t), 1.0)).z;
          float fog = 1.0 - exp(-trailPlaneFogDensity * trailPlaneFogDensity * depth * depth);
          imageColor = mix(imageColor, trailPlaneFogColor, fog);
          gl_FragColor.rgb = mix(gl_FragColor.rgb, imageColor, trailPlaneOpacity[${i}]);
        }
      }
    }
  `,
  ).join("\n");
  const composite = `
  if (trailPlaneCount > 0) {
    vec2 ndc = gl_FragCoord.xy / trailViewport * 2.0 - 1.0;
    vec4 nearWorld = trailClipToWorld * vec4(ndc, -1.0, 1.0);
    vec4 endWorld = trailClipToWorld * vec4(ndc, gl_FragCoord.z * 2.0 - 1.0, 1.0);
    vec3 rayStart = nearWorld.xyz / nearWorld.w;
    vec3 rayEnd = endWorld.xyz / endWorld.w;
    ${planes}
  }
`;
  if (!material.fragmentShader.includes("#include <fog_fragment>")) throw new Error("Unsupported line shader");
  material.fragmentShader = material.fragmentShader
    .replace("void main() {", `${declarations}\nvoid main() {`)
    .replace("#include <fog_fragment>", `#include <fog_fragment>\n${composite}`);
}
