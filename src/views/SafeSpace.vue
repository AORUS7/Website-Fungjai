<template>
  <div class="safe-page">
    <!-- Hero ด้านบน พื้นหลังรูปทะเล + เลือกฟังก์ชัน -->
    <section class="safe-hero">
      <div class="safe-hero-overlay">
        <div class="container safe-hero-content">
          <p class="safe-hero-eyebrow">FUNCTION · SAFE SPACE</p>

          <h1 class="safe-hero-title">SAFE SPACE</h1>
          <p class="safe-hero-subtitle">
            จุดที่คุณสามารถหยุดพักและเล่าเรื่องในใจได้อย่างปลอดภัย
          </p>

          <div class="safe-hero-menu">
            <div class="safe-hero-item">
              <span class="safe-hero-label">PODCAST</span>
              <p class="safe-hero-text">
                พอดแคสต์ที่จะอยู่เป็นเพื่อนคุณในวันที่เงียบเหงา
              </p>
            </div>

            <div class="safe-hero-item safe-hero-item-main">
              <span class="safe-hero-label">SAFE SPACE</span>
              <p class="safe-hero-text">
                จุดหยุดพักและระบายในแบบที่เป็นตัวคุณเอง
              </p>
              <span class="safe-hero-hand">☞</span>
            </div>

            <div class="safe-hero-item">
              <span class="safe-hero-label">WHAT'S GOING ON INSIDE</span>
              <p class="safe-hero-text">
                แบบสอบถามค้นหาความรู้สึกในใจของคุณ
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ส่วนอธิบาย + mockup มือถือ / chatbot -->
    <section class="section safe-chat-section">
      <div class="container safe-chat-grid">
        <div class="safe-chat-text">
          <h2 class="section-title">Chat bot ที่อยากฟังเรื่องของคุณ</h2>
          <p class="section-subtitle">
            คุยกับ FUNGJAI ได้ทั้งแบบพิมพ์ และตอบกลับเหมือนมีเพื่อนคุยด้วย
          </p>

          <p class="safe-chat-paragraph">
            ถ้าคุณไม่รู้จะเล่าให้ใครฟัง หรือรู้สึกว่าตัวเองอาจจะกำลังสับสน
            แค่เริ่มพิมพ์สิ่งที่อยู่ในใจลงไป ระบบ SAFE SPACE
            จะช่วยถามคำถามต่อเบา ๆ เพื่อพาไปเจอความรู้สึกที่แท้จริงของคุณเอง
          </p>
          <p class="safe-chat-paragraph">
            คุณไม่จำเป็นต้องใช้ชื่อจริง ไม่ต้องเรียบเรียงคำพูดให้สวยงาม
            พิมพ์ออกมาในแบบที่เป็นคุณก็เพียงพอแล้ว 🫶
          </p>

          <!-- ถ้าอยากให้กดแล้วไปหน้า InsideQuestion จริง ๆ ให้เปลี่ยนเป็น router-link -->
          <router-link to="/inside-question" class="btn btn-primary">
            เริ่มคุยกับ FUNGJAI
          </router-link>
        </div>

        <!-- mockup มือถือ -->
        <div class="safe-chat-phone">
          <div class="phone-frame">
            <div class="phone-notch"></div>
            <div class="phone-inner">
              <div class="phone-header">
                <span class="phone-header-title">FUNGJAI</span>
                <span class="phone-header-status">online · ปลอดภัย</span>
              </div>

              <div class="phone-chat">
                <div class="bubble bubble-bot">
                  สวัสดีค่ะ วันนี้อยากเล่าเรื่องไหนให้เราฟังดี? 💬
                </div>
                <div class="bubble bubble-user">
                  แค่รู้สึกเหนื่อย ๆ แต่ไม่แน่ใจว่าทำไมเลยค่ะ
                </div>
                <div class="bubble bubble-bot">
                  ขอบคุณที่เล่าให้ฟังนะคะ 💗
                  ถ้าเล่าเพิ่มได้อีกนิด คุณเหนื่อยกับเรื่องงาน ความสัมพันธ์
                  หรือความคิดในใจตัวเองมากกว่ากัน?
                </div>
              </div>

              <div class="phone-input">
                <div class="phone-input-box">
                  <span class="phone-placeholder">พิมพ์สิ่งที่อยู่ในใจของคุณ…</span>
                </div>
                <div class="phone-input-actions">
                  <button class="phone-icon-btn" type="button" aria-label="voice">
                    🎙
                  </button>
                  <button class="phone-send-btn" type="button">
                    ส่ง
                  </button>
                </div>
              </div>
            </div>
          </div>

          <p class="phone-caption">
            *ตัวอย่างหน้าจอ SAFE SPACE – แชตบอทสำหรับพูดคุยแบบสบายใจ
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
// ตอนนี้ยังไม่ต้องมี logic อะไรเพิ่มเติม ถ้าอนาคตจะเชื่อม chatbot จริงค่อยใส่
</script>

