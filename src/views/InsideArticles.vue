<template>
  <main ref="page" class="inside-articles inside-interactive">
    <section class="section section--soft">
      <div class="container">
        <RouterLink to="/inside" class="back-link">
          ← กลับไปหน้า Inside
        </RouterLink>

        <header class="articles-header">
          <span class="hero-highlight">โลกข้างในตัวเรา</span>
          <h1 class="articles-title">บทความจากโลกข้างใน</h1>
          <p class="articles-subtitle">
            รวมเรื่องเล็ก ๆ จากความรู้สึกที่หลายคนอาจกำลังเผชิญอยู่เหมือนกัน  
            อ่านช้า ๆ ในจังหวะของคุณเอง
          </p>
          <p class="articles-schedule">
            วันนี้มี {{ dailyArticles.length }} บทความ · เปลี่ยนชุดใหม่ทุกวัน
          </p>
        </header>

        <div class="articles-list">
          <article
            v-for="(article, index) in dailyArticles"
            :key="article.id"
            class="article-card"
            data-reveal
            role="button"
            tabindex="0"
            aria-haspopup="dialog"
            :aria-label="`เปิดอ่าน ${article.title}`"
            @click="openArticle(index, $event.currentTarget)"
            @keydown.enter.prevent="openArticle(index, $event.currentTarget)"
            @keydown.space.prevent="openArticle(index, $event.currentTarget)"
          >
            <span v-if="article.tag" class="article-tag">
              {{ article.tag }}
            </span>

            <h3 class="article-title">
              {{ article.title }}
            </h3>

            <p class="article-summary">
              {{ article.summary }}
            </p>

            <span class="read-hint" aria-hidden="true">เปิดอ่านในจังหวะของคุณ ↗</span>
          </article>
        </div>
      </div>
    </section>
    <Teleport to="body">
      <dialog ref="reader" class="article-reader" aria-labelledby="reader-title" @close="finishClose" @click="closeOnBackdrop">
        <button class="reader-close" type="button" autofocus aria-label="ปิดบทความ" @click="closeReader">×</button>
        <div v-if="activeArticle" :key="activeArticle.id" class="reader-content">
          <span class="article-tag">{{ activeArticle.tag }}</span>
          <p class="reader-position" aria-live="polite">บทความที่ {{ activeIndex + 1 }} จาก {{ dailyArticles.length }} ของวันนี้</p>
          <h2 id="reader-title" ref="readerTitle" tabindex="-1">{{ activeArticle.title }}</h2>
          <p class="reader-text">{{ activeArticle.summary }}</p>
          <div class="reader-footer">
            <span>อ่านช้า ๆ ในจังหวะของคุณเอง</span>
            <button type="button" class="reader-next" @click="nextArticle">
              {{ activeIndex === dailyArticles.length - 1 ? 'กลับไปบทความแรก ↗' : 'บทความถัดไป →' }}
            </button>
          </div>
        </div>
      </dialog>
    </Teleport>
  </main>
</template>

<script setup>
import { computed, ref, nextTick, onBeforeUnmount } from "vue";
import { useInsideMotion } from "../composables/useInsideMotion";
import "../assets/insideInteractions.css";

const page = ref(null);
useInsideMotion(page);
import { RouterLink } from "vue-router";
import { insideArticles } from "../data/insideArticles";

const ARTICLES_PER_DAY = 5;

const getMonday = (date) => {
  const monday = new Date(date);
  monday.setHours(0, 0, 0, 0);
  const day = monday.getDay() || 7;
  monday.setDate(monday.getDate() - day + 1);
  return monday;
};

const createSeed = (value) => [...value].reduce(
  (seed, character) => ((seed * 31) + character.charCodeAt(0)) >>> 0,
  0,
);

const shuffleForWeek = (items, weekKey) => {
  let seed = createSeed(weekKey);
  const random = () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let result = seed;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };

  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

const dailyArticles = computed(() => {
  const today = new Date();
  const monday = getMonday(today);
  const dayIndex = Math.floor((today - monday) / 86_400_000);
  const weekKey = monday.toISOString().slice(0, 10);
  const weeklyArticles = shuffleForWeek(insideArticles, weekKey);
  const start = dayIndex * ARTICLES_PER_DAY;

  return weeklyArticles.slice(start, start + ARTICLES_PER_DAY);
});

