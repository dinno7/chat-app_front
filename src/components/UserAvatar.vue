<script setup lang="ts">
import { useUser } from '@/composables/useUser';
import Avatar from './Avatar.vue';

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg';
  }>(),
  {
    size: 'sm',
  },
);

const { isAuth, currentUser, profilePicture } = useUser();
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
