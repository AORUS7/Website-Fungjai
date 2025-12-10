<script setup>
import { ref, nextTick } from "vue";

const messages = ref([
  {
    id: 1,
    from: "bot",
    name: "FUNGJAI",
    text: "สวัสดีค่ะ ขอบคุณที่เข้ามาใน SAFE SPACE วันนี้นะ เราพร้อมฟังเรื่องของคุณเสมอค่ะ 🤍",
    time: "ตอนนี้",
  },
]);

const userInput = ref("");
let idCounter = 2;

const scrollToBottom = async () => {
  await nextTick();
  const box = document.querySelector(".chat-window-body");
  if (box) {
    box.scrollTop = box.scrollHeight;
  }
};

const sendMessage = async () => {
  const text = userInput.value.trim();
  if (!text) return;

  messages.value.push({
    id: idCounter++,
    from: "user",
    name: "คุณ",
    text,
    time: "ตอนนี้",
  });
  userInput.value = "";
  await scrollToBottom();

  // จำลองบอทตอบ (เวอร์ชันทดสอบ ยังไม่ได้ต่อ API จริง)
  setTimeout(async () => {
    const reply =
      "ขอบคุณที่เล่าให้ฟังนะคะ สิ่งที่คุณรู้สึกสำคัญมากเลย ❤️\nตอนนี้คุณไม่จำเป็นต้องรีบหาคำตอบก็ได้ แค่ค่อย ๆ เล่าในจังหวะที่คุณสบายใจก็พอค่ะ";
    messages.value.push({
      id: idCounter++,
      from: "bot",
      name: "FUNGJAI",
      text: reply,
      time: "เมื่อสักครู่",
    });
    await scrollToBottom();
  }, 700);
};

const handleKeydown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};
</script>

