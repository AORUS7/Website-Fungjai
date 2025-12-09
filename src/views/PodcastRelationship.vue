<template>
  <section class="pt-28 px-6 max-w-6xl mx-auto text-white">
    <h1 class="text-4xl font-bold text-center mb-10">หัวข้อสัมพันธภาพ</h1>

    <div class="grid md:grid-cols-3 gap-8">
      
      <div class="rounded-3xl bg-white/10 border border-white/20 backdrop-blur p-6 text-center hover:scale-105 transition cursor-pointer"
        @click="$router.push('/podcast/content?topic=lover')">
        <img src="/images/lover.jpg" class="rounded-xl mb-4 h-56 w-full object-cover">
        <h2 class="text-2xl font-bold">คนรัก</h2>
      </div>

      <div class="rounded-3xl bg-white/10 border border-white/20 backdrop-blur p-6 text-center hover:scale-105 transition cursor-pointer"
        @click="$router.push('/podcast/content?topic=friend')">
        <img src="/images/friend.jpg" class="rounded-xl mb-4 h-56 w-full object-cover">
        <h2 class="text-2xl font-bold">เพื่อน</h2>
      </div>

      <div class="rounded-3xl bg-white/10 border border-white/20 backdrop-blur p-6 text-center hover:scale-105 transition cursor-pointer"
        @click="$router.push('/podcast/content?topic=family')">
        <img src="/images/family.jpg" class="rounded-xl mb-4 h-56 w-full object-cover">
        <h2 class="text-2xl font-bold">ครอบครัว</h2>
      </div>

    </div>
  </section>
</template>

<script>
export default {};
</script>