<template>
  <div class="brush-title" :class="{ 'animate': animate }">
    <span
      v-for="(char, index) in chars"
      :key="index"
      class="brush-char title-font"
      :style="{ animationDelay: index * delay + 's' }"
    >{{ char }}</span>
    <span v-if="showInk" class="ink-dot" :style="{ left: inkPosition + '%' }"></span>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const props = defineProps({
  text: { type: String, required: true },
  delay: { type: Number, default: 0.15 },
  showInk: { type: Boolean, default: true },
  autoPlay: { type: Boolean, default: true }
})

const animate = ref(false)
const chars = computed(() => props.text.split(''))
const inkPosition = ref(0)

onMounted(() => {
  if (props.autoPlay) {
    setTimeout(() => {
      animate.value = true
      let pos = 0
      const interval = setInterval(() => {
        pos += 100 / chars.value.length
        inkPosition.value = Math.min(pos, 100)
        if (pos >= 100) clearInterval(interval)
      }, props.delay * 1000)
    }, 300)
  }
})
</script>

<style scoped>
.brush-title {
  display: inline-flex;
  align-items: center;
  position: relative;
  font-family: var(--font-title);
}
.brush-char {
  display: inline-block;
  opacity: 0;
  transform: translateY(10px) scale(0.8);
  filter: blur(4px);
}
.animate .brush-char {
  animation: brushWriteChar 0.6s ease forwards;
}
@keyframes brushWriteChar {
  0% {
    opacity: 0;
    transform: translateY(15px) scale(0.6) rotate(-5deg);
    filter: blur(8px);
  }
  40% {
    opacity: 0.8;
    filter: blur(2px);
  }
  70% {
    transform: translateY(-2px) scale(1.05) rotate(1deg);
    filter: blur(0);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1) rotate(0);
    filter: blur(0);
  }
}
.ink-dot {
  position: absolute;
  bottom: -8px;
  width: 6px;
  height: 6px;
  background: var(--accent-red);
  border-radius: 50%;
  opacity: 0.6;
  transform: translateX(-50%);
  transition: left 0.3s ease;
  filter: blur(1px);
}
</style>
