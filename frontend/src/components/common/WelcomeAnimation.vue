<template>
  <transition name="welcome-fade">
    <div v-if="visible" class="welcome-overlay" @click="skip">
      <!-- 背景图 -->
      <div class="bg-layer">
        <div class="bg-image"></div>
        <div class="bg-overlay"></div>
      </div>

      <!-- 月亮光晕 -->
      <div class="moon-glow"></div>

      <!-- 山间云雾 -->
      <div class="mountain-fog">
        <div class="fog fog-1"></div>
        <div class="fog fog-2"></div>
        <div class="fog fog-3"></div>
      </div>

      <!-- 水面波光 -->
      <div class="water-shimmer">
        <div class="shimmer-line s1"></div>
        <div class="shimmer-line s2"></div>
        <div class="shimmer-line s3"></div>
        <div class="shimmer-line s4"></div>
      </div>

      <!-- 闪烁星星 -->
      <div class="stars-layer">
        <div v-for="i in 40" :key="i" class="star" :style="getStarStyle(i)"></div>
      </div>

      <!-- 萤火虫光点 -->
      <div class="fireflies-layer">
        <div v-for="i in 12" :key="i" class="firefly" :style="getFireflyStyle(i)"></div>
      </div>

      <!-- 内容区域 -->
      <div class="content-layer">
        <div class="welcome-content" :class="{ show: phase >= 1 }">
          <!-- 顶部装饰 -->
          <div class="top-decoration">
            <span class="deco-line"></span>
            <span class="deco-icon">☾</span>
            <span class="deco-line"></span>
          </div>

          <!-- 主标题 -->
          <h1 class="main-title">
            <span v-for="(char, i) in titleChars" :key="i" class="title-char" :style="{ animationDelay: (0.1 * i) + 's' }">{{ char }}</span>
          </h1>

          <!-- 副标题 -->
          <p class="sub-title">
            <span class="sub-text" :style="{ animationDelay: '0.6s' }">且将新火试新茶 · 诗酒趁年华</span>
          </p>

          <!-- 诗句 -->
          <div class="poem-area" :class="{ show: phase >= 2 }">
            <p class="poem-line">春江潮水连海平</p>
            <p class="poem-line">海上明月共潮生</p>
          </div>

          <!-- 底部装饰 -->
          <div class="bottom-decoration">
            <span class="deco-line"></span>
            <span class="deco-icon">☽</span>
            <span class="deco-line"></span>
          </div>
        </div>

        <!-- 加载进度 -->
        <div class="loading-area" :class="{ show: phase >= 1 }">
          <div class="loading-bar">
            <div class="loading-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="loading-text">{{ loadingText }}</span>
        </div>

        <!-- 跳过提示 -->
        <div class="skip-hint" :class="{ show: phase >= 2 }">
          <span class="skip-text">点击任意处进入</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'

const props = defineProps({
  showOnce: { type: Boolean, default: false },
  duration: { type: Number, default: 5000 }
})

const emit = defineEmits(['complete'])

const visible = ref(false)
const phase = ref(0)
const progress = ref(0)
let progressTimer = null
let autoTimer = null

const titleChars = computed(() => '云游博客'.split(''))
const loadingTexts = ['正在加载...', '加载中...', '即将进入...', '欢迎来到云游博客']
const loadingText = computed(() => {
  if (progress.value < 30) return loadingTexts[0]
  if (progress.value < 60) return loadingTexts[1]
  if (progress.value < 90) return loadingTexts[2]
  return loadingTexts[3]
})

const getStarStyle = (i) => {
  const left = Math.random() * 100
  const top = Math.random() * 50
  const delay = Math.random() * 3
  const duration = 2 + Math.random() * 3
  const size = 1 + Math.random() * 2
  return {
    left: left + '%',
    top: top + '%',
    animationDelay: delay + 's',
    animationDuration: duration + 's',
    width: size + 'px',
    height: size + 'px'
  }
}

const getFireflyStyle = (i) => {
  const left = (i * 8 + Math.random() * 5) % 100
  const delay = Math.random() * 10
  const duration = 8 + Math.random() * 8
  const size = 3 + Math.random() * 4
  return {
    left: left + '%',
    bottom: '20%',
    animationDelay: delay + 's',
    animationDuration: duration + 's',
    width: size + 'px',
    height: size + 'px'
  }
}

const skip = () => {
  if (progressTimer) clearInterval(progressTimer)
  if (autoTimer) clearTimeout(autoTimer)
  finish()
}

const finish = () => {
  visible.value = false
  if (props.showOnce) {
    localStorage.setItem('welcome-shown', 'true')
  }
  emit('complete')
}

