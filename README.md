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

คัดลอก `.env.example` เป็น `.env` สำหรับการพัฒนา และกำหนดค่าเดียวกันใน Vercel Project Settings → Environment Variables ก่อน deploy:

```
HF_API_KEY=hf_...
TAVILY_API_KEY=tvly_...
```

`HF_API_KEY` ใช้สร้างคำตอบ และ `TAVILY_API_KEY` ใช้ค้นหาแหล่งข้อมูลจริง ทุกคำตอบที่อาศัยข้อมูลภายนอกจะส่งลิงก์ที่ค้นพบกลับมาพร้อมคำตอบ หากค้นหาแหล่งที่น่าเชื่อถือไม่ได้ ระบบจะไม่เดาข้อเท็จจริงหรือแสดงแหล่งอ้างอิงปลอม

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
