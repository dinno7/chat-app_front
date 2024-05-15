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

const avatarSize = {
  sm: 'w-10',
  md: 'w-14',
  lg: 'w-18',
};
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
