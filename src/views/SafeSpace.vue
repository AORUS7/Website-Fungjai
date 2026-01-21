<script setup>
import { ref, nextTick } from "vue";

const messages = ref([
  {
    id: 1,
    from: "bot",
    name: "FUNGJAI",
    text: "สวัสดีค่ะ 🤍\nขอบคุณที่เข้ามาใน SAFE SPACE วันนี้นะคะ\nถ้าอยากเล่าอะไร เราพร้อมฟังเสมอค่ะ",
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
    box.scrollTop = box.scrollHeight;
  }
};

const sendMessage = async () => {
  const text = userInput.value.trim();
  if (!text || isTyping.value) return;

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
          "คุณคือ FUNGJAI พื้นที่ปลอดภัย รับฟังอย่างอ่อนโยน ไม่ตัดสิน ไม่ให้คำสั่ง",
      },
      ...messages.value.map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),
    ];

    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages: llmMessages }),
    });

    const data = await response.json();
    if (!response.ok || !data.reply) throw new Error();

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
  } catch {
    messages.value.push({
      id: idCounter++,
      from: "bot",
      name: "FUNGJAI",
      text:
        "ขอโทษนะคะ เหมือนการเชื่อมต่อจะสะดุดนิดหน่อย\nแต่เรายังอยู่ตรงนี้นะคะ 🤍",
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
              คุณไม่จำเป็นต้องเข้มแข็งตลอดเวลา<br />
              แค่เป็นตัวเองก็พอ 🤍
            </p>
          </div>
        </div>
      </section>

      <section class="section section--highlight">
        <div class="container chat-layout">
          <div class="chat-window">
            <!-- Header -->
            <div class="chat-window-header">
              <div class="chat-avatar">FJ</div>
              <div>
                <div class="chat-title">FUNGJAI</div>
                <div class="chat-subtitle">รับฟัง · ไม่ตัดสิน · อ่อนโยน</div>
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
                  F
                </div>

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

            <form class="chat-input-row" @submit.prevent="sendMessage">
              <textarea
                v-model="userInput"
                class="chat-input"
                placeholder="อยากเล่าอะไรให้ FUNGJAI ฟังบ้างคะ..."
                rows="2"
                :disabled="isTyping"
                @keydown="handleKeydown"
              />
              <button
                type="submit"
                class="chat-send-btn"
                :disabled="isTyping || !userInput.trim()"
              >
                ส่ง
              </button>
            </form>

            <p class="chat-hint">
              Enter = ส่ง · Shift + Enter = ขึ้นบรรทัดใหม่
            </p>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<style scoped>
.chat-layout {
  display: flex;
  justify-content: center;
}

.chat-window {
  width: 100%;
  max-width: 720px;
  background: #ffffff;
  border-radius: 22px;
  padding: 1.2rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
}

.chat-window-header {
  display: flex;
  gap: 0.8rem;
  background: #fff7f4;
  padding: 0.8rem 0.9rem;
  border-radius: 16px;
  margin-bottom: 0.4rem;
}

.chat-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #ffe0df;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #d05a52;
}

.chat-avatar-sm {
  width: 26px;
  height: 26px;
  font-size: 0.7rem;
}

.chat-window-body {
  flex: 1;
  overflow-y: auto;
  padding: 0.5rem 0.7rem;
}

.chat-message-row {
  display: flex;
  margin-bottom: 0.35rem; /* 👈 ชิดขึ้น */
}

.chat-message-row.is-user {
  justify-content: flex-end;
}

.chat-bubble {
  max-width: 82%;
  padding: 0.7rem 0.95rem;
  border-radius: 18px;
  background: #fffdfc;
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.05);
}

.chat-message-row.is-user .chat-bubble {
  background: #fff1ec;
  box-shadow: 0 5px 14px rgba(208, 90, 82, 0.18);
}

.chat-bubble-name {
  font-size: 0.72rem;
  font-weight: 700;
  color: #d05a52;
  margin-bottom: 0.2rem;
}

.chat-bubble-meta {
  font-size: 0.68rem;
  color: #aaa;
  margin-top: 0.3rem;
}

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

.dot:nth-child(2) {
  animation-delay: 0.2s;
}
.dot:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-5px);
  }
}

.chat-input-row {
  display: flex;
  gap: 0.6rem;
  margin-top: 0;
  padding-top: 0.4rem;
}

.chat-input {
  flex: 1;
  border-radius: 14px;
  border: 1px solid #ffd7d0;
  padding: 0.65rem 0.85rem;
  font-size: 0.95rem;
}

.chat-send-btn {
  border-radius: 999px;
  padding: 0.55rem 1.1rem;
  background: #d05a52;
  color: white;
  border: none;
  font-weight: 600;
  cursor: pointer;
}

.chat-send-btn:disabled {
  opacity: 0.45;
}

.chat-hint {
  font-size: 0.7rem;
  color: #aaa;
  margin-top: 0.3rem;
  text-align: center;
}

@media (max-width: 640px) {
  .chat-window {
    border-radius: 16px;
    padding: 1rem;
  }

  .chat-bubble {
    max-width: 92%;
  }

  .chat-input {
    font-size: 16px;
  }
}
</style>