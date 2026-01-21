<template>
  <main class="inside-articles">
    <section class="section section--soft">
      <div class="container">
        <RouterLink to="/inside" class="back-link">
          ← กลับไปหน้า Inside
        </RouterLink>

        <header class="articles-header">
          <span class="hero-highlight">โลกข้างในตัวเรา</span>
          <h1 class="articles-title">บทความจากโลกข้างใน</h1>
          <p class="articles-subtitle">
            รวมเรื่องเล็ก ๆ จากความรู้สึกที่หลายคนอาจกำลังเผชิญอยู่เหมือนกัน  
            อ่านช้า ๆ ในจังหวะของคุณเอง
          </p>
        </header>

        <div class="articles-list">
          <article
            v-for="article in articles"
            :key="article.id"
            class="article-card"
          >
            <span v-if="article.tag" class="article-tag">
              {{ article.tag }}
            </span>

            <h3 class="article-title">
              {{ article.title }}
            </h3>

            <p class="article-summary">
              {{ article.summary }}
            </p>

            <span class="article-read">
              อ่านต่อ →
            </span>
          </article>
        </div>
      </div>
    </section>
  </main>
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
.back-link {
  display: inline-block;
  margin-bottom: 1.2rem;
  font-size: 0.85rem;
  color: var(--color-text-soft);
  text-decoration: none;
}

.back-link:hover {
  color: var(--color-accent);
}

.articles-header {
  margin-bottom: 2rem;
}

.articles-title {
  font-size: 1.8rem;
  margin: 0.3rem 0 0.5rem;
}

.articles-subtitle {
  font-size: 0.95rem;
  color: var(--color-text-soft);
}

.articles-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.2rem;
}

.article-card {
  background: #ffffff;
  border-radius: 22px;
  padding: 1.5rem 1.4rem;
  box-shadow: var(--shadow-soft);
  border: 1px solid rgba(255, 220, 210, 0.6);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.article-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 30px rgba(255, 138, 128, 0.18);
}

.article-tag {
  display: inline-block;
  font-size: 0.75rem;
  color: var(--color-accent);
  background: rgba(255, 138, 128, 0.12);
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  margin-bottom: 0.4rem;
}

.article-title {
  font-size: 1.1rem;
  margin: 0.2rem 0 0.4rem;
}

.article-summary {
  font-size: 0.9rem;
  color: var(--color-text-soft);
  line-height: 1.6;
}

.article-read {
  display: inline-block;
  margin-top: 0.6rem;
  font-size: 0.85rem;
  color: var(--color-accent);
}

@media (min-width: 768px) {
  .articles-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>