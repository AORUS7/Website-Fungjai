<template>
  <main class="podcast-page">

    <!-- HERO -->
    <section class="hero">
      <div class="container">
        <span class="hero-highlight">พอดแคสต์สำหรับหัวใจ</span>
        <h1 class="hero-title">เลือกฟังตามความรู้สึกของคุณ</h1>
        <p class="hero-text">
          ไม่ต้องรีบดีขึ้น แค่ฟังไปพร้อมกันก็พอ 🤍
        </p>
      </div>
    </section>

    <!-- CATEGORY -->
    <section class="section section--soft">
      <div class="container">
        <div class="category-tabs">
          <button
            v-for="c in categories"
            :key="c.key"
            :class="{ active: activeCategory === c.key }"
            @click="activeCategory = c.key"
          >
            {{ c.label }}
          </button>
        </div>

        <div class="grid-2">
          <article
            v-for="ep in filteredEpisodes"
            :key="ep.id"
            class="card episode-card"
          >
            <h3>{{ ep.title }}</h3>
            <p>{{ ep.desc }}</p>

            <button class="btn btn-ghost" @click="openVideo(ep)">
              ▶ กดฟังตอนนี้
            </button>
          </article>
        </div>
      </div>
    </section>

    <!-- VIDEO DIALOG -->
    <dialog ref="videoDialog" class="video-dialog">
      <button class="close-btn" @click="closeVideo">✕</button>

      <div class="video-wrapper">
        <video
          v-if="activeVideo"
          :key="activeVideo"
          :src="activeVideo"
          autoplay
          controls
          playsinline
          @ended="handleVideoEnd"
        ></video>

        <!-- INTERACTIVE OVERLAY -->
        <div v-if="showQuestion" class="overlay">
          <div class="question-card">
            <h3>{{ activeEpisode?.question }}</h3>

            <button
              v-for="(ans, index) in activeEpisode?.answers"
              :key="index"
              @click="goNext(ans.nextCategory)"
            >
              {{ ans.text }}
            </button>

            <!-- แนะนำครบทุกคลิป -->
            <div class="recommend-box">
              <p>🎧 แนะนำตอนอื่น ๆ</p>
              <button
                v-for="ep in otherEpisodes"
                :key="ep.id"
                @click="openVideo(ep)"
              >
                {{ ep.title }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>

  </main>
</template>

<script setup>
import { ref, computed } from "vue";

/* ---------------- CATEGORY ---------------- */

const categories = [
  { key: "love", label: "ความรัก" },
  { key: "friend", label: "เพื่อน" },
  { key: "family", label: "ครอบครัว" },
  { key: "study", label: "การเรียน" },
  { key: "work", label: "การทำงาน" },
];

const activeCategory = ref("love");

/* ---------------- EPISODES ---------------- */

const episodes = [
  {
    id: 1,
    category: "love",
    title: "รักใครสักคน แต่ลืมรักตัวเอง",
    desc: "เมื่อความรักทำให้เราอ่อนล้า",
    video: "/video/love.mp4",
    question: "หลังดูคลิปนี้ คุณอยากทำอะไรต่อ?",
    answers: [
      { text: "อยากฮีลตัวเอง", nextCategory: "work" },
      { text: "อยากฟังเรื่องความรักต่อ", nextCategory: "love" },
    ],
  },
  {
    id: 2,
    category: "friend",
    title: "เพื่อนที่ค่อย ๆ หายไป",
    desc: "ความสัมพันธ์ที่เปลี่ยนไปตามเวลา",
    video: "/video/friend.mp4",
    question: "คุณรู้สึกแบบไหน?",
    answers: [
      { text: "อยากเข้าใจตัวเอง", nextCategory: "work" },
      { text: "อยากฟังเรื่องครอบครัว", nextCategory: "family" },
    ],
  },
  {
    id: 3,
    category: "family",
    title: "บ้านที่กลับไปแล้วไม่เหมือนเดิม",
    desc: "ความรู้สึกที่พูดกับใครไม่ได้",
    video: "/video/family.mp4",
    question: "อยากไปต่อทางไหน?",
    answers: [
      { text: "อยากฮีลใจ", nextCategory: "work" },
      { text: "อยากฟังเรื่องเพื่อน", nextCategory: "friend" },
    ],
  },
  {
    id: 4,
    category: "study",
    title: "เหนื่อยกับการเรียน แต่ต้องฝืนไหว",
    desc: "แรงกดดันที่ไม่มีใครเห็น",
    video: "/video/study.mp4",
    question: "คุณต้องการอะไรตอนนี้?",
    answers: [
      { text: "พักใจ", nextCategory: "love" },
      { text: "ฟังเรื่องการทำงาน", nextCategory: "work" },
    ],
  },
  {
    id: 5,
    category: "work",
    title: "พักสมองให้ตัวเองสักหน่อย",
    desc: "การดูแลสุขภาพความคิดไม่ใช่เรื่องเห็นแก่ตัว",
    video: "/video/work.mp4",
    question: "อยากฟังอะไรต่อ?",
    answers: [
      { text: "เรื่องความรัก", nextCategory: "love" },
      { text: "เรื่องเพื่อน", nextCategory: "friend" },
    ],
  },
];

const filteredEpisodes = computed(() =>
  episodes.filter((e) => e.category === activeCategory.value)
);

/* ---------------- VIDEO STATE ---------------- */

const videoDialog = ref(null);
const activeVideo = ref(null);
const activeEpisode = ref(null);
const showQuestion = ref(false);

const otherEpisodes = computed(() =>
  episodes.filter((e) => e.id !== activeEpisode.value?.id)
);

/* ---------------- FUNCTIONS ---------------- */

const openVideo = (ep) => {
  activeEpisode.value = ep;
  activeVideo.value = ep.video;
  showQuestion.value = false;
  videoDialog.value.showModal();
};

const closeVideo = () => {
  activeVideo.value = null;
  activeEpisode.value = null;
  showQuestion.value = false;
  videoDialog.value.close();
};

const handleVideoEnd = () => {
  showQuestion.value = true;
};

const goNext = (nextCategory) => {
  const nextEp = episodes.find((e) => e.category === nextCategory);
  if (nextEp) {
    activeEpisode.value = nextEp;
    activeVideo.value = nextEp.video;
    showQuestion.value = false;
  }
};
</script>

<style scoped>
/* ===============================
   PAGE BACKGROUND
================================ */

.podcast-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 15% 10%, rgba(255,138,128,0.08), transparent 40%),
    radial-gradient(circle at 85% 90%, rgba(255,138,128,0.06), transparent 40%),
    #ffffff;
  padding-bottom: 4rem;
}

