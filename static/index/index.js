// Day you got together (YYYY-MM-DD)
const START = new Date("2026-06-11T00:00:00");

// ---------- live counter ----------
const el = id => document.getElementById(id);
function tick() {
  const diff = Math.max(0, Math.floor((Date.now() - START) / 1000));
  el("d").textContent = Math.floor(diff / 86400);
  el("h").textContent = Math.floor(diff / 3600) % 24;
  el("m").textContent = Math.floor(diff / 60) % 60;
  el("s").textContent = diff % 60;
}
tick();
setInterval(tick, 1000);

// ---------- fade cards in on scroll ----------
const cards = document.querySelectorAll(".card");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("show");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach(c => io.observe(c));
} else {
  cards.forEach(c => c.classList.add("show"));
}

// ---------- secret button ----------
const btn = el("secretBtn");
btn.addEventListener("click", () => {
  el("secretMsg").classList.remove("hidden");
  btn.textContent = "I love you ♥";
  for (let i = 0; i < 30; i++) {
    setTimeout(() => {
      const h = document.createElement("div");
      h.className = "heart";
      h.textContent = "♥";
      h.style.left = Math.random() * 100 + "vw";
      h.style.fontSize = 18 + Math.random() * 20 + "px";
      h.style.color = "#c8956d";
      document.body.appendChild(h);
      setTimeout(() => h.remove(), 3000);
    }, i * 110);
  }
});

// ---------- missing photo -> show a heart box instead of a broken icon ----------
document.querySelectorAll(".card img").forEach(img => {
  const swap = () => {
    const box = document.createElement("div");
    box.className = "photo-fallback";
    box.textContent = "♥";
    box.setAttribute("role", "img");
    box.setAttribute("aria-label", img.alt);
    img.replaceWith(box);
  };
  img.addEventListener("error", swap);
  if (img.complete && img.naturalWidth === 0) swap();
});