onMounted(() => {
  if (props.showOnce && localStorage.getItem('welcome-shown')) return

  visible.value = true
  phase.value = 1

  // 进度条动画
  const startTime = Date.now()
  progressTimer = setInterval(() => {
    const elapsed = Date.now() - startTime
    progress.value = Math.min((elapsed / (props.duration * 0.8)) * 100, 100)
    if (progress.value >= 100) {
      clearInterval(progressTimer)
    }
  }, 50)

  // 诗句淡入
  setTimeout(() => { phase.value = 2 }, 1000)

  // 自动消失
  autoTimer = setTimeout(() => finish(), props.duration)
})

onUnmounted(() => {
  if (progressTimer) clearInterval(progressTimer)
  if (autoTimer) clearTimeout(autoTimer)
})
</script>

<style scoped>
.welcome-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  overflow: hidden;
  cursor: none;
}

/* 背景层 */
.bg-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('/welcome-bg.jpg');
  background-size: cover;
  background-position: center;
  animation: bgSlowZoom 25s ease-in-out infinite alternate;
}
@keyframes bgSlowZoom {
  0% { transform: scale(1); }
  100% { transform: scale(1.05); }
}
.bg-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 20, 40, 0.1) 0%,
    rgba(10, 20, 40, 0.05) 40%,
    rgba(10, 20, 40, 0.15) 70%,
    rgba(5, 10, 25, 0.3) 100%
  );
}

/* 月亮光晕 */
.moon-glow {
  position: absolute;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255,255,220,0.15) 0%, rgba(255,255,200,0.05) 50%, transparent 70%);
  border-radius: 50%;
  animation: moonPulse 4s ease-in-out infinite;
  pointer-events: none;
}
@keyframes moonPulse {
  0%, 100% { opacity: 0.6; transform: translateX(-50%) scale(1); }
  50% { opacity: 1; transform: translateX(-50%) scale(1.1); }
}

/* 山间云雾 */
.mountain-fog {
  position: absolute;
  top: 30%;
  left: 0;
  right: 0;
  height: 40%;
  pointer-events: none;
}
.fog {
  position: absolute;
  background: linear-gradient(90deg, transparent, rgba(200,210,220,0.15), transparent);
  border-radius: 50%;
  animation: fogDrift linear infinite;
}
.fog-1 {
  top: 10%;
  width: 400px;
  height: 40px;
  left: -200px;
  animation-duration: 20s;
}
.fog-2 {
  top: 30%;
  width: 500px;
  height: 50px;
  left: -250px;
  animation-duration: 25s;
  animation-delay: -8s;
}
.fog-3 {
  top: 50%;
  width: 350px;
  height: 35px;
  left: -180px;
  animation-duration: 18s;
  animation-delay: -14s;
}
@keyframes fogDrift {
  from { transform: translateX(0); }
  to { transform: translateX(calc(100vw + 500px)); }
}

/* 水面波光 */
.water-shimmer {
  position: absolute;
  bottom: 25%;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  height: 100px;
  pointer-events: none;
}
.shimmer-line {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(255,255,220,0.4), transparent);
  border-radius: 2px;
  animation: shimmerPulse 3s ease-in-out infinite;
}
.s1 { width: 100%; bottom: 20%; animation-delay: 0s; }
.s2 { width: 70%; bottom: 45%; animation-delay: -1s; }
.s3 { width: 50%; bottom: 65%; animation-delay: -2s; }
.s4 { width: 85%; bottom: 85%; animation-delay: -1.5s; }
@keyframes shimmerPulse {
  0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleX(1); }
  50% { opacity: 0.8; transform: translateX(-50%) scaleX(1.1); }
}

/* 星星 */
.stars-layer {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 60%;
  pointer-events: none;
}
.star {
  position: absolute;
  background: #fff;
  border-radius: 50%;
  opacity: 0;
  animation: starTwinkle ease-in-out infinite;
  box-shadow: 0 0 3px rgba(255,255,255,0.8);
}
@keyframes starTwinkle {
  0%, 100% { opacity: 0; transform: scale(0.5); }
  50% { opacity: 1; transform: scale(1); }
}

/* 萤火虫 */
.fireflies-layer {
  position: absolute;
  bottom: 15%;
  left: 0;
  right: 0;
  height: 40%;
  pointer-events: none;
}
.firefly {
  position: absolute;
  background: radial-gradient(circle, rgba(255,255,180,0.9) 0%, rgba(255,255,150,0.4) 50%, transparent 100%);
  border-radius: 50%;
  opacity: 0;
  animation: fireflyFloat ease-in-out infinite;
  filter: blur(1px);
}
@keyframes fireflyFloat {
  0% { opacity: 0; transform: translateY(0) translateX(0); }
  20% { opacity: 0.8; }
  50% { transform: translateY(-30px) translateX(20px); }
  80% { opacity: 0.8; }
  100% { opacity: 0; transform: translateY(-60px) translateX(-20px); }
}

