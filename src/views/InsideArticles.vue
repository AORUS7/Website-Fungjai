<template>
  <div class="page">
    <main>
      <section class="section section--soft">
        <div class="container">
          <div class="inside-back">
            <RouterLink to="/inside" class="back-link">
              ← Back
            </RouterLink>
          </div>

          <div class="section-header">
            <h1 class="section-title">บทความจากโลกข้างใน</h1>
            <p class="section-subtitle">
              รวมเรื่องเล็ก ๆ จากความรู้สึกที่หลายคนอาจกำลังเผชิญอยู่เหมือนกัน
              อ่านช้า ๆ ในจังหวะของคุณเอง
            </p>
          </div>

          <div class="grid-2">
            <article
              v-for="article in articles"
              :key="article.id"
              class="card"
            >
              <p v-if="article.tag" class="card-tag">{{ article.tag }}</p>
              <h3 class="card-title">{{ article.title }}</h3>
              <p class="card-text">{{ article.summary }}</p>
            </article>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";

const articles = [
  {
    id: 1,
    tag: "ความรู้สึก",
    title: "ความรู้สึกที่เราไม่ค่อยกล้าพูดถึง",
    summary:
      "บางครั้งเราบอกตัวเองว่า “เราควรโอเคแล้วสิ” ทั้งที่ลึก ๆ ยังไม่โอเคเลยด้วยซ้ำ การยอมรับว่าเรายังไม่ไหว ไม่ได้แปลว่าอ่อนแอ แต่มันคือจุดเริ่มต้นของการดูแลหัวใจตัวเอง",
  },
  {
    id: 2,
    tag: "ความคิดวนซ้ำ",
    title: "เมื่อความคิดในหัววิ่งเร็วเกินไป",
    summary:
      "ในวันที่สมองไม่ยอมหยุดคิด ความเหนื่อยอาจไม่ได้มาจากเหตุการณ์ตรงหน้า แต่มาจากเรื่องเล่าในหัวที่เราแต่งเติมขึ้นมาเอง ลองแยกมันออกจากความจริงดูบ้าง",
  },
  {
    id: 3,
    tag: "การดูแลตัวเอง",
    title: "อยู่กับตัวเองอย่างอ่อนโยนได้ยังไง",
    summary:
      "เราให้ความเข้าใจกับคนอื่นเก่งเสมอ แต่กับตัวเองกลับเข้มงวดเกินไป บทความนี้ชวนให้ลองพูดกับตัวเองให้เบาลง เหมือนที่เราคุยกับคนที่เรารัก",
  },
  {
    id: 4,
    tag: "ตัวตน",
    title: "เมื่อเราไม่รู้ว่าจริง ๆ แล้วต้องการอะไร",
    summary:
      "บางช่วงชีวิตเราอาจแค่รู้สึกว่างเปล่า ไม่ได้เบื่อ แต่ก็ไม่ตื่นเต้น ลองสังเกตสิ่งเล็ก ๆ ที่ทำให้ใจนิ่งขึ้น อาจเป็นคำตอบที่คุณมองข้ามไป",
  },
  {
    id: 5,
    tag: "ความเหงา",
    title: "อยู่ท่ามกลางผู้คนแต่ยังรู้สึกโดดเดี่ยว",
    summary:
      "ความเหงาบางแบบไม่ได้เกิดจากการอยู่คนเดียว แต่เกิดจากการที่เราไม่สามารถเป็นตัวเองได้จริง ๆ กับใครสักคน",
  },
  {
    id: 6,
    tag: "การเปรียบเทียบ",
    title: "เมื่อเราเผลอเอาตัวเองไปเทียบกับคนอื่น",
    summary:
      "ชีวิตของคนอื่นที่เห็นผ่านหน้าจอ ไม่ได้สะท้อนความจริงทั้งหมด บางทีเรากำลังตัดสินตัวเองจากภาพที่ไม่สมบูรณ์",
  },
];
</script>

<style scoped>
/* back button */
.inside-back {
  margin-bottom: 1.2rem;
}

.back-link {
  font-size: 0.9rem;
  color: var(--color-text-soft);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: var(--color-accent);
}
</style>