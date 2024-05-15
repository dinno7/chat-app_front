<template>
  <div class="rounded-md bg-gray-700 p-5 transition-colors hover:bg-gray-200">
    <h1 class="mb-5 mt-0">Color palette</h1>
    <div class="flex rounded-sm shadow-lg">
      <div class="h-32 w-60% rounded-l-md bg-brand-base p-5">
        <p class="m-0 text-3xl text-brand-primary font-bold">Base</p>
      </div>
      <div class="h-32 w-30% bg-brand-primary p-5">
        <p class="m-0 text-3xl text-brand-action font-bold">Primary</p>
      </div>
      <div class="h-32 w-10% rounded-r-md bg-brand-action p-5">
        <p class="m-0 text-3xl text-brand-base font-bold">Actions</p>
      </div>
    </div>
  </div>
</template>
