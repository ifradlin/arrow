export async function whenStylesReady(doc = document, win = window) {
  const pageLoaded =
    doc.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) => win.addEventListener("load", resolve, { once: true }));
  if (doc.readyState !== "complete") {
    await Promise.all(
      [...doc.querySelectorAll('link[rel="stylesheet"]')].map((link) => {
        if (link.sheet) return;
        return new Promise((resolve) => {
          const done = () => {
            link.removeEventListener("load", done);
            link.removeEventListener("error", done);
            win.removeEventListener("load", done);
            resolve();
          };
          link.addEventListener("load", done, { once: true });
          link.addEventListener("error", done, { once: true });
          win.addEventListener("load", done, { once: true });
        });
      }),
    );
  }
  await pageLoaded;
  await new Promise((resolve) => win.requestAnimationFrame(resolve));
}
