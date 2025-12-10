<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'

const route = useRoute()

const isActive = (path) => route.path === path
const year = new Date().getFullYear()
</script>

<template>
  <div class="page">
    <!-- Header + Navbar -->
    <header class="site-header">
      <div class="container site-header-inner">
        <div class="brand">
          <div class="brand-mark"></div>
          <div>
            <div class="brand-text-main">FUNGJAI</div>
            <div class="brand-text-sub">ใจคุณสำคัญเสมอ</div>
          </div>
        </div>

        <nav class="site-nav">
          <RouterLink
            to="/"
            class="nav-link"
            :class="{ active: isActive('/') }"
          >
            หน้าแรก
          </RouterLink>

          <RouterLink
            to="/podcast"
            class="nav-link"
            :class="{ active: isActive('/podcast') }"
          >
            Podcast
          </RouterLink>

          <RouterLink
            to="/inside"
            class="nav-link"
            :class="{ active: isActive('/inside') }"
          >
            What's Going On Inside
          </RouterLink>

          <RouterLink
            to="/safe-space"
            class="nav-link"
            :class="{ active: isActive('/safe-space') }"
          >
            SAFE SPACE
          </RouterLink>
        </nav>
      </div>
    </header>

    <!-- เนื้อหาของแต่ละหน้า -->
    <main>
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="site-footer">
      <div class="container footer-inner">
        <div>© {{ year }} FUNGJAI – ใจคุณสำคัญเสมอ</div>
        <div class="footer-links">
          <RouterLink to="/safe-space" class="footer-link">
            SAFE SPACE
          </RouterLink>
          <RouterLink to="/podcast" class="footer-link">
            พอดแคสต์
          </RouterLink>
          <RouterLink to="/inside" class="footer-link">
            บทความ
          </RouterLink>
        </div>
      </div>
    </footer>
  </div>
</template>