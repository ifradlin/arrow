export function enableLineFade(material) {
  material.uniforms.trailFadeStart = { value: 0.3 };
  material.uniforms.trailFadeEnd = { value: 0 };
  const replace = (source, before, after) => {
    if (!source.includes(before)) throw new Error(`Unsupported line shader: missing ${before}`);
    return source.replace(before, after);
  };
  material.vertexShader = replace(
    material.vertexShader,
    "attribute vec3 instanceColorEnd;",
    "attribute vec3 instanceColorEnd;\nattribute float instanceProgressStart;\nattribute float instanceProgressEnd;\nvarying float vTrailProgress;",
  );
  material.vertexShader = replace(
    material.vertexShader,
    "void main() {",
    "void main() {\nvTrailProgress = (position.y < 0.5) ? instanceProgressStart : instanceProgressEnd;",
  );
  material.fragmentShader = replace(
    material.fragmentShader,
    "varying float vLineDistance;",
    `varying float vLineDistance;
varying float vTrailProgress;
uniform float trailFadeStart;
uniform float trailFadeEnd;
float trailOpacity(float progress) {
  if (trailFadeStart <= trailFadeEnd) return step(trailFadeEnd, progress);
  return clamp((progress - trailFadeEnd) / (trailFadeStart - trailFadeEnd), 0.0, 1.0);
}`,
  );
  material.fragmentShader = replace(
    material.fragmentShader,
    "vec4 diffuseColor = vec4( diffuse, alpha );",
    "alpha *= trailOpacity(vTrailProgress);\nvec4 diffuseColor = vec4( diffuse, alpha );",
  );
}
