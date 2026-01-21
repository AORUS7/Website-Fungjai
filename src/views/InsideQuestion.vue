<template>
  <main class="inside-question-page">
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <span class="hero-highlight">แบบสำรวจความรู้สึกเล็ก ๆ</span>

          <h1 class="hero-title">ตอนนี้หัวใจของคุณเป็นยังไงบ้าง</h1>

          <p class="hero-text">
            แบบสอบถามนี้ไม่ใช่การวินิจฉัยอะไรทั้งนั้น
            แค่ช่วยให้คุณได้หยุดดูหัวใจตัวเองสักครู่
            และอาจช่วยให้คุณอธิบายความรู้สึกของตัวเองได้ชัดขึ้นอีกหน่อย
          </p>
        </div>

        <div class="hero-visual">
          <div class="hero-card">
            <div class="hero-chip">
              <span class="hero-chip-dot"></span>
              ไม่มีถูกผิด มีแค่ “ตอนนี้คุณรู้สึกยังไง”
            </div>
            <p class="hero-quote">
              ตอบในระดับที่คุณสบายใจ  
              ไม่ต้องคิดนานก็ได้
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">ลองตอบคำถามเหล่านี้ดู</h2>
          <p class="section-subtitle">
            เลือกคำตอบที่ใกล้กับความรู้สึกของคุณมากที่สุด
            ในช่วงไม่กี่วันมานี้
          </p>
        </div>

        <form class="question-form" @submit.prevent="handleSubmit">
          <div class="question-card">
            <p class="question-title">
              1. ช่วงนี้คุณรู้สึกเหนื่อยหรือหมดแรงง่ายแค่ไหน
            </p>

            <div class="option-list">
              <label class="option">
                <input v-model="q1" type="radio" value="1" />
                แทบไม่รู้สึกเลย
              </label>

              <label class="option">
                <input v-model="q1" type="radio" value="2" />
                มีบ้างเป็นบางวัน
              </label>

              <label class="option">
                <input v-model="q1" type="radio" value="3" />
                รู้สึกบ่อยเกือบทุกวัน
              </label>
            </div>
          </div>

          <div class="question-card">
            <p class="question-title">
              2. ช่วงนี้คุณรู้สึกว่าตัวเอง “ไม่เก่งพอ” บ่อยแค่ไหน
            </p>

            <div class="option-list">
              <label class="option">
                <input v-model="q2" type="radio" value="1" />
                แทบไม่คิดแบบนี้เลย
              </label>

              <label class="option">
                <input v-model="q2" type="radio" value="2" />
                คิดบ้างเป็นบางช่วง
              </label>

              <label class="option">
                <input v-model="q2" type="radio" value="3" />
                คิดบ่อย รู้สึกติดอยู่กับความคิดนี้
              </label>
            </div>
          </div>

          <div class="question-card">
            <p class="question-title">
              3. ช่วงนี้คุณรู้สึกอยากเล่าเรื่องของตัวเองให้ใครฟังแค่ไหน
            </p>

            <div class="option-list">
              <label class="option">
                <input v-model="q3" type="radio" value="1" />
                ไม่ค่อยอยากเล่า รู้สึกโอเคดี
              </label>

              <label class="option">
                <input v-model="q3" type="radio" value="2" />
                เล่าได้ก็ดี แต่ไม่เป็นไรก็ได้
              </label>

              <label class="option">
                <input v-model="q3" type="radio" value="3" />
                อยากเล่าให้ใครสักคนฟังมาก ๆ
              </label>
            </div>
          </div>

          <p v-if="error" class="form-error">
            {{ error }}
          </p>

          <div class="form-actions">
            <button type="submit" class="btn btn-primary">
              ดูผลลัพธ์แบบอ่อนโยน
            </button>

            <RouterLink to="/inside" class="btn btn-ghost">
              กลับไปอ่านบทความ
            </RouterLink>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const q1 = ref(null);
const q2 = ref(null);
const q3 = ref(null);
const error = ref("");

const handleSubmit = () => {
  if (!q1.value || !q2.value || !q3.value) {
    error.value = "ลองเลือกคำตอบให้ครบทุกข้อก่อนนะคะ";
    return;
  }

  error.value = "";
  const score =
    Number(q1.value) + Number(q2.value) + Number(q3.value);

  router.push({
    name: "InsideResult",
    query: { score: String(score) },
  });
};
</script>

<style scoped>
.question-form {
  display: grid;
  gap: 1.6rem;
}

.question-card {
  background: #ffffff;
  border-radius: 18px;
  padding: 1.4rem 1.3rem;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(255, 220, 210, 0.7);
}

.question-title {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.9rem;
}

.option-list {
  display: grid;
  gap: 0.6rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.7rem;
  border-radius: 12px;
  cursor: pointer;
  background: rgba(255, 245, 242, 0.6);
  transition: background 0.2s ease;
  font-size: 0.9rem;
}

.option:hover {
  background: rgba(255, 220, 215, 0.6);
}

.option input {
  accent-color: var(--color-accent);
}

.form-error {
  color: #ff4b4b;
  font-size: 0.85rem;
}

.form-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.4rem;
}

@media (min-width: 768px) {
  .question-form {
    max-width: 640px;
    margin: 0 auto;
  }
}
</style>