<template>
  <div class="plum-snow-bg">
    <div class="bg-image" :style="{ backgroundImage: `url(${bgImage})` }"></div>
    <div class="bg-overlay"></div>
    <canvas ref="snowCanvas" class="snow-canvas"></canvas>
    <canvas ref="petalCanvas" class="petal-canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const bgImage = '/plum-snow-bg.jpg'
const snowCanvas = ref(null)
const petalCanvas = ref(null)
let animationId = null

onMounted(() => {
  const snowCvs = snowCanvas.value
  const petCvs = petalCanvas.value
  const sctx = snowCvs.getContext('2d')
  const pctx = petCvs.getContext('2d')
  const resize = () => {
    snowCvs.width = petCvs.width = window.innerWidth
    snowCvs.height = petCvs.height = window.innerHeight
  }
  resize()

  // 雪花：匀速下落 + 轻微摆动
  const snow = []
  for (let i = 0; i < 60; i++) {
    snow.push({
      x: Math.random() * snowCvs.width,
      y: Math.random() * snowCvs.height,
      r: Math.random() * 2.5 + 1,
      speed: Math.random() * 0.8 + 0.4,
      drift: Math.random() * Math.PI * 2
    })
  }

  // 花瓣：椭圆 + 旋转 + 摆动
  const petals = []
  for (let i = 0; i < 50; i++) {
    petals.push({
      x: Math.random() * petCvs.width,
      y: Math.random() * petCvs.height,
      size: Math.random() * 8 + 4,
      speed: Math.random() * 1 + 0.5,
      rotate: Math.random() * 360,
      color: Math.random() > 0.5 ? '#FFB7C5' : '#FF9EB0'
    })
  }

  const animate = () => {
    // 雪花
    sctx.clearRect(0, 0, snowCvs.width, snowCvs.height)
    snow.forEach(f => {
      sctx.beginPath()
      sctx.arc(f.x, f.y, f.r, 0, Math.PI * 2)
      sctx.fillStyle = 'rgba(255,255,255,0.85)'
      sctx.fill()
      f.y += f.speed
      f.drift += 0.01
      f.x += Math.sin(f.drift) * 0.4
      if (f.y > snowCvs.height) { f.y = -5; f.x = Math.random() * snowCvs.width }
    })

    // 花瓣
    pctx.clearRect(0, 0, petCvs.width, petCvs.height)
    petals.forEach(p => {
      pctx.save()
      pctx.translate(p.x, p.y)
      pctx.rotate(p.rotate * Math.PI / 180)
      pctx.fillStyle = p.color
      pctx.beginPath()
      pctx.ellipse(0, 0, p.size, p.size / 2, 0, 0, Math.PI * 2)
      pctx.fill()
      pctx.restore()
      p.y += p.speed
      p.x += Math.sin(p.y * 0.01) * 0.5
      p.rotate += 1
      if (p.y > petCvs.height) p.y = -10
    })

    animationId = requestAnimationFrame(animate)
  }
  animate()
  window.addEventListener('resize', resize)
})

onUnmounted(() => {
  if (animationId) cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.plum-snow-bg {
  position: absolute;
  inset: 0;
  overflow: hidden;
}
.bg-image {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
  z-index: 0;
}
.bg-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(20, 24, 36, 0.25) 0%,
    rgba(20, 24, 36, 0.1) 50%,
    rgba(20, 24, 36, 0.35) 100%
  );
  z-index: 1;
}
.snow-canvas,
.petal-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}
.snow-canvas { z-index: 2; }
.petal-canvas { z-index: 3; }
@media (max-width: 768px) {
  .bg-image { background-position: 60% center; }
}
</style>
