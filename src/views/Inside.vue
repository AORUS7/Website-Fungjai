<template>
  <main ref="page" class="inside-page inside-interactive">
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <span class="hero-highlight">โลกข้างในตัวเรา</span>

          <h1 class="hero-title">What's Going On Inside</h1>

          <p class="hero-text">
            หลายครั้งเราไม่รู้จะอธิบายความรู้สึกของตัวเองยังไง
            แค่รู้สึกว่ายุ่งเหยิง ว่างเปล่า หรือเหนื่อยแบบบอกไม่ถูก
            หน้านี้คือพื้นที่ที่ชวนคุณค่อย ๆ รู้จักโลกข้างในตัวเอง
            ให้ชัดขึ้นทีละนิด
          </p>

          <div class="hero-actions">
            <RouterLink to="/inside/articles" class="btn btn-primary">
              เริ่มอ่านบทความ
            </RouterLink>
            <RouterLink to="/inside-question" class="btn btn-ghost">
              ลองทำแบบสำรวจความรู้สึก
            </RouterLink>
          </div>

          <p class="hero-note">
            ไม่มีวิธีที่ถูกหรือผิด  
            มีแค่จังหวะที่หัวใจคุณไหวในวันนี้ 💗
          </p>
        </div>

        <div class="hero-visual" data-reveal>
          <div class="hero-card">
            <div class="hero-chip">
              <span class="hero-chip-dot"></span>
              อ่านช้า ๆ ในจังหวะของคุณเอง
            </div>

            <p class="hero-quote">
              “เราไม่จำเป็นต้องเข้าใจทุกอย่างในใจตัวเองวันนี้
              แค่ยอมรับว่ามันมีอยู่ ก็ถือว่าเป็นก้าวแรกแล้ว”
              <small>– บันทึกจาก FUNGJAI</small>
            </p>
          </div>
        </div>
      </div>
    </section>

    <section id="inside-feelings" class="section section--soft" tabindex="-1">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            ถ้าวันนี้หัวใจของคุณกำลังรู้สึกแบบนี้…
          </h2>
          <p class="section-subtitle">
            ลองอ่านข้อความสั้น ๆ เหล่านี้เป็นเหมือนการตั้งสติเบา ๆ
          </p>
        </div>

        <div class="feeling-list">
          <article class="card card-soft" data-reveal>
            <h3 class="card-title">รู้สึกยุ่งเหยิง สับสนไปหมด</h3>
            <p class="card-text">
              ตอนนี้ไม่จำเป็นต้องหาคำตอบให้ทุกอย่างก็ได้
              แค่ยอมรับว่าตัวเองกำลังสับสนอยู่จริง ๆ
              ก็ถือว่าเป็นจุดเริ่มต้นที่ดีมากแล้ว
            </p>
          </article>

          <article class="card card-soft" data-reveal>
            <h3 class="card-title">เหนื่อย แต่ไม่รู้จะพักยังไง</h3>
            <p class="card-text">
              การพักไม่จำเป็นต้องเป็นอะไรยิ่งใหญ่
              บางครั้งการได้อ่านประโยคที่ทำให้รู้ว่า
              “เราไม่ได้รู้สึกแบบนี้คนเดียว”
              ก็เป็นการพักใจแบบหนึ่ง
            </p>
          </article>

          <article class="card card-soft" data-reveal>
            <h3 class="card-title">อยากลองคุยกับตัวเองดูสักครั้ง</h3>
            <p class="card-text">
              การตอบคำถามสั้น ๆ ช้า ๆ
              อาจช่วยให้คุณเห็นภาพหัวใจตัวเองชัดขึ้น
              โดยไม่ต้องเร่งรีบ
            </p>
          </article>
        </div>

        <div class="quote-wrap" data-reveal>
          <div class="quote-block">
            <p>
              “ไม่ว่าคุณจะเลือกเริ่มจากการอ่านบทความ
              หรือทำแบบสำรวจความรู้สึก
              ทุกทางล้วนเป็นการดูแลตัวเอง”
            </p>
            <span>
              เลือกวิธีที่อ่อนโยนที่สุดกับหัวใจของคุณในวันนี้ก็พอ
            </span>
          </div>
        </div>
      </div>
    </section>
    <Teleport to="body">
      <dialog ref="dailyDialog" class="daily-dialog" aria-labelledby="daily-title" aria-describedby="daily-description" @close="restoreDailyFocus" @click="closeDailyBackdrop">
        <header class="daily-heading">
          <span class="daily-eyebrow">A LITTLE SPACE FOR YOUR HEART</span>
          <button type="button" class="daily-close" aria-label="ปิดข้อความประจำวัน" autofocus @click="closeDaily">×</button>
          <h2 id="daily-title">5 ข้อความสำหรับใจวันนี้</h2>
          <p id="daily-description">ค่อย ๆ อ่าน ไม่ต้องรีบ ให้ใจได้พักในจังหวะของคุณ</p>
        </header>
        <div class="daily-messages">
          <article v-for="(article, index) in dailyMessages" :key="article.id" class="daily-message" :style="{ '--message-delay': `${100 + index * 90}ms` }">
            <span class="daily-tag">{{ article.tag }}</span>
            <h3>{{ article.title }}</h3>
            <p>{{ article.summary }}</p>
          </article>
        </div>
        <footer class="daily-footer">
          <span>ชุดข้อความประจำวันของคุณ · เปลี่ยนใหม่ทุกวัน</span>
          <button type="button" class="daily-done" @click="closeDaily">ค่อย ๆ ไปต่อ →</button>
        </footer>
      </dialog>
    </Teleport>
  </main>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { RouterLink } from "vue-router";
