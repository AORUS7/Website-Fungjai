<template>
  <main class="inside-result">
    <section class="hero hero-compact">
      <div class="container">
        <span class="hero-highlight">ผลการประเมิน ST-5</span>
        <h1 class="hero-title">ระดับความเครียดของคุณตอนนี้</h1>
        <p class="hero-text">
          นี่ไม่ใช่การวินิจฉัยทางการแพทย์
          แต่เป็นภาพสะท้อนความรู้สึกของคุณในช่วงนี้
        </p>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="score-box">
          <div class="score-label">คะแนนรวม</div>
          <div class="score-value">{{ score }} <small>/ 15</small></div>
        </div>

        <div class="emotion-card">
          <template v-if="level === 'low'">
            <h3>ความเครียดน้อย (0–4 คะแนน)</h3>
            <p>
              คุณอาจมีความเครียดเล็กน้อยตามปกติของชีวิต
              ยังอยู่ในระดับที่จัดการได้
            </p>
          </template>

          <template v-else-if="level === 'medium'">
            <h3>ความเครียดปานกลาง (5–7 คะแนน)</h3>
            <p>
              ช่วงนี้อาจมีหลายเรื่องให้กังวล
              ลองจัดเวลาพักผ่อนหรือพูดคุยกับคนที่ไว้ใจดูนะ
            </p>
          </template>

          
          
          <template v-else-if="level === 'high'">
            <h3>ความเครียดมาก (8–9 คะแนน)</h3>
            <p>
              คุณอาจกำลังเผชิญแรงกดดันหลายด้าน
              การดูแลตัวเองและขอความช่วยเหลือเป็นสิ่งสำคัญ
            </p>
          </template>

          <template v-else>
            <h3>ความเครียดมากที่สุด (10–15 คะแนน)</h3>
            <p>
              คะแนนนี้สะท้อนว่าคุณอาจกำลังเผชิญความเครียดระดับสูงมาก
              หากรู้สึกไม่ไหว ควรพิจารณาปรึกษาผู้เชี่ยวชาญ
            </p>
          </template>
        </div>

        <div class="result-actions">
          <RouterLink to="/inside-question" class="btn-primary">
            ทำแบบประเมินอีกครั้ง
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
  if (score.value <= 4) return "low";
  if (score.value <= 7) return "medium";
  if (score.value <= 9) return "high";
  return "veryHigh";
});
</script>

<style scoped>
.hero-compact {
  padding: 2.5rem 0 1.5rem;
  text-align: center;
}

.score-box {
  text-align: center;
  margin-bottom: 2rem;
}

.score-label {
  font-size: 0.9rem;
  color: var(--color-text-soft);
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
  border-radius: 28px;
  padding: 2rem;
  border: 1px solid rgba(255, 220, 210, 0.6);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.05);
}

.emotion-card h3 {
  margin-bottom: 0.8rem;
}

.emotion-card p {
  color: var(--color-text-soft);
  line-height: 1.6;
}

.result-actions {
  margin-top: 2.5rem;
  display: flex;
  justify-content: center;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #ff8a80, #ff6f91);
  color: #ffffff;
  text-decoration: none;
  border: none;
  padding: 1rem 2.4rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.5px;
  cursor: pointer;
  box-shadow: 0 12px 30px rgba(255, 120, 130, 0.35);
  transition: all 0.25s ease;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(255, 120, 130, 0.45);
}

.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 6px 18px rgba(255, 120, 130, 0.3);
}
</style>