const reader = ref(null);
const readerTitle = ref(null);
const activeIndex = ref(0);
const activeArticle = computed(() => dailyArticles.value[activeIndex.value]);
let opener;
let previousOverflow;
function openArticle(index, target) {
  if (!reader.value || reader.value.open) return;
  activeIndex.value = index;
  opener = target;
  previousOverflow = document.body.style.overflow;
  reader.value.showModal();
  document.body.style.overflow = "hidden";
}
function finishClose() {
  if (previousOverflow === undefined) return;
  document.body.style.overflow = previousOverflow;
  previousOverflow = undefined;
  if (opener?.isConnected) opener.focus({ preventScroll: true });
}
function closeReader() { reader.value?.close(); }
function closeOnBackdrop(event) {
  if (event.target !== reader.value) return;
  const bounds = reader.value.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeReader();
}
async function nextArticle() {
  activeIndex.value = (activeIndex.value + 1) % dailyArticles.value.length;
  await nextTick();
  reader.value?.scrollTo({ top: 0, behavior: "instant" });
  readerTitle.value?.focus({ preventScroll: true });
}
onBeforeUnmount(() => { closeReader(); finishClose(); });
</script>

<style scoped>
.back-link {
  display: inline-block;
  margin-bottom: 1.2rem;
  font-size: 0.85rem;
  color: var(--color-text-soft);
  text-decoration: none;
}

.back-link:hover {
  color: var(--color-accent);
}

.articles-header {
  margin-bottom: 2rem;
}

.articles-title {
  font-size: 1.8rem;
  margin: 0.3rem 0 0.5rem;
}

.articles-subtitle {
  font-size: 0.95rem;
  color: var(--color-text-soft);
}

.articles-schedule {
  margin: 0.7rem 0 0;
  font-size: 0.8rem;
  color: var(--color-text-soft);
}

.articles-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
}

.article-card {
  background: #ffffff;
  border-radius: 22px;
  padding: 1.5rem 1.4rem;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(255, 220, 210, 0.6);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(255, 138, 128, 0.18);
}

.article-tag {
  display: inline-block;
  font-size: 0.75rem;
  color: var(--color-accent);
  background: rgba(255, 138, 128, 0.12);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  margin-bottom: 0.4rem;
}

.article-title {
  font-size: 1.1rem;
  margin: 0.2rem 0 0.4rem;
}

.article-summary {
  font-size: 0.9rem;
  color: var(--color-text-soft);
  line-height: 1.6;
}

@media (min-width: 768px) {
  .articles-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.article-card { cursor: pointer; }
.article-card:focus-visible { outline: 2px solid #b86b72; outline-offset: 5px; }
.read-hint { display: inline-block; margin-top: .6rem; color: #94656b; font-size: .78rem; }
.article-reader {
  width: min(680px, calc(100% - 2rem)); max-height: calc(100dvh - 2rem);
  padding: 3.3rem 2.5rem 2rem; overflow-y: auto; overscroll-behavior: contain;
  border: 1px solid #f0d8d2; border-radius: 26px; background: #fffaf7;
  color: #473c3d; box-shadow: 0 24px 80px #51373b26;
}
.article-reader::backdrop { background: #49363945; backdrop-filter: blur(4px); }
.article-reader[open], .reader-content { animation: inside-enter 300ms both; }
.reader-close { position: absolute; top: .65rem; right: .8rem; width: 44px; height: 44px; border: 0; border-radius: 50%; background: transparent; color: #80565a; font-size: 1.6rem; cursor: pointer; }
.reader-position { font-size: .75rem; color: #8b6e74; margin: .5rem 0 1rem; }
#reader-title { font-size: clamp(1.35rem, 4vw, 1.85rem); line-height: 1.5; margin-bottom: 1.2rem; }
.reader-text { font-size: 1.05rem; line-height: 2; white-space: pre-line; }
.reader-footer { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 1rem; margin-top: 2rem; padding-top: 1.2rem; border-top: 1px solid #efd8d4; }
.reader-footer span { color: #8b6e74; font-size: .78rem; }
.reader-next { padding: .7rem 1rem; border: 1px solid #efd8d4; border-radius: 999px; background: #fbecec; color: #694b50; font: inherit; font-size: .85rem; cursor: pointer; }
.article-reader button { transition: transform 180ms, background-color 180ms; }
.article-reader button:focus-visible { outline: 2px solid #b86b72; outline-offset: 4px; }
.article-reader button:active { transform: scale(.98); }
@media (hover: hover) { .article-reader button:hover { background: #f5dedb; } }
@media (max-width: 480px) {
  .article-reader { padding: 3.3rem 1.25rem 1.5rem; }
  .reader-footer { flex-direction: column; align-items: stretch; }
}
@media (prefers-reduced-motion: reduce) {
  .article-reader[open], .reader-content { animation: none; }
  .article-reader button { transition: none; }
  .article-reader button:active { transform: none; }
}
</style>
