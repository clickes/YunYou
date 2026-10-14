<template>
  <div class="not-found-page">
    <div class="ink-bg">
      <div class="mist mist-1"></div>
      <div class="mist mist-2"></div>
      <div class="mist mist-3"></div>
      <div class="floating-particles">
        <span v-for="i in 12" :key="i" class="particle" :style="{ left: Math.random() * 100 + '%', animationDelay: Math.random() * 5 + 's', animationDuration: (5 + Math.random() * 5) + 's' }">❀</span>
      </div>
    </div>
    <div class="content">
      <div class="error-code title-font">404</div>
      <h1 class="error-title title-font">寻隐不遇</h1>
      <p class="error-desc">你所寻找的页面似乎藏在了云山深处...</p>
      <p class="error-hint">或许是链接有误，或许是这篇文章尚未问世。</p>
      <div class="error-actions">
        <router-link to="/" class="btn btn-primary"><span>🏠</span> 返回首页</router-link>
        <button class="btn" @click="goBack"><span>←</span> 原路返回</button>
      </div>
      <div class="poem-tip">
        <span class="tip-icon">📜</span>
        <span class="tip-text title-font">只在此山中，云深不知处</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const goBack = () => {
  if (window.history.length > 1) router.back()
  else router.push('/')
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
}
.ink-bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.mist {
  position: absolute;
  background: radial-gradient(ellipse, rgba(201, 169, 97, 0.08), transparent 70%);
  border-radius: 50%;
  filter: blur(40px);
}
.mist-1 { width: 400px; height: 400px; top: 10%; left: 10%; animation: float 8s ease-in-out infinite; }
.mist-2 { width: 500px; height: 500px; bottom: 10%; right: 10%; animation: float 10s ease-in-out infinite reverse; }
.mist-3 { width: 300px; height: 300px; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: float 6s ease-in-out infinite; }
.floating-particles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.particle {
  position: absolute;
  bottom: -20px;
  color: var(--accent-red);
  font-size: 0.8rem;
  animation: floatUp linear infinite;
  opacity: 0.5;
}
@keyframes floatUp {
  0% { transform: translateY(0) scale(0); opacity: 0; }
  20% { opacity: 0.6; }
  100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
}
.content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: 40px 20px;
  max-width: 600px;
}
.error-code {
  font-size: 8rem;
  color: var(--accent-gold);
  line-height: 1;
  margin-bottom: 20px;
  text-shadow: 0 0 30px rgba(201, 169, 97, 0.3);
  animation: glow 3s ease-in-out infinite;
}
.error-title {
  font-size: 2.5rem;
  color: var(--title-color);
  margin-bottom: 20px;
  letter-spacing: 8px;
}
.error-desc {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin-bottom: 10px;
  line-height: 1.8;
}
.error-hint {
  font-size: 0.95rem;
  color: var(--text-muted);
  margin-bottom: 40px;
}
.error-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius);
  color: var(--accent-gold);
  background: transparent;
  font-size: 1rem;
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
  font-family: var(--font-kai);
  letter-spacing: 2px;
}
.btn:hover {
  background: var(--accent-gold);
  color: var(--bg-primary);
  transform: translateY(-2px);
}
.btn-primary {
  background: var(--accent-red);
  border-color: var(--accent-red);
  color: #fff;
}
.btn-primary:hover {
  background: #8B1830;
  border-color: #8B1830;
  color: #fff;
}
.poem-tip {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 14px 28px;
  background: rgba(201, 169, 97, 0.1);
  border: 1px solid var(--accent-gold);
  border-radius: var(--radius);
}
.tip-icon {
  font-size: 1.2rem;
  animation: float 2s ease-in-out infinite;
}
.tip-text {
  font-size: 1rem;
  color: var(--accent-gold);
  letter-spacing: 4px;
}
@media (max-width: 600px) {
  .error-code { font-size: 5rem; }
  .error-title { font-size: 1.8rem; letter-spacing: 4px; }
  .error-actions { flex-direction: column; align-items: center; }
  .btn { width: 200px; justify-content: center; }
  .tip-text { font-size: 0.85rem; letter-spacing: 2px; }
}
</style>
