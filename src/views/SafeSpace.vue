<template>
  <div class="page">
    <main>
      <section class="hero">
        <div class="container hero-inner">
          <div>
            <div class="hero-highlight">พื้นที่ปลอดภัย</div>
            <h1 class="hero-title">SAFE SPACE – พื้นที่เล่าเรื่องของคุณ</h1>
            <p class="hero-text">
              ถ้าคุณมีเรื่องที่ไม่รู้จะเล่าให้ใครฟัง หรือแค่อยากมีใครสักคนที่เข้าใจความรู้สึกของคุณจริง ๆ
              คุณสามารถใช้พื้นที่ตรงนี้ได้เสมอ เราจะไม่ตัดสิน และจะฟังด้วยความอ่อนโยนที่สุดเท่าที่ทำได้
            </p>
            <div class="hero-actions">
              <button class="btn btn-primary" @click="openChat">
                เริ่มคุยกับ FUNGJAI ผ่าน LINE
              </button>
            </div>
            <p class="hero-note">
              คุณไม่จำเป็นต้องใช้ชื่อจริง เล่าเท่าที่สบายใจในจังหวะของตัวเองก็พอ
            </p>
          </div>

          <div class="hero-visual">
            <div class="hero-card">
              <div class="hero-chip">
                <span class="hero-chip-dot"></span>
                คุณไม่จำเป็นต้องบอกชื่อจริงก็ได้
              </div>
              <p class="hero-quote">
                “คุณไม่ได้เป็นภาระของใคร เพียงเพราะคุณรู้สึกบางอย่างมากกว่าปกติ”
                <small>ข้อความเล็ก ๆ จาก SAFE SPACE</small>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="section section--soft">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">กติกาเล็ก ๆ ของพื้นที่นี้</h2>
            <p class="section-subtitle">
              เพื่อให้ที่นี่เป็นพื้นที่ปลอดภัยสำหรับทุกคน เราอยากชวนคุณตกลงกันเล็กน้อย
            </p>
          </div>

          <div class="card card-soft">
            <p>
              เราอยากให้ SAFE SPACE เป็นมุมเล็ก ๆ ที่คุณรู้สึกว่า
              “พูดความรู้สึกของตัวเองได้ โดยไม่ต้องกลัวว่าจะถูกตัดสิน”
            </p>
            <ul class="rules-list">
              <li>คุณสามารถเล่าเรื่องของคุณได้เต็มที่ โดยไม่จำเป็นต้องใช้ชื่อจริง</li>
              <li>ทุกเรื่องที่ถูกเล่า จะได้รับการฟังด้วยความเคารพและไม่ตัดสิน</li>
              <li>
                ถ้าเรื่องของคุณเกี่ยวข้องกับการทำร้ายตัวเองหรือผู้อื่นอย่างรุนแรง
                เราอยากชวนให้คุณติดต่อผู้เชี่ยวชาญ หรือสายด่วนที่ให้การช่วยเหลือร่วมด้วย
              </li>
              <li>คุณมีสิทธิ์หยุดเล่าเมื่อไรก็ได้ ถ้ารู้สึกไม่สบายใจ</li>
            </ul>
          </div>
        </div>
      </section>
    </main>

    <button class="chat-fab" @click="toggleChat">
      <span class="chat-fab-dot" :class="{ 'chat-fab-dot--notify': !hasOpenedOnce }"></span>
      <div class="chat-fab-line">
        <span class="chat-fab-line-text">LINE</span>
      </div>
    </button>

    <!-- CHAT PANEL -->
    <transition name="chat-fade">
      <div v-if="isChatOpen" class="chat-panel">
        <!-- header -->
        <header class="chat-header">
          <div class="chat-header-left">
            <div class="chat-avatar">
              <span>FJ</span>
            </div>
            <div>
              <div class="chat-name">FUNGJAI</div>
              <div class="chat-status">
                <span class="chat-status-dot"></span>
                พูดคุยผ่าน LINE Official
              </div>
            </div>
          </div>
          <button class="chat-close-btn" @click="closeChat">✕</button>
        </header>

        <!-- body -->
        <div class="chat-body">
          <!-- ข้อความต้อนรับ -->
          <div class="chat-message chat-message--bot">
            <div class="chat-message-bubble">
              สวัสดีจาก SAFE SPACE นะ 🌸<br />
              ถ้าคุณอยากเล่าเรื่องในใจ หรืออยากให้เราฟังอย่างอ่อนโยน
              สามารถทักหาเราใน LINE ได้เลย
            </div>
            <div class="chat-message-time">ตอนนี้</div>
          </div>

          <div class="chat-footer-cta">
            <p class="chat-footer-title">เริ่มคุยกับเราได้ผ่าน LINE</p>
            <p class="chat-footer-desc">
              คลิกปุ่มด้านล่างนี้ เพื่อเปิดห้องแชท FUNGJAI ในแอป LINE หรือบนเว็บ LINE
            </p>

            <!-- ปุ่ม LINE จริง: เปลี่ยน href เป็นลิงก์ LINE Official ของเธอ -->
            <a
              class="chat-line-btn"
              href="https://line.me/R/ti/p/@YOUR_LINE_ID"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span class="chat-line-logo">LINE</span>
              <span class="chat-line-text">แชทกับ FUNGJAI ผ่าน LINE</span>
            </a>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const isChatOpen = ref(false);
