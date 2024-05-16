<script setup lang="ts">
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';
import Avatar from './Avatar.vue';

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    size: 'sm',
  },
);

const userStore = useUserStore();
const { currentUser, isAuth, profilePicture } = storeToRefs(userStore);
</script>

<template>
  <Avatar
    v-if="isAuth"
    :size="props.size"
    :src="profilePicture"
    :alt="currentUser?.name + ' profile image'"
    :title="currentUser?.name"
  />
</template>
