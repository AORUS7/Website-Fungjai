<script setup>
import { ref, nextTick } from "vue";

const messages = ref([
  {
    id: 1,
    from: "bot",
    name: "FUNGJAI",
    text: "สวัสดีค่ะ 🤍 ขอบคุณที่เข้ามาใน SAFE SPACE วันนี้นะคะ\nถ้าอยากเล่าอะไร เราพร้อมฟังเสมอค่ะ",
    time: "ตอนนี้",
  },
]);

const userInput = ref("");
const isTyping = ref(false);
let id = 2;

const scrollToBottom = async () => {
  await nextTick();
  const el = document.querySelector(".chat-body");
  if (el) el.scrollTop = el.scrollHeight;
};

const sendMessage = async () => {
  if (!userInput.value.trim() || isTyping.value) return;

  messages.value.push({
    id: id++,
    from: "user",
    name: "คุณ",
    text: userInput.value,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  userInput.value = "";
  isTyping.value = true;
  await scrollToBottom();

  setTimeout(() => {
    messages.value.push({
      id: id++,
      from: "bot",
      name: "FUNGJAI",
      text: "ขอบคุณที่เล่าให้ฟังนะคะ 🤍\nอยากเล่าต่อไหม เราอยู่ตรงนี้ค่ะ",
      time: "เมื่อสักครู่",
    });
    isTyping.value = false;
    scrollToBottom();
  }, 1200);
};

const handleKeydown = (e) => {
  if (e.key === "Enter" && !e.shiftKey) {
    e.preventDefault();
    sendMessage();
  }
};
</script>

<template>
  <div class="page safe-page">
    <main>
      <section class="hero safe-hero">
        <div class="container hero-inner">
          <div>
            <div class="hero-highlight">พื้นที่ปลอดภัย</div>
            <h1 class="hero-title">SAFE SPACE</h1>
            <p class="hero-text">
              คุณไม่จำเป็นต้องเข้มแข็ง แค่เป็นตัวเองก็พอ 🤍
            </p>
          </div>

          <div class="hero-visual">
            <div class="hero-card">
              <div class="hero-chip">
                <span class="hero-chip-dot"></span>
                ออนไลน์ · พร้อมรับฟัง
              </div>
              <p class="hero-quote">
                “คุณไม่ได้เป็นภาระ เพียงเพราะคุณกำลังรู้สึก”
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="safe-chat">
        <div class="chat-window">
          <div class="chat-header">
            <div class="chat-avatar">FJ</div>
            <div>
              <div class="chat-title">FUNGJAI</div>
              <div class="chat-subtitle">รับฟัง · ไม่ตัดสิน · อ่อนโยน</div>
            </div>
          </div>

          <div class="chat-body">
            <div
              v-for="m in messages"
              :key="m.id"
              class="chat-row"
              :class="m.from"
            >
              <div v-if="m.from === 'bot'" class="chat-avatar-sm">F</div>

              <div class="chat-bubble">
                <p class="chat-name">{{ m.name }}</p>
                <p
                  v-for="(line, i) in m.text.split('\n')"
                  :key="i"
                  class="chat-text"
                >
                  {{ line }}
                </p>
                <span class="chat-time">{{ m.time }}</span>
              </div>
            </div>

            <div v-if="isTyping" class="chat-row bot">
              <div class="chat-avatar-sm">F</div>
              <div class="chat-bubble typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          </div>

          <form class="chat-input" @submit.prevent="sendMessage">
            <textarea
              v-model="userInput"
              placeholder="อยากเล่าอะไรให้ FUNGJAI ฟังบ้างคะ…"
              rows="1"
              :disabled="isTyping"
              @keydown="handleKeydown"
            />
            <button
              type="submit"
              :disabled="!userInput.trim() || isTyping"
            >
              ส่ง
            </button>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.safe-chat {
  padding: 0;
}

.chat-window {
  max-width: 720px;
  margin: 0 auto;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0,0,0,.08);
}

.chat-header {
  display: flex;
  gap: .75rem;
  align-items: center;
  padding: .9rem 1rem;
  background: #fff7f4;
  border-bottom: 1px solid #f2d6d0;
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffd6d0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.chat-body {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background: #fffaf8;
}

.chat-row {
  display: flex;
  gap: .4rem;
  margin-bottom: .8rem;
}

.chat-row.user {
  justify-content: flex-end;
}

.chat-avatar-sm {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #ffd6d0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: .7rem;
}

.chat-bubble {
  max-width: 80%;
  background: #fff;
  padding: .7rem .9rem;
  border-radius: 16px;
  box-shadow: 0 6px 14px rgba(0,0,0,.06);
}

.chat-row.user .chat-bubble {
  background: #ffece8;
}

.chat-name {
  font-size: .7rem;
  font-weight: 600;
  color: #d05a52;
}

.chat-text {
  margin: .15rem 0;
  font-size: .9rem;
}

.chat-time {
  font-size: .65rem;
  color: #aaa;
}

.typing span {
  width: 6px;
  height: 6px;
  background: #d05a52;
  border-radius: 50%;
  display: inline-block;
  animation: blink 1.4s infinite;
}

.typing span:nth-child(2) { animation-delay: .2s }
.typing span:nth-child(3) { animation-delay: .4s }

@keyframes blink {
  0%,80%,100% { opacity: .3 }
  40% { opacity: 1 }
}

.chat-input {
  display: flex;
  gap: .5rem;
  padding: .7rem;
  border-top: 1px solid #f2d6d0;
}

.chat-input textarea {
  flex: 1;
  border-radius: 14px;
  border: 1px solid #ffd6d0;
  padding: .6rem .8rem;
  font-size: 16px;
}

.chat-input button {
  border-radius: 999px;
  padding: .5rem 1.1rem;
  background: #d05a52;
  color: white;
  border: none;
  font-weight: 600;
}

@media (max-width: 640px) {
  .safe-hero {
    display: none;
  }

  .chat-window {
    height: 100vh;
    border-radius: 0;
  }
}
</style>