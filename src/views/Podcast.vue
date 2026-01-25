<template>
  <main class="podcast-page">
    <section class="hero">
      <div class="container">
        <span class="hero-highlight">พอดแคสต์สำหรับหัวใจ</span>
        <h1 class="hero-title">เลือกฟังตามความรู้สึกของคุณ</h1>
        <p class="hero-text">
          ไม่ต้องรีบดีขึ้น แค่ฟังไปพร้อมกันก็พอ 🤍
        </p>
      </div>
    </section>

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
            <h3 class="card-title">{{ ep.title }}</h3>
            <p class="card-text">{{ ep.desc }}</p>

            <button class="btn btn-ghost" @click="openVideo(ep)">
              ▶ กดฟังตอนนี้
            </button>
          </article>
        </div>
      </div>
    </section>

    <dialog ref="videoDialog" class="video-dialog">
      <button class="close-btn" @click="closeVideo">✕</button>

      <video
        v-if="activeVideo"
        :src="activeVideo"
        controls
        autoplay
        playsinline
      ></video>
    </dialog>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";

const categories = [
  { key: "love", label: "ความรัก" },
  { key: "friend", label: "เพื่อน" },
  { key: "family", label: "ครอบครัว" },
  { key: "study", label: "การเรียน" },
];

const activeCategory = ref("love");

const episodes = [
  {
    id: 1,
    category: "love",
    title: "รักใครสักคน แต่ลืมรักตัวเอง",
    desc: "เมื่อความรักทำให้เราอ่อนล้า",
    video: "/video/love.mp4",
  },
  {
    id: 2,
    category: "friend",
    title: "เพื่อนที่ค่อย ๆ หายไป",
    desc: "ความสัมพันธ์ที่เปลี่ยนไปตามเวลา",
    video: "/video/friend.mp4",
  },
  {
    id: 3,
    category: "family",
    title: "บ้านที่กลับไปแล้วไม่เหมือนเดิม",
    desc: "ความรู้สึกที่พูดกับใครไม่ได้",
    video: "/video/family.mp4",
  },
  {
    id: 4,
    category: "study",
    title: "เหนื่อยกับการเรียน แต่ต้องฝืนไหว",
    desc: "แรงกดดันที่ไม่มีใครเห็น",
    video: "/video/study.mp4",
  },
];

const filteredEpisodes = computed(() =>
  episodes.filter((e) => e.category === activeCategory.value)
);

const videoDialog = ref(null);
const activeVideo = ref(null);

const openVideo = (ep) => {
  activeVideo.value = ep.video;
  videoDialog.value.showModal();
};

const closeVideo = () => {
  const video = videoDialog.value.querySelector("video");
  video?.pause();
  activeVideo.value = null;
  videoDialog.value.close();
};
</script>

<style scoped>
.podcast-page {
  overflow-x: hidden;
}

.hero {
  padding: 3rem 0 2.2rem;
}

.hero-highlight {
  display: inline-block;
  padding: 0.25rem 0.7rem;
  border-radius: 999px;
  background: rgba(255, 138, 128, 0.15);
  color: #d05a52;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.hero-title {
  font-size: 1.9rem;
  margin-bottom: 0.6rem;
}

.hero-text {
  font-size: 0.95rem;
  color: #777;
}

.category-tabs {
  display: flex;
  gap: 0.6rem;
  margin-bottom: 1.6rem;
  flex-wrap: wrap;
}

.category-tabs button {
  padding: 0.45rem 1.05rem;
  border-radius: 999px;
  border: 1px solid #ffd7d0;
  background: #fff;
  cursor: pointer;
}

.category-tabs button.active {
  background: #ff8a80;
  color: #fff;
  border-color: transparent;
}

.grid-2 {
  display: grid;
  gap: 1.2rem;
}

.episode-card {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.episode-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.08);
}

.video-dialog {
  border: none;
  border-radius: 18px;
  padding: 0;
  width: min(90vw, 480px);
  background: #000;
}

.video-dialog::backdrop {
  background: rgba(0, 0, 0, 0.6);
}

.video-dialog video {
  width: 100%;
  height: auto;
  border-radius: 18px;
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 10px;
  z-index: 2;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border: none;
  border-radius: 999px;
  padding: 0.3rem 0.6rem;
  cursor: pointer;
}

@media (min-width: 768px) {
  .grid-2 {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>