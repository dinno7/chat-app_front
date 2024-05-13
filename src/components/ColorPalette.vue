<template>
  <div class="p-5 transition-colors bg-gray-700 rounded-md hover:bg-gray-200">
    <h1 class="mt-0 mb-5">Color palette</h1>
    <div class="flex rounded-sm shadow-lg">
      <div class="bg-brand-base w-60% h-32 p-5 rounded-l-md">
        <p class="m-0 text-3xl font-bold text-brand-primary">Base</p>
      </div>
      <div class="bg-brand-primary w-30% h-32 p-5">
        <p class="m-0 text-3xl font-bold text-brand-action">Primary</p>
      </div>
      <div class="bg-brand-action w-10% h-32 p-5 rounded-r-md">
        <p class="m-0 text-3xl font-bold text-brand-base">Actions</p>
      </div>
    </div>
  </div>
</template>