<style scoped>
.safe-page {
  display: flex;
  flex-direction: column;
  gap: 0;
}

/* HERO */

.safe-hero {
  position: relative;
  min-height: 60vh;
  background-image: url("/safe-hero.jpg"); /* ใส่รูปทะเลไว้ใน public/safe-hero.jpg */
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.safe-hero-overlay {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.35),
    rgba(0, 0, 0, 0.4)
  );
  display: flex;
  align-items: center;
}

.safe-hero-content {
  color: #ffffff;
  padding: 4rem 1.5rem;
}

.safe-hero-eyebrow {
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  opacity: 0.9;
  margin-bottom: 0.6rem;
}

.safe-hero-title {
  font-size: 2.3rem;
  margin: 0 0 0.4rem;
}

.safe-hero-subtitle {
  margin: 0 0 1.8rem;
  max-width: 460px;
  font-size: 0.98rem;
  opacity: 0.9;
}

/* menu 3 ช่องในรูปบน */

.safe-hero-menu {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 220px));
  gap: 1rem;
  max-width: 720px;
}

.safe-hero-item {
  position: relative;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  background: rgba(0, 0, 0, 0.32);
  border: 1px solid rgba(255, 255, 255, 0.35);
  backdrop-filter: blur(10px);
}

.safe-hero-item-main {
  background: rgba(255, 183, 171, 0.24);
  border-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.35);
}

.safe-hero-label {
  display: block;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.17em;
  color: #ffd9d2;
  margin-bottom: 0.35rem;
}

.safe-hero-text {
  font-size: 0.9rem;
  margin: 0;
}

.safe-hero-hand {
  position: absolute;
  right: 0.7rem;
  bottom: 0.4rem;
  font-size: 1.4rem;
}

/* SECTION chatbot */

.safe-chat-section {
  padding-top: 3rem;
  padding-bottom: 4rem;
}

.safe-chat-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
  gap: 2.5rem;
  align-items: center;
}

.safe-chat-text .section-title {
  margin-bottom: 0.3rem;
}

.safe-chat-paragraph {
  font-size: 0.93rem;
  color: var(--color-text-soft);
  margin-bottom: 0.7rem;
}

/* PHONE MOCKUP */

.safe-chat-phone {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.phone-frame {
  width: 260px;
  aspect-ratio: 9 / 18;
  border-radius: 36px;
  padding: 0.9rem;
  background: linear-gradient(145deg, #1b1b1f, #3b3b44);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35);
  position: relative;
}

.phone-notch {
  position: absolute;
  top: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 120px;
  height: 14px;
  border-radius: 999px;
  background: #111218;
}

.phone-inner {
  width: 100%;
  height: 100%;
  border-radius: 28px;
  background: linear-gradient(180deg, #ffe6f0, #fff7fb);
  padding: 1.1rem 0.85rem 0.85rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.phone-header {
  text-align: center;
  margin-bottom: 0.5rem;
}

.phone-header-title {
  display: block;
  font-weight: 700;
  font-size: 0.95rem;
  color: #ff6e7a;
}

.phone-header-status {
  font-size: 0.7rem;
  color: #9f8fa1;
}

.phone-chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin: 0.4rem 0 0.7rem;
  overflow: hidden;
}

.bubble {
  font-size: 0.76rem;
  line-height: 1.4;
  padding: 0.45rem 0.6rem;
  border-radius: 14px;
  max-width: 90%;
}

.bubble-bot {
  align-self: flex-start;
  background: #ffffff;
  color: #705a6a;
  border: 1px solid #ffd1e4;
}

.bubble-user {
  align-self: flex-end;
  background: #ffe1ee;
  color: #5a4558;
}

.phone-input {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.phone-input-box {
  background: #ffffff;
  border-radius: 999px;
  padding: 0.35rem 0.7rem;
  border: 1px solid #ffd7ea;
}

.phone-placeholder {
  font-size: 0.74rem;
  color: #b7a3b3;
}

.phone-input-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phone-icon-btn,
.phone-send-btn {
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 0.76rem;
}

.phone-icon-btn {
  background: transparent;
}

.phone-send-btn {
  padding: 0.28rem 0.8rem;
  border-radius: 999px;
  background: #ff8a80;
  color: #ffffff;
  font-weight: 600;
}

.phone-caption {
  margin-top: 0.7rem;
  font-size: 0.78rem;
  color: var(--color-text-soft);
  text-align: center;
}

/* Responsive */

@media (max-width: 900px) {
  .safe-hero-menu {
    grid-template-columns: minmax(0, 1fr);
  }

  .safe-chat-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .safe-chat-phone {
    order: -1;
  }

  .safe-hero {
    min-height: 55vh;
  }
}

@media (max-width: 600px) {
  .safe-hero-content {
    padding: 3rem 1.2rem;
  }

  .safe-hero-title {
    font-size: 1.8rem;
  }
}
</style>