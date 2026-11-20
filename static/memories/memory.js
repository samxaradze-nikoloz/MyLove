// ---------- missing photo -> heart box ----------
document.querySelectorAll(".photo-frame img, .video-card video[poster]").forEach(el => {
  if (el.tagName !== "IMG") return;
  const swap = () => {
    const box = document.createElement("div");
    box.className = "photo-fallback";
    box.textContent = "♥";
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", el.alt);
    el.replaceWith(box);
  };
  el.addEventListener("error", swap);
  if (el.complete && el.naturalWidth === 0) swap();
});

// ---------- click the photo to see it full screen ----------
document.addEventListener("click", e => {
  const img = e.target.closest(".photo-frame img");
  if (!img) return;
  const box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
  const close = () => { box.remove(); document.removeEventListener("keydown", onKey); };
  const onKey = ev => { if (ev.key === "Escape") close(); };
  box.addEventListener("click", close);
  document.addEventListener("keydown", onKey);
  document.body.appendChild(box);
});

// ---------- arrow keys: previous / next memory ----------
document.addEventListener("keydown", e => {
  if (document.querySelector(".lightbox")) return;
  const prev = document.querySelector(".pager .prev");
  const next = document.querySelector(".pager .next");
  if (e.key === "ArrowLeft" && prev) location.href = prev.href;
  if (e.key === "ArrowRight" && next) location.href = next.href;
});