/* ===============================
   HERO SECTION
================================ */

.hero {
  padding: 4rem 0 2.5rem;
  text-align: center;
}

.hero-highlight {
  display: inline-block;
  padding: 0.3rem 0.9rem;
  border-radius: 999px;
  background: #fff3f2;
  color: #d36b64;
  font-size: 0.75rem;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.hero-title {
  font-size: 2.2rem;
  margin: 1rem 0 0.5rem;
  font-weight: 600;
  color: #2d2d2d;
}

.hero-text {
  font-size: 0.95rem;
  color: #888;
}

/* ===============================
   CATEGORY TABS
================================ */

.category-tabs {
  display: flex;
  justify-content: center;
  gap: 0.8rem;
  flex-wrap: wrap;
  margin: 2.5rem 0 3rem;
}

.category-tabs button {
  padding: 0.55rem 1.3rem;
  border-radius: 999px;
  border: 1px solid #f4e1df;
  background: rgba(255,255,255,0.75);
  backdrop-filter: blur(6px);
  font-size: 0.85rem;
  font-weight: 500;
  color: #b86a64;
  cursor: pointer;
  transition: all 0.25s ease;
}

/* hover */
.category-tabs button:hover {
  background: #fff5f4;
  transform: translateY(-2px);
}

/* active */
.category-tabs button.active {
  background: linear-gradient(135deg, #ff8a80, #ffb3ad);
  color: white;
  border: none;
  box-shadow: 0 10px 30px rgba(255,138,128,0.35);
}

/* ===============================
   EPISODE GRID
================================ */

.grid-2 {
  display: grid;
  gap: 1.8rem;
}

/* EPISODE CARD */

.episode-card {
  background: rgba(255,255,255,0.8);
  backdrop-filter: blur(8px);
  padding: 1.8rem;
  border-radius: 24px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.06);
  transition: all 0.3s ease;
}

.episode-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 30px 80px rgba(255,138,128,0.15);
}

