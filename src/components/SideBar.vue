<script setup lang="ts">
import Icon from './Icon.vue'
</script>

<template>
  <section>
    <div class="w-full h-full grid lg:grid-cols-[52px_1fr] bg-brand-primary/10">
      <div
        class="flex flex-col items-center justify-between py-10 rounded-tr-lg rounded-br-lg bg-brand-base"
      >
        <div class="flex flex-col items-center justify-center top-icons">
          <div class="icon-wrapper" title="Messages">
            <Icon name="i-eva:message-square-outline" size="28" />
          </div>
          <div class="icon-wrapper" title="Contacts">
            <Icon name="i-eva-person-add-outline" size="32" />
          </div>
        </div>
        <div class="bottom-icons">
          <UserAvatar class="block mx-auto mb-5 cursor-pointer" />

          <div class="icon-wrapper" title="Exit">
            <Icon name="i-eva:external-link-outline" size="28" />
          </div>
        </div>
      </div>
      <div class="">User list...</div>
    </div>
  </section>
</template>

<style scoped>
.icon-wrapper {
  --uno: 'flex items-center justify-center w-full  py-5 transition-colors duration-300 cursor-pointer hover:bg-brand-primary/10';
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
