<template>
  <main>
    <section class="hero">
      <div class="container hero-inner">
        <div>
          <div class="hero-highlight">
            พอดแคสต์สำหรับหัวใจที่กำลังคิดเยอะ
          </div>
          <h1 class="hero-title">พอดแคสต์ที่อยากนั่งคุยกับใจคุณ</h1>
          <p class="hero-text">
            รวมตอนสั้น ๆ ที่พูดถึงเรื่องความรู้สึก ความสัมพันธ์
            วันที่ไม่ง่ายเท่าไหร่ และมุมมองเล็ก ๆ ที่อาจช่วยให้คุณหายใจได้
            โล่งขึ้นอีกนิด
          </p>
          <div class="hero-actions">
            <a href="#episodes" class="btn btn-primary">
              เลือกตอนที่อยากฟัง
            </a>
            <!-- ถ้ามีลิงก์ Spotify/YouTube จริง ค่อยเอา # ไปแทนเป็น URL -->
            <a href="#" class="btn btn-ghost">
              ฟังบน Spotify
            </a>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-card">
            <div class="hero-chip">
              <span class="hero-chip-dot"></span>
              กดเล่นเมื่อไรก็ได้ที่ใจอยากพัก
            </div>
            <p class="hero-quote">
              “บางครั้งแค่ได้ฟังใครสักคนพูดแทนสิ่งที่เราไม่กล้าพูด
              ก็ทำให้รู้สึกไม่โดดเดี่ยวแล้ว”
              <small>EP. 00 – Intro to FUNGJAI Podcast</small>
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Episodes -->
    <section id="episodes" class="section section--soft">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">ตอนต่าง ๆ ใน PODCAST</h2>
          <p class="section-subtitle">
            เลือกตอนที่ตรงกับความรู้สึกของคุณในตอนนี้มากที่สุด
          </p>
        </div>

        <div class="grid-2">
          <!-- EP 1 -->
          <article class="card">
            <div class="card-tag">EP. 01</div>
            <h3 class="card-title">เมื่อเราเหนื่อยแต่ไม่รู้จะพักยังไง</h3>
            <div class="episode-meta">ระยะเวลา: ประมาณ 10–15 นาที</div>
            <p class="card-text">
              ตอนนี้ชวนคุณสำรวจความเหนื่อยที่ไม่ได้มาจากงานอย่างเดียว
              แต่จากหัวใจที่ต้องพยายามเข้มแข็งตลอดเวลา
              และวิธีเล็ก ๆ ที่จะเริ่มอนุญาตให้ตัวเองได้พักจริง ๆ สักที
            </p>
            <a href="#" class="btn btn-ghost">
              กดฟังตอนนี้
            </a>
          </article>

          <!-- EP 2 -->
          <article class="card">
            <div class="card-tag">EP. 02</div>
            <h3 class="card-title">
              ทำไมเราถึงกลัวการเล่าเรื่องของตัวเองให้ใครฟัง
            </h3>
            <div class="episode-meta">ระยะเวลา: ประมาณ 12 นาที</div>
            <p class="card-text">
  องของตัวเอ  เบื้องหลังความคิดแบบ “เราไม่อยากเป็นภาระใคร”
              บางทีอาจมีอะไรซ่อนอยู่มากกว่านั้น มาลองค่อย ๆ
              เปิดดูความเชื่อพวกนี้ไปด้วยกันอย่างอ่อนโยน
            </p>
            <a href="#" class="btn btn-ghost">
              กดฟังตอนนี้
            </a>
          </article>

          <!-- EP 3 -->
          <article class="card">
            <div class="card-tag">EP. 03</div>
            <h3 class="card-title">วันที่รู้สึกว่าตัวเองไม่เก่งพอ</h3>
            <div class="episode-meta">ระยะเวลา: ประมาณ 8–10 นาที</div>
            <p class="card-text">
              สำหรับวันที่คุณเปรียบเทียบตัวเองกับคนอื่นแล้วรู้สึกแพ้ไปหมด
              ลองมาฟังเสียงเล็ก ๆ ที่จะเตือนคุณว่าคุณมีคุณค่า
              มากกว่าที่สายตาตัวเองยอมมองเห็น
            </p>
            <a href="#" class="btn btn-ghost">
              กดฟังตอนนี้
            </a>
          </article>

          <!-- EP 4 -->
          <article class="card">
            <div class="card-tag">EP. 04</div>
            <h3 class="card-title">
              เมื่อบ้านไม่ใช่ที่ที่รู้สึกปลอดภัยที่สุด
            </h3>
            <div class="episode-meta">ระยะเวลา: ประมาณ 15 นาที</div>
            <p class="card-text">
              สำหรับใครที่รู้สึกว่าบ้าน คนใกล้ตัว
              หรือที่ที่ควรสบายใจที่สุด กลับกลายเป็นที่ที่ทำให้เราเกร็ง
              เรามาคุยกันว่าเราจะดูแลใจตัวเองยังไง ในความจริงที่ไม่ง่ายนี้
            </p>
            <a href="#" class="btn btn-ghost">
              กดฟังตอนนี้
            </a>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
// ยังไม่ต้องมี logic อะไร ใช้แค่ layout/เนื้อหา
</script>