.episode-card h3 {
  font-size: 1.05rem;
  font-weight: 600;
  color: #333;
}

.episode-card p {
  font-size: 0.9rem;
  color: #777;
  margin: 0.5rem 0 1.2rem;
}

/* BUTTON */

.btn-ghost {
  align-self: flex-start;
  padding: 0.55rem 1.2rem;
  border-radius: 999px;
  border: 1px solid #ffe3e0;
  background: #fff6f5;
  font-size: 0.8rem;
  color: #d05a52;
  cursor: pointer;
  transition: all 0.25s ease;
}

.btn-ghost:hover {
  background: linear-gradient(135deg, #ff8a80, #ffb3ad);
  color: white;
  border: none;
}

/* ===============================
   VIDEO MODAL
================================ */

.video-dialog {
  border: none;
  padding: 0;
  width: min(92vw, 480px);
  border-radius: 28px;
  background: transparent;
  overflow: hidden;
}

.video-wrapper {
  position: relative;
  border-radius: 28px;
  aspect-ratio: 9 / 16; 
  overflow: hidden;
  box-shadow: 0 40px 120px rgba(255,138,128,0.25);
}

video {
  width: 100%;
  display: block;
  border-radius: 28px;
}

/* ===============================
   OVERLAY INTERACTIVE
================================ */

.overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(12px);
  background: rgba(255,245,244,0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.4s ease;
}

/* QUESTION CARD */

.question-card {
  background: #ffffff;
  padding: 1.6rem;
  border-radius: 24px;
  width: 85%;
  box-shadow: 0 25px 80px rgba(0,0,0,0.08);
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  text-align: center;
  animation: slideUp 0.35s ease;
}

.question-card h3 {
  font-size: 1rem;
  font-weight: 600;
  color: #444;
}

/* PRIMARY BUTTON */

.question-card > button {
  padding: 0.7rem;
  border-radius: 16px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(135deg, #ff8a80, #ffb3ad);
  color: white;
  transition: all 0.25s ease;
}

.question-card > button:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(255,138,128,0.35);
}

/* ===============================
   RECOMMEND SECTION
================================ */

.recommend-box {
  margin-top: 0.8rem;
  padding-top: 0.8rem;
  border-top: 1px solid #f3e5e4;
}

.recommend-box p {
  font-size: 0.8rem;
  color: #999;
  margin-bottom: 0.6rem;
}

.recommend-box button {
  background: #fff6f5;
  color: #c9645e;
  border: 1px solid #ffe3e0;
  border-radius: 999px;
  padding: 0.4rem 0.9rem;
  margin: 0.25rem;
  font-size: 0.75rem;
  transition: all 0.25s ease;
}

.recommend-box button:hover {
  background: #ff8a80;
  color: white;
  border-color: transparent;
}

/* ===============================
   CLOSE BUTTON
================================ */

.close-btn {
  position: absolute;
  top: 14px;
  right: 16px;
  z-index: 5;
  background: rgba(255,255,255,0.85);
  border: none;
  border-radius: 999px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
  font-size: 0.8rem;
  transition: 0.2s;
}

.close-btn:hover {
  background: #ff8a80;
  color: white;
}

/* ===============================
   ANIMATIONS
================================ */

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>