const hasOpenedOnce = ref(false);

const openChat = () => {
  isChatOpen.value = true;
  hasOpenedOnce.value = true;
};

const closeChat = () => {
  isChatOpen.value = false;
};

const toggleChat = () => {
  isChatOpen.value = !isChatOpen.value;
  if (isChatOpen.value) {
    hasOpenedOnce.value = true;
  }
};
</script>

<style scoped>
.chat-fab {
  position: fixed;
  right: 1.8rem;
  bottom: 1.8rem;
  width: 64px;
  height: 64px;
  border-radius: 999px;
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
  background: #00c300; /* โทนเขียว LINE */
  color: #ffffff;
  z-index: 50;
}

.chat-fab:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.2);
}

.chat-fab-dot {
  position: absolute;
  top: 8px;
  right: 10px;
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #ffffff;
  opacity: 0.3;
  transition: all 0.2s ease;
}

.chat-fab-dot--notify {
  opacity: 1;
  background: #ffeb3b;
}

.chat-fab-line {
  width: 44px;
  height: 44px;
  border-radius: 999px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chat-fab-line-text {
  font-weight: 800;
  font-size: 0.85rem;
  color: #00c300;
}

/* แผงแชท */
.chat-panel {
  position: fixed;
  right: 1.6rem;
  bottom: 5.6rem;
  width: 360px;
  max-height: 480px;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 18px 50px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 60;
}

/* header */
.chat-header {
  padding: 0.9rem 1rem;
  border-bottom: 1px solid rgba(255, 210, 210, 0.8);
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff7f7;
}

.chat-header-left {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.chat-avatar {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #ffe6e0, #ff8a80);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
}

.chat-name {
  font-size: 0.9rem;
  font-weight: 600;
}

.chat-status {
  font-size: 0.75rem;
  color: #777;
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.chat-status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #6dd1a1;
}

.chat-close-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1rem;
  color: #999;
}

.chat-close-btn:hover {
  color: #555;
}

/* body */
.chat-body {
  padding: 0.85rem 0.9rem 1.1rem;
  flex: 1;
  overflow-y: auto;
  background: linear-gradient(180deg, #fff9f9 0%, #ffece7 100%);
}

.chat-message {
  margin-bottom: 0.7rem;
  max-width: 90%;
}

.chat-message--bot .chat-message-bubble {
  background: #ffffff;
  color: #333;
  border-radius: 16px 16px 16px 4px;
}

.chat-message-bubble {
  padding: 0.7rem 0.8rem;
  font-size: 0.9rem;
  line-height: 1.5;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
}

.chat-message-time {
  margin-top: 0.25rem;
  font-size: 0.7rem;
  color: rgba(0, 0, 0, 0.45);
}

/* footer CTA */
.chat-footer-cta {
  margin-top: 0.8rem;
  padding: 0.9rem 0.8rem 0.4rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
}

.chat-footer-title {
  margin: 0 0 0.25rem;
  font-size: 0.94rem;
  font-weight: 600;
}

.chat-footer-desc {
  margin: 0 0 0.7rem;
  font-size: 0.8rem;
  color: #666;
}

.chat-line-btn {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.55rem 0.75rem;
  border-radius: 999px;
  text-decoration: none;
  background: #00c300;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  box-shadow: 0 8px 20px rgba(0, 195, 0, 0.4);
}

.chat-line-btn:hover {
  background: #00ad00;
}

.chat-line-logo {
  width: 30px;
  height: 30px;
  border-radius: 999px;
  background: #ffffff;
  color: #00c300;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 800;
}

.chat-line-text {
  white-space: nowrap;
}

.chat-fade-enter-active,
.chat-fade-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}

.chat-fade-enter-from,
.chat-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

@media (max-width: 600px) {
  .chat-panel {
    right: 0.75rem;
    left: 0.75rem;
    bottom: 4.8rem;
    width: auto;
    max-height: 70vh;
  }

  .chat-fab {
    right: 1rem;
    bottom: 1.2rem;
  }

  .chat-line-text {
    white-space: normal;
  }
}
</style>