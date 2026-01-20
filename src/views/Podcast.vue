<template>
  <main>
    <!-- HERO -->
    <section class="hero">
      <div class="container hero-inner">
        <div>
          <div class="hero-highlight">พอดแคสต์สำหรับหัวใจที่กำลังคิดเยอะ</div>
          <h1 class="hero-title">พอดแคสต์ที่อยากนั่งคุยกับใจคุณ</h1>
          <p class="hero-text">
            รวมตอนสั้น ๆ ที่พูดถึงเรื่องความรู้สึก ความสัมพันธ์
            และวันที่ไม่ง่ายเท่าไหร่
          </p>

          <div class="hero-actions">
            <a href="#episodes" class="btn btn-primary">
              เลือกตอนที่อยากฟัง
            </a>
          </div>
        </div>

        <!-- 🔥 HERO VIDEO POPUP -->
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

    <!-- EPISODES -->
    <section id="episodes" class="section section--soft">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">ตอนต่าง ๆ ใน Podcast</h2>
          <p class="section-subtitle">
            เลือกตอนที่ตรงกับความรู้สึกของคุณในตอนนี้
          </p>
        </div>

        <div class="grid-2">
          <article class="card">
            <div class="card-tag">EP. 01</div>
            <h3 class="card-title">เมื่อเราเหนื่อยแต่ไม่รู้จะพักยังไง</h3>
            <p class="card-text">
              สำรวจความเหนื่อยที่ไม่ได้มาจากงาน
              แต่มาจากหัวใจที่ต้องเข้มแข็งตลอดเวลา
            </p>

            <!-- popup video ต่อ episode ได้ -->
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
    callbacks: {
      markupParse(template) {
        setTimeout(() => {
          const iframe = template.find("iframe");
          if (iframe.length) {
            iframe.attr("allowfullscreen", "");
            iframe.attr(
              "allow",
              "encrypted-media; microphone; camera; geolocation"
            );
            iframe.attr("scrolling", "no");
            iframe.attr(
              "referrerpolicy",
              "no-referrer-when-downgrade"
            );
          }
        }, 50);
      },
    },
  });

  // รองรับ redirect จาก iframe (Mindstamp)
  window.addEventListener("message", (event) => {
    if (event.data?.event === "redirect") {
      window.location.href = event.data.info.data.link;
    }
  });
});
</script>

<style scoped>
/* HERO VIDEO */
.podcast-video-card {
  position: relative;
  display: block;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.podcast-video-card img {
  width: 100%;
  max-width: 420px;
  display: block;
}

.play-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  color: #ffffff;
  background: rgba(0, 0, 0, 0.35);
  transition: background 0.2s ease;
}

.podcast-video-card:hover .play-overlay {
  background: rgba(0, 0, 0, 0.5);
}
</style>