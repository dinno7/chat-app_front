<script setup lang="ts">
import Icon from '@/components/Icon.vue';
import Modal from '@/components/Modal.vue';
import FindUsersModal from '@/components/Modals/FindUsersModal.vue';
import UpdateUserModal from '@/components/Modals/UpdateUserModal.vue';
import UserAvatar from '@/components/UserAvatar.vue';
import { useUser } from '@/composables/useUser';
import { ref } from 'vue';

const updateUserModal = ref<InstanceType<typeof Modal> | null>(null);
const findUsersModal = ref<InstanceType<typeof Modal> | null>(null);
const { signout } = useUser();
</script>

<template>
  <div class="flex flex-col items-center justify-between bg-brand-base py-10">
    <div class="top-icons flex flex-col items-center justify-center">
      <div class="icon-wrapper" title="Messages">
        <Icon name="i-eva:message-square-outline" size="28" />
      </div>
      <div class="icon-wrapper" title="Contacts" @click="findUsersModal?.reveal">
        <Icon name="i-eva-person-add-outline" size="32" />
      </div>
    </div>
    <div class="bottom-icons">
      <UserAvatar class="mx-auto mb-5 block cursor-pointer" @click="updateUserModal?.reveal" />

      <div class="icon-wrapper" title="Exit" @click="signout">
        <Icon name="i-eva:external-link-outline" size="28" />
      </div>
    </div>
  </div>
  <Modal ref="updateUserModal" #="{ cancel, confirm }">
    <UpdateUserModal :cancelFn="cancel" :confirmFn="confirm" />
  </Modal>
  <Modal ref="findUsersModal" position="top" #="{ confirm }">
    <FindUsersModal :confirm="confirm" />
  </Modal>
</template>

<style scoped>
.icon-wrapper {
  --uno: 'flex items-center justify-center w-full  py-5 transition-colors duration-300 cursor-pointer hover:bg-brand-primary/10 ';
}

.icon-wrapper:hover > .icon-el {
  --uno: 'text-brand-action';
}

.icon-wrapper > .icon-el {
  --uno: 'text-brand-primary/70';
}

.top-icons,
.bottom-icons {
  --uno: 'w-full';
}
</style>
