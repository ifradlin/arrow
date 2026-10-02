(() => {
  const jump = (hash, smooth = true) => {
    let id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch {
      return false;
    }
    const target = document.getElementById(id);
    if (!target) return false;
    const behavior = smooth && !matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "instant";
    if (id === "top") window.scrollTo({ top: 0, left: 0, behavior });
    else target.scrollIntoView({ behavior, block: "start" });
    return target;
  };
  const initialHash = location.hash;
  if (initialHash) {
    const url = new URL(location.href);
    url.hash = "";
    history.replaceState(history.state, "", url);
    jump(initialHash, false);
  }
  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.target === "_blank") return;
    const target = jump(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    if (link.classList.contains("skip-link")) {
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    }
  });
})();