<template>
  <div class="page">
    <main>
      <section class="hero">
        <div class="container hero-inner">
          <div>
            <div class="hero-highlight">พื้นที่ปลอดภัย</div>
            <h1 class="hero-title">SAFE SPACE – แชทกับใจของคุณได้ที่นี่</h1>
            <p class="hero-text">
              ถ้าคุณมีเรื่องที่ไม่รู้จะเล่าให้ใครฟัง หรือแค่อยากมีใครสักคนที่รับฟังอย่างไม่ตัดสิน
              คุณสามารถใช้ห้องแชทนี้เป็นมุมเล็ก ๆ
              สำหรับระบายและค่อย ๆ ทำความเข้าใจความรู้สึกของตัวเองได้เลยค่ะ
            </p>
            <div class="hero-actions">
              <a href="#chat" class="btn btn-primary">เริ่มคุยกับ FUNGJAI</a>
            </div>
            <div class="hero-note">
              คุณไม่จำเป็นต้องใช้ชื่อจริง ไม่ต้องเรียบเรียงให้สวยงาม
              แค่เป็นตัวคุณในแบบที่คุณไหวในวันนี้ก็พอแล้ว 🤍
            </div>
          </div>

          <div class="hero-visual">
            <!-- การ์ดจำลองหน้าจอมือถือ / chatbot profile -->
            <div class="hero-card">
              <div class="hero-chip">
                <span class="hero-chip-dot"></span>
                ออนไลน์ · พร้อมรับฟัง
              </div>
              <p class="hero-quote">
                “คุณไม่ได้เป็นภาระ เพียงเพราะคุณกำลังรู้สึกบางอย่างอย่างหนักหน่วง
                การขอให้ใครสักคนฟัง ไม่ได้ทำให้คุณแย่ลงเลยค่ะ”
                <small>ข้อความเล็ก ๆ จาก SAFE SPACE</small>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- กติกา / อธิบาย SAFE SPACE -->
      <section class="section section--soft">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">ก่อนเริ่มคุยกัน เราอยากบอกคุณเล็กน้อย</h2>
            <p class="section-subtitle">
              เพื่อให้ที่นี่เป็นพื้นที่ปลอดภัยสำหรับคุณ ลองอ่านข้อตกลงเล็ก ๆ
              ต่อไปนี้ก่อนค่ะ
            </p>
          </div>

          <div class="card card-soft">
            <p>
              เราอยากให้ SAFE SPACE เป็นที่ที่คุณรู้สึกว่า
              “พูดความรู้สึกของตัวเองได้ โดยไม่ต้องกลัวว่าจะถูกตัดสิน”
            </p>
            <ul class="rules-list">
              <li>คุณสามารถใช้ชื่อเล่นหรือไม่ระบุชื่อเลยก็ได้</li>
              <li>ข้อความของคุณจะถูกมองด้วยความเคารพและไม่ตัดสิน</li>
              <li>
                ถ้าเรื่องของคุณเกี่ยวกับอันตรายเร่งด่วนต่อชีวิตหรือการทำร้ายตัวเอง
                โปรดพิจารณาติดต่อผู้เชี่ยวชาญหรือสายด่วนใกล้ตัวควบคู่กันไปด้วย
              </li>
              <li>
                คุณมีสิทธิ์หยุดพิมพ์ออกจากหน้านี้เมื่อไรก็ได้
                ถ้าเริ่มรู้สึกไม่สบายใจ
              </li>
            </ul>
          </div>
        </div>
      </section>

      <!-- CHAT AREA -->
      <section id="chat" class="section section--highlight">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">ห้องแชท SAFE SPACE</h2>
            <p class="section-subtitle">
              แชทนี้เป็นเวอร์ชันทดสอบที่ช่วยให้คุณได้เขียนความรู้สึกออกมา
              ถ้าอยากต่อยอดให้ตอบแบบ AI จริง ๆ
              สามารถเชื่อมต่อกับระบบหลังบ้านหรือ OpenAI API ได้ภายหลัง
            </p>
          </div>

          <div class="chat-layout">
            <!-- กล่องแชทหลัก -->
            <div class="chat-window card">
              <div class="chat-window-header">
                <div class="chat-avatar">
                  <span>FJ</span>
                </div>
                <div class="chat-header-text">
                  <div class="chat-title">FUNGJAI • Safe Space Bot</div>
                  <div class="chat-subtitle">พร้อมรับฟัง · ไม่ตัดสิน · ตอบอย่างอ่อนโยน</div>
                </div>
              </div>

              <div class="chat-window-body">
                <div
                  v-for="m in messages"
                  :key="m.id"
                  class="chat-message-row"
                  :class="m.from === 'user' ? 'is-user' : 'is-bot'"
                >
                  <div v-if="m.from === 'bot'" class="chat-avatar chat-avatar-sm">
                    <span>F</span>
                  </div>
                  <div class="chat-bubble">
                    <p class="chat-bubble-name">{{ m.name }}</p>
                    <p class="chat-bubble-text">
                      <!-- รองรับขึ้นบรรทัดใหม่ -->
                      <span
                        v-for="(line, i) in m.text.split('\n')"
                        :key="i"
                      >
                        {{ line }}<br v-if="i < m.text.split('\n').length - 1" />
                      </span>
                    </p>
                    <p class="chat-bubble-meta">{{ m.time }}</p>
                  </div>
                </div>
              </div>

              <form class="chat-input-row" @submit.prevent="sendMessage">
                <textarea
                  v-model="userInput"
                  class="chat-input"
                  placeholder="อยากเล่าอะไรให้ FUNGJAI ฟังบ้างคะ พิมพ์ได้เต็มที่เลย…"
                  rows="2"
                  @keydown="handleKeydown"
                ></textarea>
                <button type="submit" class="btn btn-primary chat-send-btn">
                  ส่งข้อความ
                </button>
              </form>
              <p class="chat-hint">
                กด <strong>Enter</strong> เพื่อส่งข้อความ · กด <strong>Shift + Enter</strong> เพื่อขึ้นบรรทัดใหม่
              </p>
            </div>

            <!-- กล่องคำอธิบายด้านข้าง -->
            <div class="chat-side card card-soft">
              <h3 class="card-title">วันนี้คุณอยากให้แชทนี้เป็นยังไง?</h3>
              <p class="card-text">
                คุณอาจใช้ที่นี่เพื่อ…
              </p>
              <ul class="bullet-list">
                <li>ระบายเรื่องที่ค้างอยู่ในใจมานาน</li>
                <li>เขียนสิ่งที่กลัวจะพูดออกมาดัง ๆ กับใครสักคน</li>
                <li>เล่าเรื่องดี ๆ เล็ก ๆ ที่ทำให้คุณยิ้มในวันนี้</li>
              </ul>
              <p class="card-text">
                ไม่จำเป็นต้องเล่าให้ครบทุกอย่างในครั้งเดียวก็ได้
                คุณสามารถกลับมาเมื่อไรก็ได้ในจังหวะที่หัวใจคุณไหวค่ะ 🌷
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.chat-layout {
  display: grid;
  grid-template-columns: minmax(0, 1.8fr) minmax(0, 1.1fr);
  gap: 1.5rem;
}

