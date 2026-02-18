<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="home-page">
    <section class="page-section">
      <div class="container hero-inner">
        <div>
          <div class="hero-highlight">พื้นที่ปลอดภัยทางใจ</div>

          <h1 class="hero-title">
            FUNGJAI – พื้นที่เล็ก ๆ ที่อยากรับฟังใจคุณ
          </h1>

          <p class="text-content">
            ที่นี่คือมุมพักใจสำหรับวันที่คุณเหนื่อยล้า สับสน
            หรือแค่ไม่อยากอยู่คนเดียว
          </p>

          <div class="hero-actions">
            <RouterLink to="/safe-space" class="btn btn-primary">
              เริ่มเล่าให้เราฟัง
            </RouterLink>

            <RouterLink to="/podcast" class="btn btn-ghost">
              ไปฟังพอดแคสต์
            </RouterLink>
          </div>

          <div class="hero-note">
            คุณไม่จำเป็นต้องเข้มแข็งตลอดเวลา
            แค่ยอมรับว่าเหนื่อยก็กล้าหาญมากแล้ว
          </div>
        </div>

        <div class="hero-card">
          <div class="hero-chip">
            <span class="hero-chip-dot"></span>
            ออนไลน์ · ปลอดภัย · ไม่ตัดสิน
          </div>

          <p>
            ที่นี่คือมุมพักใจสำหรับวันที่คุณเหนื่อยล้า สับสน
            หรือแค่ไม่อยากอยู่คนเดียว
            คุณสามารถเล่าเรื่องของคุณ ฟังพอดแคสต์
            หรืออ่านบทความที่ช่วยให้เข้าใจหัวใจตัวเองมากขึ้น
          </p>

          <small>– จากใจเล็ก ๆ ของ FUNGJAI</small>
        </div>
      </div>
    </section>

    <!-- FEATURES -->
    <section class="page-section section-soft">
      <div class="container">
        <h2>คุณจะเจออะไรใน FUNGJAI บ้าง</h2>

        <div class="grid grid-3">
          <article class="card">
            <div class="card-tag">PODCAST</div>
            <h3>เล่าเรื่องใจผ่านเสียง</h3>
            <p>พอดแคสต์สั้น ๆ ฟังง่ายในวันที่ใจต้องการพัก</p>

            <RouterLink to="/podcast" class="btn btn-ghost">
              ไปฟังพอดแคสต์
            </RouterLink>
          </article>

          <article class="card">
            <div class="card-tag">INSIDE</div>
            <h3>เข้าใจโลกข้างใน</h3>
            <p>บทความชวนสำรวจความรู้สึกอย่างอ่อนโยน</p>

            <RouterLink to="/inside" class="btn btn-ghost">
              อ่านบทความ
            </RouterLink>
          </article>

          <article class="card">
            <div class="card-tag">SAFE SPACE</div>
            <h3>พื้นที่เล่าเรื่องของคุณ</h3>
            <p>พื้นที่ที่คุณไม่ต้องอธิบายตัวเองให้ใครเข้าใจ</p>

            <RouterLink to="/safe-space" class="btn btn-ghost">
              เข้า SAFE SPACE
            </RouterLink>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  overflow-x: hidden;
}
</style>