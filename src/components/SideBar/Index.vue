<script setup lang="ts">
import Conversations from '@/components/SideBar/Conversations.vue';
import Navigation from '@/components/SideBar/Navigation.vue';
</script>

<template>
  <div class="grid grid-cols-[52px_1fr] size-full h-screen bg-brand-primary/10">
    <Navigation />
    <Conversations />
  </div>
</template>
