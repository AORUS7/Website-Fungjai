<script setup>
import { RouterLink, RouterView, useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const year = new Date().getFullYear();

const isActive = (path) => route.path === path;

const routes = ["/", "/podcast", "/inside", "/safe-space"];


</script>

<template>
  <div class="page">
    <header class="site-header">
      <div class="container site-header-inner">
        <!-- Brand -->
        <div class="brand">
          <div class="brand-mark"></div>
          <div>
            <div class="brand-text-main">FUNGJAI</div>
            <div class="brand-text-sub">ใจคุณสำคัญเสมอ</div>
          </div>
        </div>

        <!-- Desktop Nav -->
        <nav class="site-nav only-desktop">
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
            Inside
          </RouterLink>
          <RouterLink
            to="/safe-space"
            class="nav-link nav-pill"
            :class="{ active: isActive('/safe-space') }"
          >
            SAFE SPACE
          </RouterLink>
        </nav>
      </div>

      <nav class="mobile-nav only-mobile">
        <RouterLink
          to="/"
          class="mobile-link"
          :class="{ active: isActive('/') }"
        >
          หน้าแรก
        </RouterLink>
        <RouterLink
          to="/podcast"
          class="mobile-link"
          :class="{ active: isActive('/podcast') }"
        >
          Podcast
        </RouterLink>
        <RouterLink
          to="/inside"
          class="mobile-link"
          :class="{ active: isActive('/inside') }"
        >
          Inside
        </RouterLink>
        <RouterLink
          to="/safe-space"
          class="mobile-link special"
          :class="{ active: isActive('/safe-space') }"
        >
          SAFE SPACE
        </RouterLink>
      </nav>
    </header>

    <main class="main-content">
      <RouterView v-slot="{ Component }">
        <transition name="page">
          <component :is="Component" :key="$route.fullPath" />
        </transition>
      </RouterView>
    </main>

    <footer class="site-footer only-desktop">
      © {{ year }} FUNGJAI – ใจคุณสำคัญเสมอ
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #fffaf8;
}

.main-content {
  flex: 1;
  padding-bottom: 2rem;
}

.site-header {
  background: rgba(255, 247, 244, 0.95);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid #f3d6d0;
  position: sticky;
  top: 0;
  z-index: 50;
}

.site-header-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 1rem;
}

.brand {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.brand-mark {
  width: 38px;
  height: 38px;
  background: linear-gradient(135deg, #ff9a8b, #ff6a88);
  border-radius: 60% 40% 55% 45% / 55% 60% 40% 45%;
}

.brand-text-main {
  font-weight: 700;
}

.brand-text-sub {
  font-size: 0.75rem;
  color: #888;
}

.site-nav {
  display: flex;
  gap: 0.6rem;
}

.nav-link {
  padding: 0.45rem 0.95rem;
  border-radius: 999px;
  text-decoration: none;
  color: #666;
  transition: all 0.25s ease;
}

.nav-link:hover {
  background: rgba(255, 138, 122, 0.15);
}

.nav-link.active {
  background: linear-gradient(135deg, #ff9a8b, #ff6a88);
  color: white;
  box-shadow: 0 8px 20px rgba(255, 138, 122, 0.35);
}

.mobile-nav {
  display: flex;
  gap: 0.4rem;
  padding: 0.6rem;
  border-top: 1px solid #f3d6d0;
}

.mobile-link {
  flex: 1;
  text-align: center;
  padding: 0.55rem 0;
  border-radius: 999px;
  font-size: 0.8rem;
  color: #666;
  text-decoration: none;
  transition: all 0.25s ease;
}

.mobile-link.active {
  background: linear-gradient(135deg, #ff9a8b, #ff6a88);
  color: white;
  box-shadow: 0 6px 18px rgba(255, 138, 122, 0.35);
}

.site-footer {
  text-align: center;
  padding: 1rem;
  font-size: 0.8rem;
  color: #999;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.28s ease, transform 0.28s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(12px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}

.only-mobile {
  display: none;
}

@media (max-width: 768px) {
  .only-desktop {
    display: none;
  }
  .only-mobile {
    display: flex;
  }
}
</style>
