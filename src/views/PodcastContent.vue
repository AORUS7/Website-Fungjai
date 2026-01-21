<template>
  <section class="pt-28 px-6 max-w-4xl mx-auto text-white">

    <div v-if="topic === 'lover'" class="text-center">
      <h1 class="text-4xl font-bold mb-4">Chip Podcast</h1>
      <p class="text-white/70 mb-6">ทฤษฎีสามเหลี่ยมของความรัก</p>
      <img src="/images/loveclip.jpg" class="rounded-xl w-full object-cover">
    </div>

    <div v-if="topic === 'friend'" class="text-center">
      <h1 class="text-4xl font-bold mb-4">Podcast – มิตรภาพภายนอก</h1>
      <img src="/images/friendclip.jpg" class="rounded-xl">
    </div>

    <div v-if="topic === 'family'" class="text-center">
      <h1 class="text-4xl font-bold mb-4">Podcast – ครอบครัว</h1>
      <img src="/images/familyclip.jpg" class="rounded-xl">
    </div>

    <div v-if="topic === 'study'" class="text-center">
      <h1 class="text-4xl font-bold mb-4">Podcast – การเรียน</h1>
      <img src="/images/studyclip.jpg" class="rounded-xl w-full">
    </div>

    <div v-if="topic === 'health'" class="text-center">
      <h1 class="text-4xl font-bold mb-4">Podcast – สุขภาพใจ</h1>
      <img src="/images/healthclip.jpg" class="rounded-xl w-full">
    </div>

  </section>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const topic = route.query.topic;
</script>