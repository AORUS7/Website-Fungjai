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
let idCounter = 2;


const scrollToBottom = async () => {
  await nextTick();
  const box = document.querySelector(".chat-window-body");
  if (box) {
    box.scrollTo({
      top: box.scrollHeight,
      behavior: "smooth",
    });
  }
};


const sendMessage = async () => {
  const text = userInput.value.trim();
  if (!text || isTyping.value) return;

  // 1. push ข้อความ user
  messages.value.push({
    id: idCounter++,
    from: "user",
    name: "คุณ",
    text,
    time: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
  });

  userInput.value = "";
  isTyping.value = true;
  await scrollToBottom();

  try {
    const llmMessages = [
      {
        role: "system",
        content:
          "คุณคือ FUNGJAI พื้นที่ปลอดภัย รับฟังอย่างอ่อนโยน ไม่ตัดสิน ไม่ให้คำสั่ง ไม่ด่วนสรุป",
      },
      ...messages.value.map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        messages: llmMessages,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.reply) {
      throw new Error("API error");
    }

    messages.value.push({
      id: idCounter++,
      from: "bot",
      name: "FUNGJAI",
      text: data.reply,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    });
  } catch (err) {
    messages.value.push({
      id: idCounter++,
      from: "bot",
      name: "FUNGJAI",
      text:
        "ขอโทษนะคะ เหมือนการเชื่อมต่อจะสะดุดนิดหน่อย 🫧\nแต่ FUNGJAI ยังอยู่ตรงนี้นะ ลองพิมพ์ใหม่ได้เลยค่ะ",
      time: "เมื่อสักครู่",
    });
  } finally {
    isTyping.value = false;
    await scrollToBottom();
  }
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
            <h1 class="hero-title">SAFE SPACE</h1>
            <p class="hero-text">
              ถ้าวันนี้หัวใจคุณหนักไปนิด หรือมีเรื่องที่ไม่รู้จะเล่าให้ใครฟัง
              ที่นี่คือพื้นที่ที่คุณไม่จำเป็นต้องเข้มแข็ง
            </p>
            <div class="hero-actions">
              <a href="#chat" class="btn btn-primary">เริ่มคุยกับ FUNGJAI</a>
            </div>
          </div>

          <div class="hero-visual">
            <div class="hero-card">
              <div class="hero-chip">
                <span class="hero-chip-dot"></span>
                ออนไลน์ · พร้อมรับฟัง
              </div>
              <p class="hero-quote">
                “คุณไม่ได้เป็นภาระ เพียงเพราะคุณกำลังรู้สึก”
                <small>SAFE SPACE</small>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- CHAT -->
      <section id="chat" class="section section--highlight">
        <div class="container">
          <div class="chat-layout">
            <div class="chat-window">
              <!-- Header -->
              <div class="chat-window-header">
                <div class="chat-avatar">FJ</div>
                <div>
                  <div class="chat-title">FUNGJAI</div>
                  <div class="chat-subtitle">รับฟัง · ไม่ตัดสิน · อ่อนโยน</div>
                </div>
              </div>

              <!-- Messages -->
              <div class="chat-window-body">
                <div
                  v-for="m in messages"
                  :key="m.id"
                  class="chat-message-row"
                  :class="m.from === 'user' ? 'is-user' : 'is-bot'"
                >
                  <div v-if="m.from === 'bot'" class="chat-avatar chat-avatar-sm">F</div>

                  <div class="chat-bubble">
                    <p class="chat-bubble-name">{{ m.name }}</p>
                    <div class="chat-bubble-text">
                      <p v-for="(line, i) in m.text.split('\n')" :key="i">
                        {{ line }}
                      </p>
                    </div>
                    <p class="chat-bubble-meta">{{ m.time }}</p>
                  </div>
                </div>

                <div v-if="isTyping" class="chat-message-row is-bot">
                  <div class="chat-avatar chat-avatar-sm">F</div>
                  <div class="chat-bubble typing-indicator">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                  </div>
                </div>
              </div>

              <!-- Input -->
              <form class="chat-input-row" @submit.prevent="sendMessage">
                <textarea
                  v-model="userInput"
                  class="chat-input"
                  placeholder="อยากเล่าอะไรให้ FUNGJAI ฟังบ้างคะ..."
                  rows="2"
                  :disabled="isTyping"
                  @keydown="handleKeydown"
                ></textarea>

                <button
                  type="submit"
                  class="chat-send-btn"
                  :disabled="isTyping || !userInput.trim()"
                >
                  {{ isTyping ? "…" : "ส่ง" }}
                </button>
              </form>

              <p class="chat-hint">
                Enter = ส่ง · Shift + Enter = ขึ้นบรรทัดใหม่
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
/* Layout */
.chat-layout {
  display: flex;
  justify-content: center;
}

.chat-window {
  width: 100%;
  max-width: 720px;
  background: #ffffff;
  border-radius: 22px;
  padding: 1.4rem;
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

/* Header */
.chat-window-header {
  display: flex;
  gap: 0.9rem;
  background: #fff7f4;
  padding: 0.9rem 1rem;
  border-radius: 16px;
  margin-bottom: 0.8rem;
}

.chat-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #ffe0df;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #d05a52;
}

.chat-avatar-sm {
  width: 28px;
  height: 28px;
  font-size: 0.75rem;
}

/* Messages */
.chat-window-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.4rem;
}

.chat-message-row {
  display: flex;
  margin-bottom: 0.9rem;
}

.chat-message-row.is-user {
  justify-content: flex-end;
}

.chat-bubble {
  max-width: 80%;
  padding: 0.9rem 1.05rem;
  border-radius: 18px;
  background: #fffdfc;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  line-height: 1.65;
}

.chat-message-row.is-user .chat-bubble {
  background: #fff1ec;
  box-shadow: 0 6px 16px rgba(208,90,82,0.18);
}

.chat-bubble-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: #d05a52;
  margin-bottom: 0.25rem;
}

.chat-bubble-meta {
  font-size: 0.7rem;
  color: #aaa;
  margin-top: 0.4rem;
}

/* Typing */
.typing-indicator {
  display: flex;
  gap: 5px;
}
.dot {
  width: 6px;
  height: 6px;
  background: #d05a52;
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}
.dot:nth-child(2) { animation-delay: 0.2s; }
.dot:nth-child(3) { animation-delay: 0.4s; }

@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}

/* Input */
.chat-input-row {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.6rem;
}

.chat-input {
  flex: 1;
  border-radius: 14px;
  border: 1px solid #ffd7d0;
  padding: 0.75rem 0.9rem;
  font-size: 0.95rem;
}

.chat-send-btn {
  border-radius: 999px;
  padding: 0.55rem 1.2rem;
  background: #d05a52;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.chat-send-btn:disabled {
  opacity: 0.5;
  cursor: default;
}

.chat-hint {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.4rem;
}

/* MOBILE */
@media (max-width: 640px) {
  .chat-window {
    height: 100vh;
    max-width: 100%;
    border-radius: 0;
    padding: 1rem;
  }

  .chat-bubble {
    max-width: 92%;
    font-size: 0.95rem;
  }

  .chat-input {
    font-size: 16px; 
  }
}

/* TABLET / iPAD */
@media (min-width: 641px) and (max-width: 1024px) {
  .chat-window {
    max-width: 640px;
    height: 85vh;
  }

  .chat-bubble {
    max-width: 85%;
  }
}
</style>