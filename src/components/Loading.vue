<template>
  <div
    class="relative m-5 mt-14 size-max flex flex-col preserve-3d items-start justify-start gap-12 -rotate-x-20"
  >
    <div class="wrapper">
      <span class="side side1"></span>
      <span class="side side2"></span>
      <span class="side side3"></span>
      <span class="side side4"></span>
      <span class="shadow"></span>
    </div>
    <p class="mt-4 animate-pulse text-2xl text-brand-action font-semibold italic">Loading...</p>
  </div>
</template>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  animation: spin 4s linear infinite;
}

@keyframes spin {
  100% {
    transform: rotateY(360deg);
  }
}

.wrapper .side {
  --uno: 'size-20';
  background: linear-gradient(to bottom right, #ffa500, #ff4500);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transform-origin: center top;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.wrapper .side1 {
  transform: rotateZ(-30deg) rotateY(90deg);
  background: linear-gradient(to bottom right, #ff4500, #ffa500);
}

.wrapper .side2 {
  transform: rotateZ(30deg) rotateY(90deg);
  background: linear-gradient(to bottom right, #ffa500, #ff4500);
}

.wrapper .side3 {
  transform: rotateX(30deg);
  background: linear-gradient(to bottom right, #ffa500, #ff4500);
}

.wrapper .side4 {
  transform: rotateX(-30deg);
  background: linear-gradient(to bottom right, #ff4500, #ffa500);
}

.wrapper .shadow {
  width: 60px;
  height: 60px;
  background: #ff8c00;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  transform: rotateX(90deg) translateZ(-40px);
  filter: blur(12px);
}
</style>
