<template>
  <div class="page">
    <main>
      <section class="hero">
        <div class="container hero-inner">
          <div>
            <div class="hero-highlight">ผลจากแบบสำรวจหัวใจของคุณ</div>
            <h1 class="hero-title">ตอนนี้ใจของคุณอาจกำลังเป็นแบบนี้</h1>
            <p class="hero-text">
              นี่ไม่ใช่การวินิจฉัยอะไรทั้งนั้น แค่เป็นภาษาง่าย ๆ
              ที่ช่วยอธิบายความรู้สึกของคุณในช่วงนี้ และชวนคุณดูแลตัวเองอย่างอ่อนโยนขึ้นอีกนิด
            </p>
          </div>

          <div class="hero-visual">
            <div class="hero-card">
              <div class="hero-chip">
                <span class="hero-chip-dot"></span>
                ไม่มีคะแนนไหนที่ “ผิด” หรือ “แย่”
              </div>
              <p class="hero-quote">
                ทุกคะแนนคือสัญญาณเล็ก ๆ จากหัวใจคุณ ว่าตอนนี้มันกำลังพยายามบอกอะไรบางอย่างอยู่
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--soft">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">ภาพรวมความรู้สึกของคุณ</h2>
            <p class="section-subtitle">
              คะแนนรวมของคุณ: <strong>{{ score }}</strong> จาก 9
            </p>
          </div>

          <div class="card card-soft">
            <template v-if="level === 'light'">
              <h3 class="card-title">ดูเหมือนว่าคุณกำลังพอรับมือได้อยู่</h3>
              <p class="card-text">
                จากคำตอบของคุณ เหมือนว่าตอนนี้ชีวิตก็ยังมีความเหนื่อยอยู่บ้าง
                แต่คุณยังพอหาวิธีดูแลตัวเองได้ และยังมีพื้นที่หายใจให้หัวใจตัวเองอยู่
              </p>
              <p class="card-text">
                คุณอาจลองใช้เวลาสั้น ๆ ในแต่ละวันอยู่กับตัวเองแบบสงบ ๆ
                หรือกลับไปอ่านบทความในหน้า “What's Going On Inside”
                เพื่อช่วยสะท้อนความคิดและความรู้สึกของคุณเพิ่มขึ้นอีกหน่อย
              </p>
            </template>

            <template v-else-if="level === 'medium'">
              <h3 class="card-title">คุณอาจกำลังเหนื่อยมากกว่าที่คิด</h3>
              <p class="card-text">
                เหมือนว่าหัวใจของคุณกำลังถืออะไรหลายอย่างไว้พร้อมกัน
                ทั้งความเหนื่อย ความคาดหวัง และความคิดเกี่ยวกับตัวเอง
                ที่อาจจะเข้มงวดไปหน่อย
              </p>
              <p class="card-text">
                ถ้าเป็นไปได้ ลองหาคนที่คุณไว้ใจสักคน
                หรือใช้ SAFE SPACE ของ FUNGJAI เป็นที่ทดลองเล่าเรื่องของคุณดู
                ไม่จำเป็นต้องเล่าทั้งหมดในครั้งเดียว แค่เริ่มเล่าทีละนิดก็พอ
              </p>
            </template>

            <template v-else>
              <h3 class="card-title">หัวใจของคุณอาจกำลังเหนื่อยมากจริง ๆ</h3>
              <p class="card-text">
                จากคะแนนที่ได้ ดูเหมือนว่าคุณกำลังเหนื่อย หนักแน่น และอาจรู้สึกโดดเดี่ยวอยู่พอสมควร
                แค่คุณยังอยู่ตรงนี้ และลองทำแบบสำรวจนี้จนจบ ก็ถือว่าเก่งมากแล้ว
              </p>
              <p class="card-text">
                ถ้ารู้สึกว่าเริ่มรับมือไม่ไหว ลองมองหาพื้นที่ที่ปลอดภัยกว่านี้สำหรับคุณ
                ทั้งการคุยกับคนที่ไว้ใจได้ ผู้เชี่ยวชาญด้านสุขภาพจิต
                หรือใช้ SAFE SPACE ของเราเป็นจุดเริ่มต้นในการเล่าเรื่องของคุณก็ได้
              </p>
              <p class="card-text">
                คุณไม่จำเป็นต้องผ่านทุกอย่างไปคนเดียวเสมอไปนะ
              </p>
            </template>
          </div>

          <div style="margin-top: 1.6rem" class="hero-actions">
            <RouterLink to="/inside-question" class="btn btn-ghost">
              ทำแบบสำรวจอีกครั้ง
            </RouterLink>
            <RouterLink to="/inside" class="btn btn-ghost">
              กลับไปอ่านบทความ
            </RouterLink>
            <RouterLink to="/safe-space" class="btn btn-primary">
              ไปยัง SAFE SPACE
            </RouterLink>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const route = useRoute()

const score = computed(() => {
  const raw = Number(route.query.score || 0)
  if (Number.isNaN(raw)) return 0
  return raw
})

const level = computed(() => {
  if (score.value <= 3) return 'light'
  if (score.value <= 6) return 'medium'
  return 'heavy'
})
</script>