<template>
  <div class="seal-click-container">
    <transition-group name="seal-fade">
      <div v-for="seal in seals" :key="seal.id" class="seal-stamp" :style="{ left: seal.x + 'px', top: seal.y + 'px' }">
        <div class="seal-inner">
          <span class="seal-char">{{ seal.char }}</span>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const seals = ref([])
let sealId = 0
const sealChars = ['云', '游', '墨', '印', '雅', '韵', '书', '画', '诗', '茶']

const createSeal = (e) => {
  const char = sealChars[Math.floor(Math.random() * sealChars.length)]
  const id = sealId++
  seals.value.push({ id, x: e.clientX - 25, y: e.clientY - 25, char })
  setTimeout(() => {
    seals.value = seals.value.filter(s => s.id !== id)
  }, 1200)
}

onMounted(() => {
  document.addEventListener('click', createSeal)
})
onUnmounted(() => {
  document.removeEventListener('click', createSeal)
})
</script>

<style scoped>
.seal-click-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 9999;
}
.seal-stamp {
  position: absolute;
  width: 50px;
  height: 50px;
  pointer-events: none;
}
.seal-inner {
  width: 100%;
  height: 100%;
  border: 2px solid var(--accent-red);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(196, 30, 58, 0.1);
  transform: rotate(-5deg);
  animation: sealPress 0.3s ease-out, sealFadeOut 0.9s ease-in 0.3s forwards;
}
.seal-char {
  font-family: var(--font-title);
  font-size: 1.5rem;
  color: var(--accent-red);
  font-weight: bold;
  text-shadow: 0 0 2px rgba(196, 30, 58, 0.5);
}
@keyframes sealPress {
  0% { transform: rotate(-5deg) scale(2); opacity: 0; }
  50% { transform: rotate(-5deg) scale(0.9); opacity: 1; }
  100% { transform: rotate(-5deg) scale(1); opacity: 1; }
}
@keyframes sealFadeOut {
  0% { opacity: 1; transform: rotate(-5deg) scale(1); }
  100% { opacity: 0; transform: rotate(-5deg) scale(1.2) translateY(-10px); }
}
.seal-fade-enter-active {
  animation: sealPress 0.3s ease-out;
}
.seal-fade-leave-active {
  transition: all 0.5s ease;
}
.seal-fade-leave-to {
  opacity: 0;
  transform: scale(1.2) translateY(-10px);
}
</style>
