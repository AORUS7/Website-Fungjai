import { onMounted, onBeforeUnmount } from "vue";

// Content stays visible if observation or animation is unavailable.
export function useInsideMotion(page) {
  let observer;
  let media;
  let revealAll;
  onMounted(() => {
    media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const elements = [...(page.value?.querySelectorAll("[data-reveal]") || [])];
    revealAll = () => {
      observer?.disconnect();
      elements.forEach((element) => element.classList.remove("reveal-pending"));
    };
    if (media.matches || !("IntersectionObserver" in window)) return;
    observer = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (!isIntersecting) return;
        target.classList.remove("reveal-pending");
        observer.unobserve(target);
      });
    }, { threshold: 0.12 });
    elements.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${(index % 3) * 90}ms`);
      element.classList.add("reveal-pending");
      observer.observe(element);
    });
    media.addEventListener("change", revealAll);
  });
  onBeforeUnmount(() => {
    observer?.disconnect();
    if (revealAll) media?.removeEventListener("change", revealAll);
  });
}
