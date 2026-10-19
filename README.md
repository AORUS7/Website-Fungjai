# Website-Fungjai
FUNGJAI WEB 🌱

พื้นที่ปลอดภัยสำหรับการฟัง พูด และอยู่กับความรู้สึกของตัวเอง

⸻

📌 Overview

FUNGJAI WEB คือเว็บแอปที่ออกแบบมาเป็น Safe Space
ให้ผู้ใช้สามารถ

	•	พูดคุยกับ AI อย่างอ่อนโยน (SafeSpace)
	•	อ่าน / ตอบคำถามภายใน (Inside)
	•	ฟัง Podcast ตามหมวดความรู้สึก (Podcast)

โฟกัสหลักคือ

	•	UX ที่นิ่ง อบอุ่น ไม่เร่ง
	•	ไม่กระตุ้น / ไม่รบกวนผู้ใช้ขณะพิมพ์หรือกดปุ่ม
	•	รองรับมือถือเป็นหลัก (Mobile-first)

⸻

🧱 Tech Stack

	•	Vue 3 (Composition API)
	•	Vue Router
	•	Vite
	•	CSS (no UI framework)
	•	Native <dialog> สำหรับ popup video
	•	Node / API (chat.ts) สำหรับ SafeSpace
💬 SafeSpace (Chat)

	•	ไม่มี auto navigation
	•	Scroll ลงล่างอัตโนมัติ
	•	UX เน้น “พิมพ์ได้ต่อเนื่อง ไม่โดนขัด”

ฟีเจอร์หลัก:

	•	chat bubble แยก bot / user
	•	typing indicator
	•	รองรับ multi-line (Shift + Enter)
	•	คำตอบที่อ้างอิงข้อมูลภายนอกจะแสดงชื่อและลิงก์แหล่งข้อมูลใต้ข้อความ

### ตั้งค่า Chatbot พร้อมแหล่งอ้างอิง

ตั้งค่า key ของผู้ให้บริการที่ต้องการใน Vercel → Project Settings → Environment Variables (ห้ามใส่ key ใน `VITE_*` หรือส่ง key ในแชต)

```text
GROQ_API_KEY=...
GEMINI_API_KEY=...
OPENROUTER_API_KEY=...
HF_API_KEY=...
TAVILY_API_KEY=...
```

มี key อย่างน้อยหนึ่งเจ้าและ `TAVILY_API_KEY` ก็ใช้คำถามทั่วไปพร้อมอ้างอิงได้ ลำดับเริ่มต้นคือ Groq → Gemini → OpenRouter → Hugging Face เจ้าที่ยังไม่ได้ตั้งค่า key จะถูกข้ามไป ปรับลำดับด้วย `AI_PROVIDER_ORDER=groq,gemini,openrouter,hf` ได้

ค่าเริ่มต้น Gemini ใช้ `gemini-3.5-flash-lite` (เปลี่ยนด้วย `GEMINI_MODEL`) และ OpenRouter ใช้ `openrouter/free` เท่านั้น ไม่มีการเปลี่ยนไปโมเดลเสียเงินอัตโนมัติ หากต้องการควบคุมค่าใช้จ่าย Gemini ให้ใช้โปรเจกต์ Free Tier ที่ไม่ได้เปิด billing; แพ็กเกจและโควตาขึ้นอยู่กับบัญชีผู้ให้บริการ เว็บนี้ไม่ได้สมัครหรือเปลี่ยน billing ให้

เมื่อเครดิตหมด ติด limit ติดต่อไม่ได้ หรือหมดเวลา ระบบสลับไปเจ้าถัดไป โดยไม่กลับไปเรียกเจ้าที่เพิ่งล้มเหลวในคำถามเดียวกัน พักเจ้าที่มีปัญหาตาม Retry-After หากมี การพักนี้จำได้เฉพาะ server instance ที่ยังทำงานอยู่ จึงไม่ใช่การเพิ่มโควตาหรือการรับประกันว่าไม่มี limit

ทุกเจ้าสร้างคำตอบผ่านกระบวนการเดิม: ร่างคำตอบ → ค้นข้อมูลจากเนื้อหาร่าง → ตรวจคำตอบและเลขอ้างอิง หากทุกเจ้าใช้ไม่ได้ จะไม่แต่งคำตอบหรือแหล่งข้อมูลขึ้นเอง คำทักทายและการรับฟังที่ระบบรู้จักไม่ต้องค้นอ้างอิง และคำตอบประคับประคองฉุกเฉินที่ระบบตรวจพบยังทำงานในหน้าเว็บได้

การเปิดใช้ Gemini/OpenRouter จะส่งข้อความและประวัติสนทนาที่จำเป็น รวมถึงร่างคำตอบและบริบทอ้างอิง ไปให้เจ้าที่ถึงลำดับรับงาน OpenRouter อาจส่งต่อไปผู้ให้บริการโมเดลที่เลือก จึงควรสื่อสารเรื่องนี้ในนโยบายข้อมูลของเว็บไซต์

ตรวจด้วย `npm run test:chat` และ deploy ใหม่หลังเพิ่ม Environment Variables การทดสอบจำลองไม่ใช่การยืนยันว่า key หรือโควตาของบัญชีจริงใช้งานได้

เอกสารทางการ: [Gemini API](https://ai.google.dev/gemini-api/docs/openai), [OpenRouter Free Models Router](https://openrouter.ai/docs/guides/routing/routers/free-router)

⸻

🎧 Podcast System

Concept

	•	แบ่ง Podcast เป็น “หมวดความรู้สึก”
	•	ความรัก
	•	เพื่อน
	•	ครอบครัว
	•	การเรียน

การทำงาน

	•	วิดีโออยู่ใน /public/video/*.mp4
	•	เปิดวิดีโอเป็น popup ในหน้าเดิม
	•	ไม่ redirect

เทคโนโลยีที่ใช้

	•	Native <dialog>
	•	<video controls autoplay playsinline>

เหตุผลที่เลือก <dialog>

	•	เบา
	•	คุม UX ได้
	•	Mobile-friendly
	•	ไม่มี side effect เรื่อง swipe

⸻

🎬 Video Popup Flow

	1.	ผู้ใช้กด “กดฟังตอนนี้”
	2.	เปิด <dialog>
	3.	โหลด video จาก /public/video/*.mp4
	4.	ปิด popup → pause video → ไม่เปลี่ยนหน้า

⸻

🎨 Branding / UI

โลโก้

	•	เปลี่ยนรูปทรงด้วย CSS

⸻

📱 Mobile UX Principles

	•	ไม่มี swipe navigation
	•	ปุ่มต้องกดง่าย
	•	ช่องพิมพ์ไม่ชน gesture
	•	font-size ≥ 16px
	•	spacing “หายใจได้”

⸻

🚀 Deployment

	•	ใช้งานกับ Vercel
	•	Static assets อยู่ใน /public
	•	ไม่ต้อง config พิเศษสำหรับ video

⸻

🌱 Design Philosophy

“ไม่ต้องรีบดีขึ้น
แค่มีพื้นที่ให้รู้สึกก็พอ”

FUNGJAI ไม่ได้ออกแบบมาเพื่อ

	•	แก้ปัญหาแทนผู้ใช้
	•	บอกว่าควรรู้สึกยังไง

แต่เพื่อ

	•	อยู่ข้าง ๆ
	•	ฟัง
	•	และไม่เร่ง
