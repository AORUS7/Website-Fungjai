<script setup>
import { RouterLink, useRoute } from "vue-router";

const route = useRoute();
const isActive = (path) => route.path === path;
</script>

<template>
  <nav class="bottom-nav">
    <RouterLink to="/" class="nav-item" :class="{ active: isActive('/') }">
      <span>หน้าแรก</span>
    </RouterLink>

    <RouterLink
      to="/podcast"
      class="nav-item"
      :class="{ active: isActive('/podcast') }"
    >
      <span>Podcast</span>
    </RouterLink>

    <RouterLink
      to="/inside"
      class="nav-item"
      :class="{ active: isActive('/inside') }"
    >
      <span>Inside</span>
    </RouterLink>

    <RouterLink
      to="/safe-space"
      class="nav-item special"
      :class="{ active: isActive('/safe-space') }"
    >
      <span>Safe Space</span>
    </RouterLink>
  </nav>
</template>

<style scoped>
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 64px;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border-top: 1px solid #f2d5cf;
  z-index: 1000;
}

.nav-item {
  flex: 1;
  text-align: center;
  font-size: 0.75rem;
  color: #999;
  text-decoration: none;
}

.nav-item.active {
  color: #ff6a5c;
  font-weight: 700;
}

.nav-item.special {
  background: linear-gradient(135deg, #ff9a8b, #ff6a88);
  color: white;
  padding: 0.5rem 0;
  border-radius: 999px;
  margin: 0 0.5rem;
}

.nav-item.special.active {
  box-shadow: 0 10px 24px rgba(255, 106, 136, 0.45);
}
</style>