<script setup>
import { onMounted, onBeforeUnmount, ref } from "vue";
import { RouterLink, RouterView, useRoute } from "vue-router";

const route = useRoute();
const viewportStyle = ref({});
const syncViewport = () => {
  const viewport = window.visualViewport;
  viewportStyle.value = viewport && viewport.scale === 1
    ? { '--chat-viewport-height': `${viewport.height}px`, '--chat-viewport-top': `${viewport.offsetTop}px` }
    : {};
};
onMounted(() => {
  syncViewport();
  window.visualViewport?.addEventListener('resize', syncViewport);
  window.visualViewport?.addEventListener('scroll', syncViewport);
  window.addEventListener('resize', syncViewport);
});
onBeforeUnmount(() => {
  window.visualViewport?.removeEventListener('resize', syncViewport);
  window.visualViewport?.removeEventListener('scroll', syncViewport);
  window.removeEventListener('resize', syncViewport);
});
const year = new Date().getFullYear();

const isActive = (path) => route.path === path;
</script>

<template>
  <div class="page" :class="{ 'chat-page': isActive('/safe-space') }" :style="viewportStyle">
    <!-- Decorative layer stays behind every route and never receives input. -->
    <div class="app-backdrop" aria-hidden="true">
      <span v-for="heart in 6" :key="heart" class="glass-heart" :class="`glass-heart--${heart}`"></span>
      <span class="glass-sparkle glass-sparkle--1"></span>
      <span class="glass-sparkle glass-sparkle--2"></span>
    </div>
    <header v-if="$route.path !== '/login'" class="site-header">
      <div class="container site-header-inner">
        <div class="brand">
          <div class="brand-mark"></div>
          <div>
            <div class="brand-text-main">FUNGJAI</div>
            <div class="brand-text-sub">ใจคุณสำคัญเสมอ</div>
          </div>
        </div>

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
        <Transition name="page" mode="out-in">
          <component :is="Component" :key="$route.fullPath" />
        </Transition>
      </RouterView>
    </main>

    <footer v-if="$route.path !== '/login'" class="site-footer only-desktop">
      © {{ year }} FUNGJAI – ใจคุณสำคัญเสมอ
    </footer>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  isolation: isolate;
}

.main-content {
  flex: 1;
  padding-bottom: 2rem;
}

.site-header {
  background: rgba(255, 247, 251, 0.94);
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
<style scoped>
@media (max-width: 768px) {
  .chat-page {
    position: fixed;
    top: var(--chat-viewport-top, 0px);
    inset-inline: 0;
    height: 100vh;
    height: var(--chat-viewport-height, 100dvh);
    min-height: 0;
    padding-bottom: 0;
    overflow: hidden;
  }
  .chat-page .site-header { flex: none; padding-top: env(safe-area-inset-top, 0px); }
  .chat-page .site-header-inner { padding-block: .35rem; }
  .chat-page .brand-mark { width: 28px; height: 28px; }
  .chat-page .brand-text-sub { display: none; }
  .chat-page .mobile-nav { padding: .25rem .5rem; gap: .15rem; }
  .chat-page .mobile-link { padding: .3rem 0; min-width: 0; }
  .chat-page .main-content { display: flex; min-height: 0; padding: 0; overflow: hidden; }
}
</style>
