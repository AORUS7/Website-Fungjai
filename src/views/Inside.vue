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
  </main>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import { useInsideMotion } from "../composables/useInsideMotion";
import "../assets/insideInteractions.css";

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
</style>