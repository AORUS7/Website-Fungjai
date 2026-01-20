<script setup>
import { ref, nextTick } from "vue";

/* -------------------------
   STATE
-------------------------- */
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
const isTyping = ref(false);
let idCounter = 2;

/* -------------------------
   HELPERS
-------------------------- */
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

/* -------------------------
   SEND MESSAGE
-------------------------- */
const sendMessage = async () => {
  const text = userInput.value.trim();
  if (!text || isTyping.value) return;

  // แสดงข้อความผู้ใช้
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
    // 🔥 เรียก Vercel API เท่านั้น
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: text }),
    });

    const data = await response.json();

    if (!response.ok || !data.reply) {
      throw new Error("API error");
    }

    // แสดงข้อความบอท
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
    console.error("Chat error:", err);

    messages.value.push({
      id: idCounter++,
      from: "bot",
      name: "FUNGJAI",
      text:
        "ขอโทษนะคะ ตอนนี้การเชื่อมต่อมีปัญหานิดหน่อย 🫧 แต่ FUNGJAI ยังอยู่ตรงนี้เสมอ ลองพิมพ์ใหม่อีกครั้งได้เลยค่ะ",
      time: "เมื่อสักครู่",
    });
  } finally {
    isTyping.value = false;
    await scrollToBottom();
  }
};

/* -------------------------
   KEYBOARD
-------------------------- */
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
      <!-- HERO -->
      <section class="hero">
        <div class="container hero-inner">
          <div>
            <div class="hero-highlight">พื้นที่ปลอดภัย</div>
            <h1 class="hero-title">SAFE SPACE – แชทกับใจของคุณได้ที่นี่</h1>
            <p class="hero-text">
              ถ้าคุณมีเรื่องที่ไม่รู้จะเล่าให้ใครฟัง หรือแค่อยากมีใครสักคนที่รับฟังอย่างไม่ตัดสิน
              ที่นี่คือพื้นที่ที่คุณสามารถเล่าได้อย่างสบายใจ
            </p>
            <div class="hero-actions">
              <a href="#chat" class="btn btn-primary">เริ่มคุยกับ FUNGJAI</a>
            </div>
          </div>

          <div class="hero-visual">
            <div class="hero-card">
              <div class="hero-chip">
                <span class="hero-chip-dot"></span>
                ออนไลน์ · AI พร้อมรับฟัง
              </div>
              <p class="hero-quote">
                “คุณไม่ได้เป็นภาระ เพียงเพราะคุณกำลังรู้สึกบางอย่าง”
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
            <div class="chat-window card">
              <div class="chat-window-header">
                <div class="chat-avatar"><span>FJ</span></div>
                <div>
                  <div class="chat-title">FUNGJAI • AI Assistant</div>
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
                    <span>F</span>
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
                  <div class="chat-avatar chat-avatar-sm"><span>F</span></div>
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
                ></textarea>

                <button
                  type="submit"
                  class="btn btn-primary chat-send-btn"
                  :disabled="isTyping || !userInput.trim()"
                >
                  {{ isTyping ? "..." : "ส่ง" }}
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
.chat-layout {
  display: grid;
  grid-template-columns: 1fr;
}
.chat-window {
  display: flex;
  flex-direction: column;
  padding: 1.4rem;
  min-height: 520px;
}
.chat-window-body {
  flex: 1;
  overflow-y: auto;
  margin-bottom: 0.8rem;
}
.chat-message-row {
  display: flex;
  margin-bottom: 0.75rem;
}
.chat-message-row.is-user {
  justify-content: flex-end;
}
.chat-bubble {
  max-width: 85%;
  padding: 0.7rem 0.8rem;
  border-radius: 16px;
  background: #fff;
  border: 1px solid #ffd7d0;
}
.chat-message-row.is-user .chat-bubble {
  background: #fff4f0;
}
.typing-indicator {
  display: flex;
  gap: 4px;
}
.dot {
  width: 6px;
  height: 6px;
  background: #d05a52;
  border-radius: 50%;
  animation: bounce 1.4s infinite;
}
@keyframes bounce {
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-6px); }
}
</style>