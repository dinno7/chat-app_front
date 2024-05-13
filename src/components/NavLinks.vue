<script setup lang="ts">
import { useUser } from '@/composables/useUser'
import { navlinks } from '@/constants'
import { RouterLink } from 'vue-router'

const { currentUser, isAuth, signout } = useUser()
</script>

<template>
  <ul class="flex gap-5 list-none">
    <li v-if="isAuth">
      <span>{{ currentUser?.name }}</span>
    </li>
    <li v-for="(link, index) in navlinks" :key="index">
      <RouterLink :to="link.path">
        {{ link.name }}
      </RouterLink>
    </li>
    <template v-if="!isAuth">
      <li>
        <RouterLink :to="{ name: 'signin' }"> Sign in </RouterLink>
      </li>
      <li>
        <RouterLink :to="{ name: 'signup' }"> Sign up </RouterLink>
      </li>
    </template>
    <li v-if="isAuth">
      <a href="javascript:void(0)" @click.prevent="signout"> SignOut </a>
    </li>
  </ul>
</template>
