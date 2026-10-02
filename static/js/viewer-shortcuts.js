const movementKeys = new Set(["KeyW", "KeyA", "KeyS", "KeyD", "KeyQ", "KeyE"]);

export function isViewerMovementKey(code) {
  return movementKeys.has(code);
}

export function blocksViewerMovement(target) {
  return (
    target?.isContentEditable ||
    target?.tagName === "TEXTAREA" ||
    target?.tagName === "SELECT" ||
    (target?.tagName === "INPUT" && target.type !== "range")
  );
}

export function viewerShortcut({ target, code }, { stage, canvas, playButton, slider, isStatic }) {
  if (isStatic || ![stage, canvas, playButton, slider].includes(target)) return null;
  if (code === "Space") return target === playButton ? null : "toggle";
  if (code === "ArrowLeft") return "previous";
  if (code === "ArrowRight") return "next";
  return null;
}
