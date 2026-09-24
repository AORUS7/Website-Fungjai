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
          <p class="articles-schedule">
            วันนี้มี {{ dailyArticles.length }} บทความ · เปลี่ยนชุดใหม่ทุกวัน
          </p>
        </header>

        <div class="articles-list">
          <article
            v-for="article in dailyArticles"
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

          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";
import { insideArticles } from "../data/insideArticles";

const ARTICLES_PER_DAY = 5;

const getMonday = (date) => {
  const monday = new Date(date);
  monday.setHours(0, 0, 0, 0);
  const day = monday.getDay() || 7;
  monday.setDate(monday.getDate() - day + 1);
  return monday;
};

const createSeed = (value) => [...value].reduce(
  (seed, character) => ((seed * 31) + character.charCodeAt(0)) >>> 0,
  0,
);

const shuffleForWeek = (items, weekKey) => {
  let seed = createSeed(weekKey);
  const random = () => {
    seed = (seed + 0x6d2b79f5) >>> 0;
    let result = seed;
    result = Math.imul(result ^ (result >>> 15), result | 1);
    result ^= result + Math.imul(result ^ (result >>> 7), result | 61);
    return ((result ^ (result >>> 14)) >>> 0) / 4294967296;
  };

  const shuffled = [...items];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [shuffled[index], shuffled[swapIndex]] = [shuffled[swapIndex], shuffled[index]];
  }
  return shuffled;
};

const dailyArticles = computed(() => {
  const today = new Date();
  const monday = getMonday(today);
  const dayIndex = Math.floor((today - monday) / 86_400_000);
  const weekKey = monday.toISOString().slice(0, 10);
  const weeklyArticles = shuffleForWeek(insideArticles, weekKey);
  const start = dayIndex * ARTICLES_PER_DAY;

  return weeklyArticles.slice(start, start + ARTICLES_PER_DAY);
});
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

.articles-schedule {
  margin: 0.7rem 0 0;
  font-size: 0.8rem;
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

@media (min-width: 768px) {
  .articles-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
