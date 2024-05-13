<route lang="json5">
{
  name: 'home',
  meta: {
    auth: true
  }
}
</route>

<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
import { useUser } from '@/composables/useUser'

const { currentUser, isAuth } = useUser()
</script>
<template>
  <div class="grid lg:grid-cols-[3fr_9fr] gap-5 h-screen max-h-screen">
    <SideBar />
    <section class="bg-sky">
      <!-- > Refers to src/pages/index/[user_id].vue -->
      <RouterView />
    </section>
  </div>
</template>
