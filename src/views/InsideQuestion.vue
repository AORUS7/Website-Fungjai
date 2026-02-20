<template>
  <main class="inside-question-page">
    <section class="hero">
      <div class="container hero-inner">
        <div class="hero-content">
          <span class="hero-highlight">แบบประเมินความเครียด (ST-5)</span>
          <h1 class="hero-title">
            ช่วง 2–4 สัปดาห์ที่ผ่านมา<br />
            คุณรู้สึกแบบไหนบ้าง
          </h1>
          <p class="hero-text">
            โปรดเลือกคะแนนที่ใกล้เคียงกับความรู้สึกของคุณมากที่สุด
            ไม่มีคำตอบถูกหรือผิด
          </p>
        </div>
      </div>
    </section>

    <section class="section section--soft">
      <div class="container">
        <form class="question-form" @submit.prevent="handleSubmit">
          <div
            v-for="(q, index) in questions"
            :key="index"
            class="question-card"
          >
            <p class="question-title">
              {{ index + 1 }}. {{ q }}
            </p>

            <div class="option-list">
              <label
                v-for="option in options"
                :key="option.value"
                class="option"
              >
                <input
                  type="radio"
                  :name="'q' + index"
                  :value="option.value"
                  v-model="answers[index]"
                />
                <span>{{ option.label }}</span>
              </label>
            </div>
          </div>

          <p v-if="error" class="form-error">
            {{ error }}
          </p>

          <div class="form-actions">
            <button type="submit" class="btn-primary">
              ดูผลการประเมิน
            </button>
          </div>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const error = ref("");

const questions = [
  "มีปัญหาการนอน นอนไม่หลับหรือนอนมาก",
  "มีสมาธิน้อยลง",
  "หงุดหงิด / กระวนกระวาย / ว้าวุ่นใจ",
  "รู้สึกเบื่อ เซ็ง",
  "ไม่อยากพบปะผู้คน",
];

const options = [
  { value: 0, label: "0 = แทบไม่มีเลย" },
  { value: 1, label: "1 = เป็นบางครั้ง" },
  { value: 2, label: "2 = เป็นบ่อยครั้ง" },
  { value: 3, label: "3 = เป็นประจำ" },
];

const answers = reactive([null, null, null, null, null]);

const handleSubmit = () => {
  if (answers.some((a) => a === null)) {
    error.value = "กรุณาตอบให้ครบทุกข้อก่อนนะคะ";
    return;
  }

  error.value = "";
  const total = answers.reduce((sum, val) => sum + Number(val), 0);

  router.push({
    name: "InsideResult",
    query: { score: total },
  });
};
</script>

<style scoped>
.hero {
  padding: 3rem 0 2rem;
  text-align: center;
}

.hero-highlight {
  font-size: 0.8rem;
  letter-spacing: 1px;
  color: var(--color-accent);
}

.hero-title {
  font-size: 1.8rem;
  font-weight: 600;
  margin: 0.8rem 0;
}

.hero-text {
  font-size: 0.95rem;
  color: var(--color-text-soft);
}

.section--soft {
  padding: 2rem 0 3rem;
}

.question-form {
  display: grid;
  gap: 1.8rem;
  max-width: 720px;
  margin: 0 auto;
}

.question-card {
  background: #fff;
  border-radius: 24px;
  padding: 1.6rem;
  border: 1px solid rgba(255, 220, 210, 0.6);
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.05);
}

.question-title {
  font-weight: 600;
  margin-bottom: 1rem;
}

.option-list {
  display: grid;
  gap: 0.6rem;
}

.option {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 0.9rem;
  border-radius: 14px;
  background: rgba(255, 245, 242, 0.6);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.option:hover {
  background: rgba(255, 220, 215, 0.7);
}

.option input {
  accent-color: var(--color-accent);
}

.form-error {
  color: #ff4b4b;
  text-align: center;
}

.form-actions {
  text-align: center;
  margin-top: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #ff8a80, #ff6f91);
  color: #ffffff;
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

/* hover */
.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(255, 120, 130, 0.45);
}

/* active */
.btn-primary:active {
  transform: translateY(0);
  box-shadow: 0 6px 18px rgba(255, 120, 130, 0.3);
}
</style>