<template>
  <footer class="footer">
    <CloudRiver />
    <div class="footer-content">
      <div class="footer-grid">
        <div class="footer-section">
          <h4 class="footer-title title-font">关于云游</h4>
          <p class="footer-desc">一个记录技术、生活与感悟的个人博客。<br/>愿你我都能在代码与生活中，找到属于自己的道。</p>
          <div class="footer-seal">
            <span class="seal-text">云游之印</span>
          </div>
        </div>
        <div class="footer-section">
          <h4 class="footer-title title-font">快速导航</h4>
          <ul class="footer-links">
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/category">分类</router-link></li>
            <li><router-link to="/tag">标签</router-link></li>
            <li><router-link to="/archive">归档</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4 class="footer-title title-font">更多</h4>
          <ul class="footer-links">
            <li><router-link to="/about">关于我</router-link></li>
            <li><router-link to="/friends">友情链接</router-link></li>
            <li><a href="#" @click.prevent="openSearch">站内搜索</a></li>
            <li><a href="/rss.xml" target="_blank">RSS 订阅</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4 class="footer-title title-font">联系方式</h4>
          <div class="footer-social">
            <a href="#" class="social-icon" title="GitHub">🐙</a>
            <a href="#" class="social-icon" title="邮箱">📧</a>
            <a href="#" class="social-icon" title="微博">📱</a>
            <a href="#" class="social-icon" title="RSS">📡</a>
          </div>
          <p class="footer-email">contact@yunyou.blog</p>
        </div>
      </div>
      <div class="footer-poem">
        <span class="poem-decoration left">❖</span>
        <span class="poem-text title-font">{{ currentPoem }}</span>
        <span class="poem-decoration right">❖</span>
      </div>
      <div class="footer-bottom">
        <p>© {{ currentYear }} 云游博客 · 保留所有权利</p>
        <p class="footer-icp">
          <a href="#" target="_blank">冀ICP备XXXXXXXX号</a>
          <span class="separator">|</span>
          <span>Powered by Vue 3 + SpringBoot</span>
        </p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { ref, computed, inject, onMounted } from 'vue'
import { getRandomPoem } from '../../mock/data'
import CloudRiver from './CloudRiver.vue'

const searchState = inject('searchState')
const openSearch = () => searchState.openSearch()

const currentPoem = ref('')
const currentYear = computed(() => new Date().getFullYear())
const mountainColor = computed(() => {
  const theme = document.documentElement.getAttribute('data-theme')
  return theme === 'dark' ? '#D4AF37' : '#2C2C2C'
})

onMounted(() => {
  currentPoem.value = getRandomPoem()
})
</script>

<style scoped>
.footer {
  position: relative;
  margin-top: 60px;
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  overflow: hidden;
}
.footer-mountain {
  position: relative;
  height: 80px;
  overflow: hidden;
}
.mountain-svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.footer-content {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 20px 30px;
}
.footer-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1.5fr;
  gap: 40px;
  margin-bottom: 30px;
}
.footer-section { min-width: 0; }
.footer-title {
  font-size: 1.2rem;
  color: var(--title-color);
  margin-bottom: 16px;
  position: relative;
  padding-bottom: 10px;
  letter-spacing: 4px;
}
.footer-title::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--accent-gold);
}
.footer-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 16px;
}
.footer-seal {
  display: inline-block;
}
.seal-text {
  display: inline-block;
  padding: 6px 12px;
  background: var(--accent-red);
  color: #fff;
  font-family: var(--font-title);
  font-size: 0.85rem;
  letter-spacing: 4px;
  border-radius: 2px;
  transform: rotate(-2deg);
  box-shadow: 1px 1px 3px rgba(0,0,0,0.2);
}
.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.footer-links a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all var(--transition-fast);
  font-family: var(--font-kai);
  letter-spacing: 1px;
}
.footer-links a:hover {
  color: var(--accent-red);
  padding-left: 6px;
}
.footer-social {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}
.social-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--border-color);
  border-radius: 2px;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all var(--transition-fast);
}
.social-icon:hover {
  border-color: var(--accent-red);
  background: var(--accent-red);
  color: #fff;
  transform: translateY(-2px);
}
.footer-email {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.footer-poem {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  padding: 24px 0;
  border-top: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  margin-bottom: 20px;
}
.poem-decoration {
  color: var(--accent-gold);
  font-size: 0.8rem;
}
.poem-text {
  font-size: 1.1rem;
  color: var(--text-secondary);
  letter-spacing: 4px;
}
.footer-bottom {
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}
.footer-bottom p { margin: 6px 0; }
.footer-icp a {
  color: var(--text-muted);
  text-decoration: none;
}
.footer-icp a:hover { color: var(--accent-red); }
.separator { margin: 0 8px; }
@media (max-width: 900px) {
  .footer-grid { grid-template-columns: 1fr 1fr; gap: 30px; }
}
@media (max-width: 600px) {
  .footer-grid { grid-template-columns: 1fr; gap: 25px; }
  .poem-text { font-size: 0.95rem; letter-spacing: 2px; }
  .footer-poem { gap: 10px; }
}
</style>