/* 内容层 */
.content-layer {
  position: relative;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.welcome-content {
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 1s ease, transform 1s ease;
  padding: 0 20px;
}
.welcome-content.show {
  opacity: 1;
  transform: translateY(0);
}

/* 装饰 */
.top-decoration, .bottom-decoration {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 15px 0;
}
.deco-line {
  width: 60px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(200,200,180,0.5), transparent);
}
.deco-icon {
  color: rgba(220,220,200,0.7);
  font-size: 1.2rem;
  animation: iconGlow 3s ease-in-out infinite;
}
@keyframes iconGlow {
  0%, 100% { opacity: 0.6; text-shadow: 0 0 5px rgba(255,255,200,0.3); }
  50% { opacity: 1; text-shadow: 0 0 15px rgba(255,255,200,0.6); }
}

/* 主标题 */
.main-title {
  font-size: 3.5rem;
  color: #F0EDE0;
  letter-spacing: 15px;
  margin: 10px 0;
  font-weight: 500;
  text-shadow: 0 2px 15px rgba(0,0,0,0.5), 0 0 30px rgba(255,255,200,0.2);
  font-family: 'Ma Shan Zheng', 'KaiTi', serif;
}
.title-char {
  display: inline-block;
  opacity: 0;
  animation: titleCharIn 0.8s ease-out forwards;
}
@keyframes titleCharIn {
  0% { opacity: 0; transform: translateY(-20px) scale(0.8); filter: blur(4px); }
  100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
}

/* 副标题 */
.sub-title {
  margin: 10px 0;
}
.sub-text {
  display: inline-block;
  font-size: 1.1rem;
  color: rgba(220,220,210,0.85);
  letter-spacing: 6px;
  opacity: 0;
  animation: subTextIn 0.8s ease-out forwards;
  font-family: 'KaiTi', serif;
  text-shadow: 0 1px 5px rgba(0,0,0,0.5);
}
@keyframes subTextIn {
  0% { opacity: 0; transform: translateY(10px); }
  100% { opacity: 1; transform: translateY(0); }
}

/* 诗句 */
.poem-area {
  margin: 20px 0;
  opacity: 0;
  transform: translateY(10px);
  transition: opacity 1s ease, transform 1s ease;
}
.poem-area.show {
  opacity: 1;
  transform: translateY(0);
}
.poem-line {
  font-size: 1rem;
  color: rgba(200,200,190,0.75);
  letter-spacing: 4px;
  margin: 6px 0;
  font-family: 'KaiTi', serif;
  font-style: italic;
  text-shadow: 0 1px 5px rgba(0,0,0,0.5);
}

/* 加载区域 */
.loading-area {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  opacity: 0;
  transition: opacity 0.8s ease;
  width: 280px;
}
.loading-area.show { opacity: 1; }
.loading-bar {
  width: 100%;
  height: 2px;
  background: rgba(200,200,180,0.2);
  border-radius: 1px;
  overflow: hidden;
  margin-bottom: 10px;
}
.loading-fill {
  height: 100%;
  background: linear-gradient(90deg, rgba(200,200,180,0.5), rgba(255,255,220,0.9), rgba(200,200,180,0.5));
  border-radius: 1px;
  transition: width 0.1s linear;
  box-shadow: 0 0 8px rgba(255,255,200,0.4);
}
.loading-text {
  font-size: 0.8rem;
  color: rgba(200,200,190,0.6);
  letter-spacing: 3px;
  font-family: 'KaiTi', serif;
}

/* 跳过提示 */
.skip-hint {
  position: absolute;
  bottom: 25px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  opacity: 0;
  transition: opacity 0.8s ease;
}
.skip-hint.show { opacity: 1; }
.skip-text {
  display: block;
  font-size: 0.8rem;
  color: rgba(200,200,190,0.5);
  letter-spacing: 4px;
  margin-bottom: 8px;
  font-family: 'KaiTi', serif;
  animation: skipBlink 2s ease-in-out infinite;
}
@keyframes skipBlink {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
.skip-arrow {
  font-size: 1rem;
  color: rgba(200,200,180,0.6);
  animation: arrowBounce 1.5s ease-in-out infinite;
}
@keyframes arrowBounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(5px); }
}

/* 过渡 */
.welcome-fade-leave-active {
  transition: opacity 1s ease, transform 1s ease;
}
.welcome-fade-leave-to {
  opacity: 0;
  transform: scale(1.03);
}

@media (max-width: 768px) {
  .main-title {
    font-size: 2.2rem;
    letter-spacing: 10px;
  }
  .sub-text {
    font-size: 0.9rem;
    letter-spacing: 4px;
  }
  .deco-line { width: 40px; }
  .poem-line { font-size: 0.85rem; letter-spacing: 3px; }
  .loading-area { width: 220px; bottom: 70px; }
  .moon-glow { width: 150px; height: 150px; }
}
</style>
