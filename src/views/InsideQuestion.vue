<template>
  <div class="page">
    <main>
      <section class="hero">
        <div class="container hero-inner">
          <div>
            <div class="hero-highlight">แบบสำรวจความรู้สึกเล็ก ๆ</div>
            <h1 class="hero-title">ตอนนี้หัวใจของคุณเป็นยังไงบ้าง</h1>
            <p class="hero-text">
              แบบสอบถามนี้ไม่ใช่การวินิจฉัยอะไรทั้งนั้น แค่ช่วยให้คุณได้หยุดดูหัวใจตัวเองสักครู่
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
                ตอบในระดับที่คุณสบายใจ ไม่ต้องคิดนานก็ได้
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
              เลือกคำตอบที่ใกล้กับความรู้สึกของคุณมากที่สุดในช่วง “ไม่กี่วันมานี้”
            </p>
          </div>

          <div class="card card-soft">
            <form @submit.prevent="handleSubmit">
              <!-- Q1 -->
              <div style="margin-bottom: 1.5rem">
                <p class="card-title" style="margin-bottom: 0.4rem">
                  1. ช่วงนี้คุณรู้สึกเหนื่อยหรือหมดแรงง่ายแค่ไหน
                </p>
                <p class="card-text">เลือกข้อที่ใกล้เคียงที่สุด</p>
                <ul class="bullet-list">
                  <li>
                    <label>
                      <input
                        v-model="q1"
                        type="radio"
                        name="q1"
                        value="1"
                      />
                      แทบไม่รู้สึกเลย
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        v-model="q1"
                        type="radio"
                        name="q1"
                        value="2"
                      />
                      มีบ้างเป็นบางวัน
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        v-model="q1"
                        type="radio"
                        name="q1"
                        value="3"
                      />
                      รู้สึกบ่อยเกือบทุกวัน
                    </label>
                  </li>
                </ul>
              </div>

              <!-- Q2 -->
              <div style="margin-bottom: 1.5rem">
                <p class="card-title" style="margin-bottom: 0.4rem">
                  2. ช่วงนี้คุณรู้สึกว่าตัวเอง “ไม่เก่งพอ” บ่อยแค่ไหน
                </p>
                <ul class="bullet-list">
                  <li>
                    <label>
                      <input
                        v-model="q2"
                        type="radio"
                        name="q2"
                        value="1"
                      />
                      แทบไม่คิดแบบนี้เลย
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        v-model="q2"
                        type="radio"
                        name="q2"
                        value="2"
                      />
                      คิดบ้างเป็นบางช่วง
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        v-model="q2"
                        type="radio"
                        name="q2"
                        value="3"
                      />
                      คิดบ่อย รู้สึกติดอยู่กับความคิดนี้
                    </label>
                  </li>
                </ul>
              </div>

              <!-- Q3 -->
              <div style="margin-bottom: 1.5rem">
                <p class="card-title" style="margin-bottom: 0.4rem">
                  3. ช่วงนี้คุณรู้สึกอยากเล่าเรื่องของตัวเองให้ใครฟังแค่ไหน
                </p>
                <ul class="bullet-list">
                  <li>
                    <label>
                      <input
                        v-model="q3"
                        type="radio"
                        name="q3"
                        value="1"
                      />
                      ไม่ค่อยอยากเล่า รู้สึกโอเคดี
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        v-model="q3"
                        type="radio"
                        name="q3"
                        value="2"
                      />
                      รู้สึกว่าเล่าได้ก็ดี แต่ไม่เป็นไรก็ได้
                    </label>
                  </li>
                  <li>
                    <label>
                      <input
                        v-model="q3"
                        type="radio"
                        name="q3"
                        value="3"
                      />
                      รู้สึกอยากเล่าให้ใครสักคนฟังมาก ๆ
                    </label>
                  </li>
                </ul>
              </div>

              <p
                v-if="error"
                style="color: #ff4b4b; font-size: 0.85rem; margin-bottom: 0.8rem"
              >
                {{ error }}
              </p>

              <div class="hero-actions">
                <button type="submit" class="btn btn-primary">
                  ดูผลลัพธ์แบบอ่อนโยน
                </button>
                <RouterLink to="/inside" class="btn btn-ghost">
                  กลับไปอ่านบทความแทน
                </RouterLink>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const q1 = ref(null)
const q2 = ref(null)
const q3 = ref(null)
const error = ref('')

const handleSubmit = () => {
  if (!q1.value || !q2.value || !q3.value) {
    error.value = 'ลองเลือกคำตอบให้ครบทุกข้อก่อนนะคะ'
    return
  }
  error.value = ''
  const score =
    Number(q1.value || 0) + Number(q2.value || 0) + Number(q3.value || 0)

  router.push({
    name: 'InsideResult', 
    query: { score: String(score) },
  })
}
</script>