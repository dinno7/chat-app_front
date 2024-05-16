<script setup lang="ts">
import FormInput from '@/components/Form/Input.vue';
import $useFetch from '@/composables/$useFetch';
import { useToast } from '@/composables/useToast';
import type { BasePayload, User } from '@/types';
import { normalizeImageUrl } from '@/utils';
import { useDebounceFn } from '@vueuse/core';
import { defineProps, ref } from 'vue';
import Avatar from '../Avatar.vue';
import FormWrapper from '../Form/FormWrapper.vue';
import Icon from '../Icon.vue';
import Loading from '../Loading.vue';

interface IProps {
  confirm: (data: any) => void;
}
const props = defineProps<IProps>();

const { $toast } = useToast();
const searchQueryInput = ref<string>('');

const {
  data: foundUsers,
  error,
  execute,
  isFetching,
} = $useFetch(() => `user/find?q=${searchQueryInput.value}`, {
  immediate: false,
}).json<BasePayload<User[]>>();

const handleSearchUsers = useDebounceFn(
  async () => {
    await execute();
    if (!foundUsers.value?.ok && error.value)
      return $toast.error(error.value?.message || 'Some error happened, try again');
  },
  500,
  { maxWait: 5000 },
);
</script>

<template>
  <div class="modal-content-width flex flex-col gap-3">
    <FormWrapper class="w-full">
      <FormInput
        label="Search for users"
        name="searchQuery"
        id="searchQuery"
        placeholder="Enter email or name to search"
        @input="handleSearchUsers"
        v-model="searchQueryInput"
      />
    </FormWrapper>
    <FormWrapper class="w-full">
      <Loading v-show="isFetching" class="mx-auto animate-zoom-in animate-duration-250" />

      <Transition
        enter-active-class="transition duration-500 ease-in-out"
        enter-from-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        enter-to-class="translate-y-0 opacity-100 sm:translate-x-0"
        leave-active-class="transition ease-ins duration-250"
        leave-from-class="opacity-100"
        leave-to-class="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
        mode="in-out"
      >
        <div v-if="foundUsers?.data?.length > 0" class="flex flex-col items-start gap-5">
          <RouterLink
            v-for="user in foundUsers?.data"
            :key="user.id"
            :to="user.id"
            @click="props.confirm"
            class="w-full flex items-center gap-3 rounded bg-brand-primary/5 px-3 py-4 transition-colors transition-transform hover:(scale-105 bg-brand-primary/15)"
          >
            <Avatar :src="normalizeImageUrl(user.profilePicture)" :alt="user.name" />
            <span class="text-brand-primary font-medium"> {{ user.name }}</span>
            <Icon name="i-eva:message-circle-outline" class="ml-auto" color="text-brand-action" />
          </RouterLink>
        </div>
      </Transition>
      <p v-show="!isFetching && !foundUsers?.data?.length" class="text-lg font-bold">No any user</p>
    </FormWrapper>
  </div>
</template>
