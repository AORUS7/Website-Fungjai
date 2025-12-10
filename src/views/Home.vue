<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <section class="hero">
    <div class="container hero-inner">
      <div>
        <div class="hero-highlight">พื้นที่ปลอดภัยทางใจ</div>
        <h1 class="hero-title">
          FUNGJAI – พื้นที่เล็ก ๆ ที่อยากรับฟังใจคุณ
        </h1>
        <p class="hero-text">
          ที่นี่คือมุมพักใจสำหรับวันที่คุณเหนื่อยล้า สับสน หรือแค่ไม่อยากอยู่คนเดียว
          คุณสามารถเล่าเรื่องของคุณ ฟังพอดแคสต์ หรืออ่านบทความที่ช่วยให้เข้าใจหัวใจตัวเองมากขึ้น
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
          คุณไม่จำเป็นต้องเข้มแข็งตลอดเวลา แค่ยอมรับว่าเหนื่อย ก็กล้าหาญมากแล้ว
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-card">
          <div class="hero-chip">
            <span class="hero-chip-dot"></span>
            ออนไลน์ · ปลอดภัย · ไม่ตัดสิน
          </div>
          <p class="hero-quote">
            “ชีวิตของคุณไม่จำเป็นต้องสวยงามตลอดเวลา
            ช่วงที่เปราะบาง ก็ยังมีค่ามากสำหรับเรา”
            <small>– จากใจเล็ก ๆ ของ FUNGJAI</small>
          </p>
          <p class="hero-quote">
            เล่าได้ทั้งเรื่องดี เรื่องเศร้า ความสับสน
            หรือแค่สิ่งเล็ก ๆ ที่ทำให้คุณยิ้มในวันนี้
          </p>
        </div>
      </div>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">คุณจะเจออะไรใน FUNGJAI บ้าง</h2>
        <p class="section-subtitle">
          เลือกวิธีดูแลใจในแบบที่สบายที่สุดสำหรับคุณ
        </p>
      </div>

      <div class="grid-3">
        <article class="card">
          <div class="card-tag">PODCAST</div>
          <h3 class="card-title">เล่าเรื่องใจผ่านเสียง</h3>
          <p class="card-text">
            พอดแคสต์สั้น ๆ ฟังง่าย เหมาะกับช่วงนั่งรถ
            เดินเล่นหรือก่อนเข้านอน ชวนคุยเรื่องความรู้สึก
            ความสัมพันธ์ และวันที่ไม่ง่ายนัก
          </p>
          <RouterLink to="/podcast" class="btn btn-ghost">
            ไปฟังพอดแคสต์
          </RouterLink>
        </article>

        <article class="card">
          <div class="card-tag">WHAT'S GOING ON INSIDE</div>
          <h3 class="card-title">เข้าใจโลกข้างในตัวเอง</h3>
          <p class="card-text">
            บทความสั้น ๆ ที่ชวนมองเข้าไปในความคิดและความรู้สึก
            ว่าข้างในใจเรากำลังเกิดอะไรขึ้น และเราจะอยู่กับมันอย่างอ่อนโยนได้ยังไง
          </p>
          <RouterLink to="/inside" class="btn btn-ghost">
            อ่านบทความ
          </RouterLink>
        </article>

        <article class="card">
          <div class="card-tag">SAFE SPACE</div>
          <h3 class="card-title">พื้นที่เล่าเรื่องของคุณ</h3>
          <p class="card-text">
            ถ้าคุณอยากมีที่ให้ระบายแบบไม่ต้องบอกชื่อจริง
            หรือแค่มีคนรับฟังอย่างเงียบ ๆ หน้านี้คือมุมปลอดภัยสำหรับคุณ
          </p>
          <RouterLink to="/safe-space" class="btn btn-ghost">
            เข้า SAFE SPACE
          </RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>