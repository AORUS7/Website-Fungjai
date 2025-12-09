<template>
  <section class="pt-28 px-6 max-w-6xl mx-auto text-white text-center">
    <h1 class="text-4xl font-bold mb-10">หัวข้อการเรียน</h1>

    <div class="rounded-3xl bg-white/10 border border-white/20 backdrop-blur p-6 hover:scale-105 transition cursor-pointer"
      @click="$router.push('/podcast/content?topic=study')">
      <img src="/images/study.jpg" class="rounded-xl mb-4 h-56 w-full object-cover">
      <h2 class="text-2xl font-bold">ความเครียด / ความกดดัน / การจัดการเวลา</h2>
    </div>

  </section>
</template>

<script>
export default {};
</script>