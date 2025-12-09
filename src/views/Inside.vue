<!-- src/views/Inside.vue -->
<template>
  <div class="page">
    <main>
      <!-- HERO -->
      <section class="hero">
        <div class="container hero-inner">
          <div>
            <div class="hero-highlight">โลกข้างในตัวเรา</div>
            <h1 class="hero-title">What's Going On Inside</h1>
            <p class="hero-text">
              หลายครั้งเราไม่รู้จะอธิบายความรู้สึกของตัวเองยังไง
              แค่รู้สึกว่ายุ่งเหยิง ว่างเปล่า หรือเหนื่อยแบบบอกไม่ถูก
              หน้านี้คือพื้นที่ที่ชวนคุณค่อย ๆ รู้จักโลกข้างในตัวเองให้ชัดขึ้นทีละนิด
            </p>
            <div class="hero-actions">
              <a href="#articles" class="btn btn-primary">
                เริ่มอ่านบทความ
              </a>
              <RouterLink to="/inside-question" class="btn btn-ghost">
                ลองทำแบบสำรวจความรู้สึก
              </RouterLink>
            </div>
          </div>

          <div class="hero-visual">
            <div class="hero-card">
              <div class="hero-chip">
                <span class="hero-chip-dot"></span>
                อ่านช้า ๆ ในจังหวะของคุณเอง
              </div>
              <p class="hero-quote">
                “เราไม่จำเป็นต้องเข้าใจทุกอย่างในใจตัวเองวันนี้
                แค่ยอมรับว่ามันมีอยู่ ก็ถือว่าเป็นก้าวแรกแล้ว”
                <small>บันทึกจาก FUNGJAI</small>
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- ARTICLES -->
      <section id="articles" class="section section--soft">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">บทความจากโลกข้างใน</h2>
            <p class="section-subtitle">
              รวมเรื่องเล็ก ๆ จากความรู้สึกที่หลายคนอาจกำลังเผชิญอยู่เหมือนกัน
            </p>
          </div>

          <div class="grid-2">
            <!-- Article 1 -->
            <article class="card">
              <h3 class="card-title">ความรู้สึกที่เราไม่ค่อยกล้าพูดถึง</h3>
              <p class="card-text">
                บางครั้งเราบอกตัวเองว่า “เราควรโอเคแล้วสิ”
                ทั้งที่ลึก ๆ ยังไม่โอเคเลยด้วยซ้ำ การยอมรับว่า
                “ตอนนี้ยังไม่โอเค” ไม่ได้แปลว่าเราอ่อนแอ
                แต่มันคือการซื่อสัตย์กับหัวใจตัวเอง
                และเป็นจุดเริ่มต้นของการดูแลตัวเองอย่างแท้จริง
              </p>
              <p class="card-text">
                คุณไม่จำเป็นต้องรีบดีขึ้นเร็วกว่าที่หัวใจไหว
                จังหวะของคุณสำคัญที่สุด
              </p>
            </article>

            <!-- Article 2 -->
            <article class="card">
              <h3 class="card-title">เมื่อความคิดวิ่งเร็วเกินไป</h3>
              <p class="card-text">
                เคยไหมที่ความคิดในหัววิ่งวนซ้ำเดิม จนเราเหนื่อยเอง?
                บางครั้งเราไม่ได้เหนื่อยจากเหตุการณ์ตรงหน้า
                แต่เหนื่อยจาก “เรื่องเล่าในหัว” ที่วิ่งไม่หยุด
              </p>
              <ul class="bullet-list">
                <li>ลองหายใจเข้าลึก ๆ ช้า ๆ สัก 3–5 รอบ</li>
                <li>เขียนความคิดที่กวนใจออกมาเป็นประโยคสั้น ๆ</li>
                <li>
                  แยกดูว่า “นี่คือสิ่งที่เกิดขึ้นจริง” หรือ
                  “นี่คือสิ่งที่เรากำลังกลัว”
                </li>
              </ul>
              <p class="card-text">
                แค่แยกออกว่าอะไรคือ “ความคิด” และอะไรคือ “ความจริง”
                ก็ช่วยให้หัวใจเบาลงได้บ้างแล้ว
              </p>
            </article>

            <!-- Article 3 -->
            <article class="card">
              <h3 class="card-title">อยู่กับตัวเองอย่างอ่อนโยนได้ยังไง</h3>
              <p class="card-text">
                เรามักใจดีกับคนอื่นมากกว่าตัวเองเสมอ
                ลองเริ่มฝึกอยู่กับตัวเองด้วยความอ่อนโยนแบบง่าย ๆ ก่อน
              </p>
              <ul class="bullet-list">
                <li>ลองให้กำลังใจตัวเองเหมือนที่เราให้เพื่อนสนิท</li>
                <li>ยอมให้ตัวเองพัก โดยไม่ต้องรู้สึกผิด</li>
                <li>ถ้าวันนี้ทำได้ไม่เท่าเมื่อวาน ก็ไม่เป็นไรเลย</li>
                <li>ขอความช่วยเหลือจากคนที่ไว้ใจได้ ไม่ใช่เรื่องน่าอาย</li>
              </ul>
            </article>

            <!-- Article 4 -->
            <article class="card">
              <h3 class="card-title">เมื่อเราไม่รู้ว่าจริง ๆ อยากได้อะไร</h3>
              <p class="card-text">
                บางช่วงของชีวิต เราอาจรู้สึกว่า
                “ไม่รู้เลยว่าตัวเองอยากได้อะไร”
                แค่ตื่นมาใช้ชีวิตไปวัน ๆ รู้สึกเหนื่อย
                แต่ก็ไม่รู้จะเปลี่ยนอะไรตรงไหน
              </p>
              <p class="card-text">
                บางทีคำตอบไม่ได้มาในรูปแบบใหญ่โต แต่อยู่ในสิ่งเล็ก ๆ เช่น
                สิ่งที่ทำแล้วรู้สึกเงียบลงข้างใน
                หรือกิจกรรมที่ทำแล้วรู้สึกว่า “นี่แหละที่เป็นเรา”
              </p>
            </article>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>