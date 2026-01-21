<template>
  <main class="podcast-page">
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <span class="hero-highlight">พอดแคสต์สำหรับหัวใจที่กำลังคิดเยอะ</span>

          <h1 class="hero-title">
            พอดแคสต์ที่อยากนั่งคุยกับใจคุณ
          </h1>

          <p class="hero-text">
            รวมตอนสั้น ๆ ที่พูดถึงเรื่องความรู้สึก ความสัมพันธ์
            และวันที่ไม่ง่ายเท่าไหร่ ฟังได้แบบไม่ต้องพยายามเข้มแข็ง
          </p>

          <div class="hero-actions">
            <a href="#episodes" class="btn btn-primary">
              เลือกตอนที่อยากฟัง
            </a>
          </div>
        </div>

        <div class="hero-visual">
          <a
            class="popup-video podcast-video-card"
            href="https://embed.mindstamp.com/e/jLPkFJBKGQBd?fullscreen=1"
          >
            <img
              src="https://mindstamp-pub.s3.us-west-1.amazonaws.com/users/85fe6885-124e-4414-b8fd-9e4fb611bead/images/1767386688-deab93ff-105e-4d20-87b0-626901f58da1-thumbnail.jpg"
              alt="Play Podcast"
            />
            <div class="play-overlay">▶</div>
          </a>
        </div>
      </div>
    </section>

    <section id="episodes" class="section section--soft">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">ตอนต่าง ๆ ใน Podcast</h2>
          <p class="section-subtitle">
            เลือกตอนที่ตรงกับความรู้สึกของคุณในตอนนี้
          </p>
        </div>

        <div class="grid-2">
          <article class="card episode-card">
            <div class="card-tag">EP. 01</div>
            <h3 class="card-title">
              เมื่อเราเหนื่อยแต่ไม่รู้จะพักยังไง
            </h3>
            <p class="card-text">
              สำรวจความเหนื่อยที่ไม่ได้มาจากงาน
              แต่มาจากหัวใจที่ต้องเข้มแข็งตลอดเวลา
            </p>

            <a
              class="popup-video btn btn-ghost"
              href="https://embed.mindstamp.com/e/jLPkFJBKGQBd?fullscreen=1"
            >
              กดฟังตอนนี้
            </a>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from "vue";
import $ from "jquery";
import "magnific-popup";
import "magnific-popup/dist/magnific-popup.css";

onMounted(() => {
  $(".popup-video").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    preloader: true,
  });

  window.addEventListener("message", (event) => {
    if (event.data?.event === "redirect") {
      window.location.href = event.data.info.data.link;
    }
  });
});
</script>

<style scoped>
.podcast-page {
  overflow-x: hidden;
}

.hero {
  padding: 3rem 0 2.5rem;
}

.hero-inner {
  display: grid;
  gap: 2rem;
}

.hero-content {
  max-width: 520px;
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
  margin-bottom: 1.6rem;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.podcast-video-card {
  position: relative;
  width: 100%;
  max-width: 420px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.podcast-video-card img {
  width: 100%;
  display: block;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3.5rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.35);
  transition: background 0.25s ease;
}

.podcast-video-card:hover .play-overlay {
  background: rgba(0, 0, 0, 0.5);
}

.episode-card {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.episode-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 14px 34px rgba(0, 0, 0, 0.08);
}

@media (min-width: 768px) {
  .hero-inner {
    grid-template-columns: 1.2fr 1fr;
    align-items: center;
  }

  .hero-title {
    font-size: 2.1rem;
  }

  .hero-actions {
    margin-bottom: 0;
  }
}
</style>