<template>
  <main class="inside-result">
    <section class="hero hero-compact">
      <div class="container">
        <span class="hero-highlight">ผลจากแบบสำรวจหัวใจของคุณ</span>
        <h1 class="hero-title">
          ตอนนี้ใจของคุณ<br />อาจกำลังเป็นแบบนี้
        </h1>
        <p class="hero-text">
          ไม่ใช่การวินิจฉัย แค่เป็นกระจกเล็ก ๆ
          ที่ช่วยสะท้อนความรู้สึกของคุณในช่วงนี้
        </p>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="score-emotion">
          <div class="score-label">ระดับความเหนื่อยของหัวใจตอนนี้</div>
          <div class="score-value">
            <span>{{ score }}</span>
            <small>/ 9</small>
          </div>
        </div>

        <div class="emotion-card">
          <template v-if="level === 'light'">
            <h3>คุณกำลังพอรับมือได้อยู่</h3>
            <p>
              ตอนนี้ชีวิตอาจมีความเหนื่อยอยู่บ้าง
              แต่คุณยังมีพื้นที่หายใจ และวิธีดูแลตัวเองอยู่
            </p>
            <p>
              การหยุดอ่านบทความสั้น ๆ หรืออยู่กับตัวเองเงียบ ๆ
              ก็ถือเป็นการพักใจที่ดีแล้ว
            </p>
          </template>

          <template v-else-if="level === 'medium'">
            <h3>คุณอาจกำลังเหนื่อยมากกว่าที่คิด</h3>
            <p>
              เหมือนหัวใจของคุณกำลังแบกหลายอย่างพร้อมกัน
              ทั้งความคาดหวัง ความกดดัน และคำถามกับตัวเอง
            </p>
            <p>
              ถ้าคุณอยากเล่า ลองเริ่มจากพื้นที่ที่ปลอดภัย
              หรือ SAFE SPACE ของ FUNGJAI ก็ได้
              ไม่จำเป็นต้องเล่าทั้งหมดในครั้งเดียว
            </p>
          </template>

          <template v-else>
            <h3>หัวใจของคุณอาจกำลังเหนื่อยมากจริง ๆ</h3>
            <p>
              จากคะแนนนี้ ดูเหมือนว่าคุณกำลังถืออะไรหนักพอสมควร
              ทั้งความเหนื่อย ความโดดเดี่ยว และแรงกดดัน
            </p>
            <p>
              แค่คุณยังอยู่ตรงนี้ และทำแบบสำรวจจนจบ
              ก็ถือว่าเก่งมากแล้วนะ
            </p>
            <p>
              คุณไม่จำเป็นต้องผ่านทุกอย่างไปคนเดียวเสมอไป
            </p>
          </template>
        </div>

        <div class="result-actions">
          <RouterLink to="/safe-space" class="btn btn-primary">
            ไปยัง SAFE SPACE
          </RouterLink>

          <RouterLink to="/inside" class="btn btn-ghost">
            อ่านบทความเพิ่มเติม
          </RouterLink>

          <RouterLink to="/inside-question" class="action-link">
            ทำแบบสำรวจอีกครั้ง
          </RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { useRoute, RouterLink } from "vue-router";

const route = useRoute();

const score = computed(() => Number(route.query.score || 0));

const level = computed(() => {
  if (score.value <= 3) return "light";
  if (score.value <= 6) return "medium";
  return "heavy";
});
</script>

<style scoped>
.hero-compact {
  padding: 2.2rem 0 1.6rem;
}

.score-emotion {
  text-align: center;
  margin-bottom: 1.4rem;
}

.score-label {
  font-size: 0.85rem;
  color: var(--color-text-soft);
  margin-bottom: 0.2rem;
}

.score-value {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-accent);
}

.score-value small {
  font-size: 1rem;
  color: var(--color-text-soft);
}

.emotion-card {
  background: #fff;
  border-radius: 24px;
  padding: 1.8rem 1.6rem;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(255, 220, 210, 0.6);
}

.emotion-card h3 {
  font-size: 1.25rem;
  margin-bottom: 0.6rem;
}

.emotion-card p {
  font-size: 0.95rem;
  color: var(--color-text-soft);
  margin-bottom: 0.7rem;
}

.result-actions {
  margin-top: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.action-link {
  text-align: center;
  font-size: 0.85rem;
  color: var(--color-text-soft);
  text-decoration: underline;
}
</style>