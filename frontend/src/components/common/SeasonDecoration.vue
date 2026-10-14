<template>
  <div class="season-decoration" v-if="season !== 'winter'">
    <div class="particles-container">
      <span v-for="i in particleCount" :key="i" class="particle" :style="getParticleStyle(i)">
        {{ particleIcon }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const currentMonth = new Date().getMonth() + 1
const season = computed(() => {
  if (currentMonth >= 3 && currentMonth <= 5) return 'spring'
  if (currentMonth >= 6 && currentMonth <= 8) return 'summer'
  if (currentMonth >= 9 && currentMonth <= 11) return 'autumn'
  return 'winter'
})

const particleCount = computed(() => {
  const map = { spring: 15, summer: 8, autumn: 12, winter: 0 }
  return map[season.value] || 0
})

const particleIcon = computed(() => {
  const map = { spring: '🌸', summer: '🍃', autumn: '🍂', winter: '❄' }
  return map[season.value] || '🌸'
})

const getParticleStyle = (i) => {
  const left = (i * 7 + Math.random() * 5) % 100
  const delay = Math.random() * 10
  const duration = 8 + Math.random() * 8
  const size = 0.8 + Math.random() * 0.8
  return {
    left: left + '%',
    animationDelay: delay + 's',
    animationDuration: duration + 's',
    fontSize: size + 'rem',
    opacity: 0.4 + Math.random() * 0.4
  }
}
</script>

<style scoped>
.season-decoration {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}
.particles-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.particle {
  position: absolute;
  top: -30px;
  animation: fall linear infinite;
}
@keyframes fall {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
</style>