import { useInsideMotion } from "../composables/useInsideMotion";
import "../assets/insideInteractions.css";

import { auth } from "../firebase";
import { insideArticles } from "../data/insideArticles";
import { getInsideDeviceId, selectInsideArticles } from "../utils/insideSelection";

const dailyDialog = ref(null);
const dailyMessages = ref([]);
let previousFocus;
let previousOverflow;
let popupTimer;
function closeDaily() { dailyDialog.value?.close(); }
function restoreDailyFocus() {
  if (previousOverflow === undefined) return;
  document.body.style.overflow = previousOverflow;
  previousOverflow = undefined;
  if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
}
function closeDailyBackdrop(event) {
  if (event.target !== dailyDialog.value) return;
  const bounds = dailyDialog.value.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) closeDaily();
}
onMounted(() => {
  popupTimer = window.setTimeout(() => {
    dailyMessages.value = selectInsideArticles(insideArticles, `${auth.currentUser?.uid || "guest"}:${getInsideDeviceId()}`, new Date());
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    dailyDialog.value.showModal();
    document.body.style.overflow = "hidden";
  }, 250);
});
onBeforeUnmount(() => {
  window.clearTimeout(popupTimer);
  closeDaily();
  restoreDailyFocus();
});

const page = ref(null);
useInsideMotion(page);
</script>

<style scoped>
.inside-page {
  overflow-x: hidden;
}

.hero {
  padding: 3rem 0 2.5rem;
}

.hero-inner {
  display: grid;
  gap: 2.2rem;
}

/* TEXT */
.hero-content {
  max-width: 560px;
}

.hero-highlight {
  display: inline-block;
  margin-bottom: 0.5rem;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 138, 128, 0.12);
  color: var(--color-accent);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
}

.hero-title {
  font-size: 1.8rem;
  margin: 0 0 0.6rem;
}

