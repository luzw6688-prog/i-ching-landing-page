const header = document.querySelector("[data-header]");
const hero = document.querySelector(".hero");
const downloadSection = document.querySelector(".download");
const mobileDownload = document.querySelector(".mobile-download");
const dialog = document.querySelector("[data-qr-dialog]");
const openQr = document.querySelector("[data-qr-open]");
const closeQr = document.querySelector("[data-qr-close]");

let isHeroVisible = true;
let isDownloadVisible = false;

function syncDownloadActions() {
  mobileDownload?.classList.toggle("visible", !isHeroVisible && !isDownloadVisible);
}

const heroObserver = new IntersectionObserver(
  ([entry]) => {
    isHeroVisible = entry.isIntersecting;
    header?.classList.toggle("scrolled", !entry.isIntersecting);
    syncDownloadActions();
  },
  { threshold: 0.2 },
);

if (hero) heroObserver.observe(hero);

const downloadObserver = new IntersectionObserver(
  ([entry]) => {
    isDownloadVisible = entry.isIntersecting;
    syncDownloadActions();
  },
  { threshold: 0.22 },
);

if (downloadSection) downloadObserver.observe(downloadSection);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.14, rootMargin: "0px 0px -36px" },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

openQr?.addEventListener("click", () => dialog?.showModal());
closeQr?.addEventListener("click", () => dialog?.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});