.chat-window {
  display: flex;
  flex-direction: column;
  padding: 1.4rem 1.3rem;
}

.chat-window-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid rgba(255, 200, 200, 0.6);
  padding-bottom: 0.7rem;
}

.chat-avatar,
.chat-avatar-sm {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #ffe0df;
  font-size: 0.8rem;
  font-weight: 700;
  color: #d05a52;
}

.chat-avatar {
  width: 38px;
  height: 38px;
}

.chat-avatar-sm {
  width: 28px;
  height: 28px;
  margin-right: 0.45rem;
}

.chat-header-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.chat-title {
  font-size: 0.95rem;
  font-weight: 600;
}

.chat-subtitle {
  font-size: 0.8rem;
  color: var(--color-text-soft);
}

.chat-window-body {
  flex: 1;
  min-height: 220px;
  max-height: 360px;
  overflow-y: auto;
  padding-right: 0.4rem;
  margin-bottom: 0.8rem;
}

.chat-message-row {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.75rem;
}

.chat-message-row.is-user {
  justify-content: flex-end;
}

.chat-message-row.is-user .chat-bubble {
  background: #fff4f0;
  align-items: flex-end;
}

.chat-message-row.is-user .chat-bubble-name {
  text-align: right;
}

.chat-message-row.is-user .chat-bubble-meta {
  text-align: right;
}

.chat-bubble {
  max-width: 100%;
  padding: 0.65rem 0.75rem;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(255, 210, 205, 0.8);
}

.chat-bubble-name {
  font-size: 0.8rem;
  font-weight: 600;
  margin: 0 0 0.18rem;
}

.chat-bubble-text {
  font-size: 0.9rem;
  margin: 0 0 0.18rem;
  white-space: pre-wrap;
}

.chat-bubble-meta {
  font-size: 0.75rem;
  color: var(--color-text-soft);
  margin: 0;
}

.chat-input-row {
  display: flex;
  gap: 0.7rem;
  align-items: flex-end;
  margin-top: 0.3rem;
}

.chat-input {
  flex: 1;
  resize: none;
  border-radius: 14px;
  border: 1px solid rgba(255, 200, 200, 0.9);
  padding: 0.55rem 0.7rem;
  font-family: inherit;
  font-size: 0.9rem;
  line-height: 1.5;
  outline: none;
}

.chat-input:focus {
  border-color: var(--color-accent);
  box-shadow: 0 0 0 1px rgba(255, 138, 128, 0.4);
}

.chat-send-btn {
  flex-shrink: 0;
}

.chat-hint {
  font-size: 0.75rem;
  color: var(--color-text-soft);
  margin-top: 0.4rem;
}

.chat-side {
  align-self: flex-start;
}

@media (max-width: 900px) {
  .chat-layout {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>