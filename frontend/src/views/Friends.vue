<template>
  <div class="friends-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title title-font">友情链接</h1>
        <div class="title-lotus">
          <svg width="80" height="16" viewBox="0 0 80 16" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#C9A84C" stroke-width="1" fill="none" opacity="0.7">
              <path d="M0 8 Q13 2 26 8 Q40 14 53 8 Q66 2 80 8" />
              <circle cx="40" cy="8" r="2.5" fill="#B84A3A" opacity="0.8" />
            </g>
          </svg>
        </div>
        <p class="page-subtitle">墨客联盟 · 文友互助</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="friends-intro card">
        <p>欢迎来到云游的友链页面！这里收录了一些优秀的博客和网站，都是值得拜访的文友。</p>
        <p>如果你也想交换友链，欢迎通过邮箱联系我，备注"友链交换"即可。</p>
      </div>
      <div v-for="(group, category) in groupedFriends" :key="category" class="friend-group">
        <h2 class="group-title title-font">
          <span class="group-icon">🏮</span>
          {{ category }}
        </h2>
        <div class="friend-grid">
          <a v-for="friend in group" :key="friend.id" :href="friend.url" target="_blank" class="friend-card">
            <div class="friend-corner"></div>
            <div class="friend-avatar">
              <span class="avatar-letter title-font">{{ friend.name.charAt(0) }}</span>
            </div>
            <div class="friend-info">
              <h3 class="friend-name">{{ friend.name }}</h3>
              <p class="friend-desc">{{ friend.desc }}</p>
            </div>
            <div class="friend-arrow">→</div>
          </a>
        </div>
      </div>
      <div class="apply-section card">
        <h3 class="apply-title title-font">申请友链</h3>
        <div class="apply-info">
          <div class="apply-item">
            <span class="apply-label">站点名称</span>
            <span class="apply-value">云游博客</span>
          </div>
          <div class="apply-item">
            <span class="apply-label">站点地址</span>
            <span class="apply-value">https://yunyou.blog</span>
          </div>
          <div class="apply-item">
            <span class="apply-label">站点描述</span>
            <span class="apply-value">以代码为笔，记录学习生活的点滴感悟</span>
          </div>
          <div class="apply-item">
            <span class="apply-label">联系方式</span>
            <span class="apply-value">contact@yunyou.blog</span>
          </div>
        </div>
        <div class="apply-tip">
          <p>申请友链请在邮件中附上你的站点名称、地址、描述和头像，我会尽快回复并添加。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { friends } from '../mock/data'
const groupedFriends = computed(() => {
  const result = {}
  friends.forEach(f => {
    if (!result[f.category]) result[f.category] = []
    result[f.category].push(f)
  })
  return result
})
</script>

<style scoped>
.friends-page { min-height: 100vh; }

/* 页面头部 */
.page-header {
  padding: 80px 0 50px;
  background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary));
  text-align: center;
  position: relative;
  overflow: hidden;
}
.page-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 5px;
  background: linear-gradient(90deg,
    var(--accent-shilu),
    var(--accent-gold),
    var(--accent-lianban),
    var(--accent-gold),
    var(--accent-jade));
}
.page-title {
  font-size: 2.5rem;
  color: var(--title-color);
  letter-spacing: 8px;
  margin-bottom: 15px;
}
.title-lotus {
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
}
.page-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-top: 15px;
  font-family: var(--font-kai);
  letter-spacing: 4px;
}

.page-body {
  padding: 50px 20px 70px;
  max-width: 1000px;
}

/* 卡片样式 */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 32px;
  margin-bottom: 45px;
  position: relative;
  box-shadow: 0 3px 15px var(--shadow-color);
}
.card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg,
    var(--accent-shilu),
    var(--accent-gold),
    var(--accent-lianban),
    var(--accent-gold),
    var(--accent-jade));
  opacity: 0.6;
  border-radius: var(--radius) var(--radius) 0 0;
}

.friends-intro p {
  color: var(--text-secondary);
  line-height: 1.9;
  margin-bottom: 10px;
  text-indent: 2em;
}

.friend-group { margin-bottom: 55px; }
.group-title {
  font-size: 1.6rem;
  color: var(--title-color);
  margin-bottom: 28px;
  display: flex;
  align-items: center;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: 4px;
  position: relative;
}
.group-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 80px;
  height: 2px;
  background: var(--accent-gold);
}
.group-icon { font-size: 1.4rem; }

/* 友链卡片网格 */
.friend-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 18px;
}
.friend-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 22px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  text-decoration: none;
  transition: all var(--transition-normal);
  position: relative;
  overflow: hidden;
}
.friend-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(201, 168, 76, 0.1), transparent);
  transition: left 0.6s ease;
}
.friend-card:hover {
  transform: translateY(-4px);
  border-color: var(--accent-gold);
  box-shadow: 0 8px 28px var(--shadow-color);
}
.friend-card:hover::before { left: 100%; }

/* 卡片角花 */
.friend-corner {
  position: absolute;
  top: 0;
  left: 0;
  width: 18px;
  height: 18px;
  border-top: 2px solid var(--accent-gold);
  border-left: 2px solid var(--accent-gold);
  opacity: 0.5;
  transition: opacity var(--transition-fast);
}
.friend-card:hover .friend-corner { opacity: 1; }

.friend-avatar {
  flex-shrink: 0;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-shilu), var(--accent-gold), var(--accent-red));
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 10px rgba(0,0,0,0.15);
}
.avatar-letter {
  color: #fff;
  font-size: 1.4rem;
}
.friend-info {
  flex: 1;
  min-width: 0;
}
.friend-name {
  font-size: 1.05rem;
  color: var(--title-color);
  margin-bottom: 5px;
  font-family: var(--font-kai);
}
.friend-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.friend-arrow {
  color: var(--text-muted);
  font-size: 1.3rem;
  transition: all var(--transition-fast);
}
.friend-card:hover .friend-arrow {
  color: var(--accent-gold);
  transform: translateX(5px);
}

/* 申请友链区域 */
.apply-title {
  font-size: 1.5rem;
  color: var(--title-color);
  margin-bottom: 26px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: 4px;
  position: relative;
}
.apply-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 80px;
  height: 2px;
  background: var(--accent-gold);
}
.apply-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 18px;
  margin-bottom: 24px;
}
.apply-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 14px;
  background: var(--bg-secondary);
  border-radius: var(--radius);
  border-left: 3px solid var(--accent-gold);
}
.apply-label {
  font-size: 0.82rem;
  color: var(--text-muted);
  font-family: var(--font-kai);
  letter-spacing: 1px;
}
.apply-value {
  font-size: 0.98rem;
  color: var(--text-primary);
}
.apply-tip {
  padding: 18px;
  background: linear-gradient(135deg, rgba(201, 168, 76, 0.08), rgba(184, 74, 58, 0.05));
  border-radius: var(--radius);
  border-left: 4px solid var(--accent-gold);
}
.apply-tip p {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* 响应式 */
@media (max-width: 600px) {
  .apply-info { grid-template-columns: 1fr; }
  .friend-grid { grid-template-columns: 1fr; }
}
</style>
