<script setup lang="ts">
import { navlinks } from '@/constants';
import { useUserStore } from '@/store/user';
import { RouterLink } from 'vue-router';

const userStore = useUserStore();
</script>

<template>
  <nav>
    <ul class="flex list-none items-center gap-5">
      <li v-for="(link, index) in navlinks" :key="index">
        <RouterLink :to="link.path">
          {{ link.name }}
        </RouterLink>
      </li>
      <template v-if="!userStore.isAuth">
        <li>
          <RouterLink :to="{ name: 'signin' }"> Sign in </RouterLink>
        </li>
        <li>
          <RouterLink :to="{ name: 'signup' }"> Sign up </RouterLink>
        </li>
      </template>
      <li v-if="userStore.isAuth">
        <a href="javascript:void(0)" @click.prevent="userStore.signout"> SignOut </a>
      </li>
    </ul>
  </nav>
</template>
