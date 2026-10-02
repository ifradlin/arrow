export function installCitationCopy(
  root = document,
  clipboard = globalThis.navigator?.clipboard,
  permissions = globalThis.navigator?.permissions,
) {
  const button = root.querySelector("[data-copy-bibtex]");
  if (!button) return;
  const status = root.querySelector("[data-copy-status]");
  const mark = button.querySelector(".copy-mark");
  const unavailable = "Clipboard access is unavailable. Select and copy the citation manually.";
  const setAvailable = (available) => {
    button.disabled = !available;
    button.title = available ? "" : unavailable;
    if (!available) status.textContent = unavailable;
    else if (status.textContent === unavailable) status.textContent = "";
  };

  if (typeof clipboard?.writeText !== "function") {
    setAvailable(false);
    return;
  }

  if (typeof permissions?.query === "function") {
    (async () => {
      try {
        const permission = await permissions.query({ name: "clipboard-write" });
        const sync = () => setAvailable(permission.state !== "denied");
        permission.addEventListener?.("change", sync);
        sync();
      } catch {
        // Firefox and Safari allow clipboard writes on a click without this query.
      }
    })();
  }

  let timeout;
  button.addEventListener("click", async () => {
    const citation = root.querySelector("[data-bibtex]")?.textContent.trim();
    if (!citation || button.disabled) return;
    try {
      await clipboard.writeText(citation);
    } catch (error) {
      if (error?.name === "NotAllowedError" || error?.name === "SecurityError") setAvailable(false);
      else status.textContent = "Could not copy the citation. Please select and copy it manually.";
      return;
    }
    clearTimeout(timeout);
    button.classList.add("is-copied");
    status.textContent = "Citation copied.";
    mark.getAnimations().forEach((animation) => animation.cancel());
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      mark.animate([{ strokeDashoffset: "1" }, { strokeDashoffset: "0" }], {
        duration: 350,
        easing: "cubic-bezier(.2, .8, .2, 1)",
      });
    }
    timeout = setTimeout(() => {
      button.classList.remove("is-copied");
      status.textContent = "";
    }, 1600);
  });
}
