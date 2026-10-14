<template>
  <div class="ink-cursor-container">
    <div ref="cursorRef" class="ink-cursor" :class="{ hover: isHovering }">
      <svg viewBox="0 0 24 24" class="cursor-svg"><path d="M12 2 L12 18 M8 14 L12 18 L16 14" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
    </div>
    <canvas ref="trailCanvas" class="ink-trail"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
const cursorRef = ref(null)
const trailCanvas = ref(null)
const isHovering = ref(false)
let ctx = null
let particles = []
let animationId = null
let mouseX = 0, mouseY = 0, lastX = 0, lastY = 0
const initCanvas = () => { const canvas = trailCanvas.value; if (!canvas) return; canvas.width = window.innerWidth; canvas.height = window.innerHeight; ctx = canvas.getContext('2d') }
const handleMouseMove = (e) => {
  mouseX = e.clientX; mouseY = e.clientY
  if (cursorRef.value) cursorRef.value.style.transform = `translate(${mouseX - 12}px, ${mouseY - 12}px)`
  const target = e.target
  isHovering.value = target.closest('a, button, input, textarea, .clickable, [role="button"]') !== null
  const distance = Math.sqrt(Math.pow(mouseX - lastX, 2) + Math.pow(mouseY - lastY, 2))
  if (distance > 5) {
    const count = Math.min(Math.floor(distance / 10), 3)
    for (let i = 0; i < count; i++) particles.push({ x: lastX + (mouseX - lastX) * (i / count), y: lastY + (mouseY - lastY) * (i / count), size: Math.random() * 4 + 2, opacity: 0.4, life: 1 })
    lastX = mouseX; lastY = mouseY
  }
}
const animate = () => {
  if (!ctx) return
  ctx.clearRect(0, 0, trailCanvas.value.width, trailCanvas.value.height)
  particles = particles.filter(p => p.life > 0)
  particles.forEach(p => { p.life -= 0.02; p.opacity = p.life * 0.4; p.size *= 0.98; ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2); ctx.fillStyle = `rgba(184, 155, 90, ${p.opacity})`; ctx.fill() })
  animationId = requestAnimationFrame(animate)
}
const handleResize = () => { if (trailCanvas.value) { trailCanvas.value.width = window.innerWidth; trailCanvas.value.height = window.innerHeight } }
const isTouchDevice = () => 'ontouchstart' in window || navigator.maxTouchPoints > 0
onMounted(() => { if (isTouchDevice()) return; initCanvas(); animate(); window.addEventListener('mousemove', handleMouseMove); window.addEventListener('resize', handleResize) })
onUnmounted(() => { window.removeEventListener('mousemove', handleMouseMove); window.removeEventListener('resize', handleResize); if (animationId) cancelAnimationFrame(animationId) })
</script>

<style scoped>
.ink-cursor-container { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; }
.ink-cursor { display: none; }
.ink-trail { position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9998; }
@media (max-width: 768px), (pointer: coarse) { .ink-cursor-container { display: none; } }
</style>
