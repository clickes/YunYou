<template>
  <canvas ref="canvasRef" class="cloud-river"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let ctx = null
let rafId = null
let width = 0, height = 0

// 三层祥云
const layers = [
  { speed: 0.4, opacity: 0.4, color: '#C8B8A2', offset: 0.3 }, // 远景最快
  { speed: 0.25, opacity: 0.6, color: '#D4C4B0', offset: 0.5 }, // 中景
  { speed: 0.12, opacity: 0.8, color: '#E6D5C3', offset: 0.7 },  // 近景最慢
]

// 锦鲤
let fish = []

function drawCloud(ctx, x, y, scale, color, opacity) {
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.fillStyle = color
  // 中式祥云：螺旋云头 + 云尾
  ctx.beginPath()
  ctx.arc(x, y, 14 * scale, 0, Math.PI * 2)
  ctx.arc(x + 16 * scale, y - 6 * scale, 11 * scale, 0, Math.PI * 2)
  ctx.arc(x + 32 * scale, y, 13 * scale, 0, Math.PI * 2)
  ctx.arc(x + 16 * scale, y + 4 * scale, 12 * scale, 0, Math.PI * 2)
  ctx.fill()
  // 云尾
  ctx.beginPath()
  ctx.moveTo(x - 20 * scale, y + 4 * scale)
  ctx.quadraticCurveTo(x - 40 * scale, y, x - 55 * scale, y + 6 * scale)
  ctx.quadraticCurveTo(x - 40 * scale, y + 10 * scale, x - 20 * scale, y + 6 * scale)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

function drawFish(ctx, f) {
  ctx.save()
  ctx.translate(f.x, f.y)
  ctx.rotate(f.rotation)
  ctx.globalAlpha = f.opacity
  const s = f.size

  // 鱼尾摆动
  const tailWave = Math.sin(f.wag * 0.15) * 0.4

  // 鱼身（椭圆）
  ctx.fillStyle = '#C0392B'
  ctx.strokeStyle = '#2C2C2C'
  ctx.lineWidth = 0.8
  ctx.beginPath()
  ctx.ellipse(0, 0, 14 * s, 6 * s, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // 鱼头
  ctx.beginPath()
  ctx.arc(12 * s, 0, 5 * s, 0, Math.PI * 2)
  ctx.fill()
  ctx.stroke()

  // 眼睛
  ctx.fillStyle = '#000'
  ctx.beginPath()
  ctx.arc(13 * s, -1.5 * s, 1 * s, 0, Math.PI * 2)
  ctx.fill()

  // 鱼尾（三角，摆动）
  ctx.fillStyle = '#C0392B'
  ctx.beginPath()
  ctx.moveTo(-12 * s, 0)
  ctx.lineTo(-22 * s, -5 * s + tailWave * 3 * s)
  ctx.lineTo(-22 * s, 5 * s + tailWave * 3 * s)
  ctx.closePath()
  ctx.fill()
  ctx.stroke()

  // 胸鳍
  ctx.beginPath()
  ctx.moveTo(0, 2 * s)
  ctx.lineTo(-5 * s, 7 * s)
  ctx.lineTo(-2 * s, 3 * s)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

function initFish() {
  fish = []
  for (let i = 0; i < 4; i++) {
    fish.push({
      x: Math.random() * width,
      y: height * (0.3 + Math.random() * 0.5),
      size: 0.7 + Math.random() * 0.6,
      speed: 0.8 + Math.random() * 0.7,
      opacity: 0.9,
      rotation: 0,
      wag: Math.random() * 100,
      jumpPhase: 0,
      jumpTimer: 300 + Math.random() * 500,
      baseY: 0,
      amplitude: 20 + Math.random() * 30,
      freq: 0.008 + Math.random() * 0.008,
      phase: Math.random() * Math.PI * 2,
    })
    fish[i].baseY = fish[i].y
  }
}

function resize() {
  const canvas = canvasRef.value
  width = canvas.parentElement.clientWidth
  height = 180
  canvas.width = width
  canvas.height = height
  canvas.style.width = width + 'px'
  canvas.style.height = height + 'px'
}

let tick = 0

function animate() {
  if (!ctx) return
  tick++
  ctx.clearRect(0, 0, width, height)

  // 画三层祥云
  layers.forEach((layer, idx) => {
    const yBase = height * layer.offset
    const spacing = 90
    const offset = (tick * layer.speed) % spacing
    for (let x = -spacing; x < width + spacing; x += spacing) {
      drawCloud(ctx, x - offset + spacing, yBase, 1, layer.color, layer.opacity)
    }
  })

  // 画鱼
  fish.forEach(f => {
    f.x += f.speed
    f.wag++

    // 正弦游动路径
    const swimY = f.baseY + Math.sin(tick * f.freq + f.phase) * f.amplitude * 0.3

    // 跳跃逻辑
    f.jumpTimer--
    if (f.jumpTimer <= 0 && f.jumpPhase === 0) {
      f.jumpPhase = 1
      f.jumpTimer = 200 + Math.random() * 200
    }
    let jumpOffset = 0
    if (f.jumpPhase > 0) {
      f.jumpPhase += 0.04
      if (f.jumpPhase < 1) {
        jumpOffset = -Math.sin(f.jumpPhase * Math.PI) * 25
      } else {
        f.jumpPhase = 0
      }
    }

    f.y = swimY + jumpOffset
    f.rotation = jumpOffset < -5 ? -0.2 : 0

    // 出屏回绕
    if (f.x > width + 40) {
      f.x = -40
      f.baseY = height * (0.3 + Math.random() * 0.5)
    }

    drawFish(ctx, f)
  })

  rafId = requestAnimationFrame(animate)
}

onMounted(() => {
  const canvas = canvasRef.value
  ctx = canvas.getContext('2d')
  resize()
  initFish()
  animate()
  window.addEventListener('resize', () => { resize(); initFish() })
})

onUnmounted(() => {
  if (rafId) cancelAnimationFrame(rafId)
})
</script>

<style scoped>
.cloud-river {
  display: block;
  width: 100%;
  height: 180px;
  position: relative;
  z-index: 1;
}
@media (max-width: 768px) {
  .cloud-river { height: 110px; }
}
</style>