.hero-text {
  font-size: 0.95rem;
  color: var(--color-text-soft);
  margin-bottom: 1.2rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.hero-note {
  font-size: 0.85rem;
  color: var(--color-text-soft);
}

/* VISUAL */
.hero-visual {
  display: flex;
  justify-content: center;
}

.hero-card {
  max-width: 360px;
  padding: 1.6rem 1.4rem;
  border-radius: 24px;
  background: radial-gradient(circle at 10% 0%, #ffe9df, #ffdbe9);
  box-shadow: var(--shadow-soft);
}

.hero-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.75);
  font-size: 0.75rem;
  margin-bottom: 0.8rem;
}

.hero-chip-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6dd1a1;
}

.hero-quote {
  font-size: 0.9rem;
  color: #4b3b3b;
}

.feeling-list {
  display: grid;
  gap: 1.2rem;
}

.quote-wrap {
  margin-top: 2.2rem;
}

@media (min-width: 768px) {
  .hero-inner {
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
  }

  .hero-title {
    font-size: 2.1rem;
  }

  .feeling-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1.6rem;
  }
}

.daily-dialog {
  width: min(840px, calc(100% - 2rem)); max-height: calc(100dvh - 2rem);
  padding: 0; overflow-y: auto; overscroll-behavior: contain;
  border: 1px solid #efd8d4; border-radius: 26px; background: #fffaf7;
  color: #473c3d; box-shadow: 0 24px 80px #51373b26;
}
.daily-dialog::backdrop { background: #49363945; backdrop-filter: blur(4px); }
.daily-dialog[open] { animation: inside-enter 350ms both; }
.daily-heading { position: relative; padding: 2rem 2rem 1.2rem; }
.daily-eyebrow { display: block; padding-right: 2rem; font-size: .65rem; letter-spacing: .15em; color: #9c7175; }
.daily-heading h2 { font-size: clamp(1.3rem, 4vw, 1.8rem); margin: .7rem 0 .4rem; }
.daily-heading p { font-size: .9rem; color: #80696e; margin: 0; }
.daily-close { position: absolute; top: .65rem; right: .8rem; width: 44px; height: 44px; border: 0; border-radius: 50%; background: #fffaf7; color: #80565a; font-size: 1.6rem; cursor: pointer; }
.daily-messages { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .9rem; padding: 0 2rem; }
.daily-message { border: 1px solid #f0dcd6; border-radius: 18px; padding: 1.1rem; background: #fff; }
.daily-dialog[open] .daily-message { animation: inside-enter 500ms both; animation-delay: var(--message-delay); }
.daily-message:last-child { grid-column: 1 / -1; }
.daily-tag { display: inline-block; padding: .15rem .55rem; background: #fff0ed; border-radius: 999px; color: #94656b; font-size: .7rem; }
.daily-message h3 { font-size: 1rem; line-height: 1.5; margin: .5rem 0; }
.daily-message p { margin: 0; color: #746366; font-size: .87rem; line-height: 1.8; }
.daily-footer { padding: 1.2rem 2rem 1.5rem; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: .8rem; }
.daily-footer span { font-size: .75rem; color: #8b6e74; }
.daily-done { padding: .7rem 1rem; border: 1px solid #efd8d4; border-radius: 999px; background: #fbecec; color: #694b50; font: inherit; font-size: .85rem; cursor: pointer; }
.daily-dialog button { transition: background-color 180ms, transform 180ms; }
.daily-dialog button:focus-visible { outline: 2px solid #b86b72; outline-offset: 3px; }
.daily-dialog button:active { transform: scale(.98); }
@media (hover: hover) { .daily-dialog button:hover { background: #f5dedb; } }
@media (max-width: 600px) {
  .daily-heading { padding: 2.4rem 1.1rem 1rem; }
  .daily-messages { grid-template-columns: 1fr; padding: 0 1.1rem; }
  .daily-footer { padding: 1rem 1.1rem 1.3rem; }
}
@media (prefers-reduced-motion: reduce) {
  .daily-dialog[open], .daily-dialog[open] .daily-message { animation: none; }
  .daily-dialog button { transition: none; }
  .daily-dialog button:active { transform: none; }
}
</style>