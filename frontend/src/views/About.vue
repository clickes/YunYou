<template>
  <div class="about-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title title-font">关于我</h1>
        <p class="page-subtitle">墨客名片 · 学人传记</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="about-layout">
        <div class="about-main">
          <div class="profile-section card">
            <div class="profile-header">
              <div class="profile-avatar-lg">
                <span class="avatar-text title-font">云</span>
                <div class="avatar-ring"></div>
              </div>
              <div class="profile-info">
                <h2 class="profile-name title-font">云游</h2>
                <p class="profile-title">全栈开发者 / 古风爱好者</p>
                <div class="profile-badges">
                  <span class="badge">Vue 3</span>
                  <span class="badge">SpringBoot</span>
                  <span class="badge">TypeScript</span>
                  <span class="badge">Docker</span>
                </div>
              </div>
            </div>
            <div class="profile-bio">
              <h3 class="bio-title title-font">个人简介</h3>
              <div class="bio-content">
                <p>你好，我是云游，一名热爱编程的全栈开发者。</p>
                <p>目前主要从事 Web 开发工作，技术栈涵盖前端 Vue 生态和后端 SpringBoot 生态。喜欢探索新技术，也喜欢将学到的知识整理成文章分享出来。</p>
                <p>除了编程，我还对古典文学、中国风设计、传统文化很感兴趣。这个博客就是我将技术与兴趣结合的产物——以代码为笔，以文字为墨，记录生活与学习。</p>
                <p>愿你我都能在代码与生活中，找到属于自己的方向。</p>
              </div>
            </div>
          </div>

          <div class="skills-section card">
            <h3 class="section-title title-font">学识造诣</h3>
            <div class="skills-list">
              <div v-for="skill in skills" :key="skill.name" class="skill-item">
                <div class="skill-header">
                  <span class="skill-name">{{ skill.name }}</span>
                  <span class="skill-level">{{ skill.level }}</span>
                </div>
                <div class="skill-bar">
                  <div class="skill-fill" :style="{ width: skill.percent + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

          <div class="timeline-section card">
            <h3 class="section-title title-font">求学历程</h3>
            <div class="timeline">
              <div v-for="(item, index) in timeline" :key="index" class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-content">
                  <span class="timeline-date">{{ item.date }}</span>
                  <h4 class="timeline-title">{{ item.title }}</h4>
                  <p class="timeline-desc">{{ item.desc }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="about-sidebar">
          <div class="info-card card">
            <h4 class="card-title title-font">基本信息</h4>
            <ul class="info-list">
              <li><span class="info-label">昵称</span><span class="info-value">云游</span></li>
              <li><span class="info-label">职业</span><span class="info-value">全栈开发</span></li>
              <li><span class="info-label">坐标</span><span class="info-value">中国·沧州</span></li>
              <li><span class="info-label">状态</span><span class="info-value status-online">在线学习中</span></li>
            </ul>
          </div>

          <div class="contact-card card">
            <h4 class="card-title title-font">联系方式</h4>
            <div class="contact-list">
              <a href="#" class="contact-item"><span class="contact-icon">📧</span><span class="contact-text">contact@yunyou.blog</span></a>
              <a href="#" class="contact-item"><span class="contact-icon">🐙</span><span class="contact-text">GitHub</span></a>
              <a href="#" class="contact-item"><span class="contact-icon">📱</span><span class="contact-text">微博</span></a>
              <a href="#" class="contact-item"><span class="contact-icon">📡</span><span class="contact-text">RSS 订阅</span></a>
            </div>
          </div>

          <div class="stats-card card">
            <h4 class="card-title title-font">博客统计</h4>
            <div class="stats-grid">
              <div class="stat-box"><span class="stat-num title-font">{{ articleCount }}</span><span class="stat-label">文章</span></div>
              <div class="stat-box"><span class="stat-num title-font">{{ categoryCount }}</span><span class="stat-label">分类</span></div>
              <div class="stat-box"><span class="stat-num title-font">{{ tagCount }}</span><span class="stat-label">标签</span></div>
              <div class="stat-box"><span class="stat-num title-font">{{ totalDays }}</span><span class="stat-label">运行</span></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { articles, categories, tags } from '../mock/data'
import { useAppStore } from '../stores/app'

const appStore = useAppStore()
const articleCount = computed(() => articles.length)
const categoryCount = computed(() => categories.length)
const tagCount = computed(() => tags.length)
const totalDays = computed(() => appStore.userData.totalDays || 100)

const skills = [
  { name: 'Vue / 前端开发', level: '精通', percent: 75 },
  { name: 'SpringBoot / 后端开发', level: '熟练', percent: 65 },
  { name: 'TypeScript / JavaScript', level: '精通', percent: 70 },
  { name: 'MySQL / 数据库', level: '熟练', percent: 55 },
  { name: 'Docker / 运维部署', level: '掌握', percent: 45 },
  { name: 'UI 设计 / 古风审美', level: '熟练', percent: 50 }
]

const timeline = [
  { date: '2024.08', title: '云游博客上线', desc: '基于 Vue 3 + SpringBoot 搭建的个人博客正式上线，开启以代码为笔、以文字为墨的记录之旅。' },
  { date: '2023.06', title: '转向全栈开发', desc: '从前端开发转向全栈，开始系统学习后端技术和数据库。' },
  { date: '2022.03', title: '入门前端开发', desc: '开始学习 HTML/CSS/JavaScript，随后接触 Vue 框架，踏入编程世界。' },
  { date: '2021.09', title: '大学时光', desc: '计算机专业入学，开始系统学习计算机基础知识。' }
]
</script>

<style scoped>
.about-page { min-height: 100vh; }

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
.page-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-top: 15px;
  font-family: var(--font-kai);
  letter-spacing: 4px;
}

.page-body { padding: 50px 20px 70px; }
.about-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 30px;
}
.about-main {
  display: flex;
  flex-direction: column;
  gap: 26px;
  min-width: 0;
}

/* 卡片样式 */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 32px;
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

/* 个人资料 */
.profile-header {
  display: flex;
  gap: 28px;
  margin-bottom: 32px;
  padding-bottom: 26px;
  border-bottom: 1px solid var(--border-color);
}
.profile-avatar-lg {
  position: relative;
  width: 110px;
  height: 110px;
  flex-shrink: 0;
}
.avatar-text {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-shilu), var(--accent-gold), var(--accent-red));
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.8rem;
  color: #fff;
  position: relative;
  z-index: 1;
  box-shadow: 0 4px 15px rgba(0,0,0,0.15);
}
.avatar-ring {
  position: absolute;
  top: -6px;
  left: -6px;
  right: -6px;
  bottom: -6px;
  border: 2px solid var(--accent-gold);
  border-radius: 50%;
  animation: rotate 10s linear infinite;
  border-top-color: transparent;
  border-right-color: transparent;
}
@keyframes rotate { to { transform: rotate(360deg); } }
.profile-info { flex: 1; }
.profile-name {
  font-size: 2rem;
  color: var(--title-color);
  margin-bottom: 6px;
  letter-spacing: 5px;
}
.profile-title {
  color: var(--text-secondary);
  margin-bottom: 14px;
  font-family: var(--font-kai);
  letter-spacing: 2px;
}
.profile-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.badge {
  padding: 4px 12px;
  background: var(--bg-secondary);
  border-radius: 15px;
  font-size: 0.82rem;
  color: var(--accent-shilu);
  font-family: var(--font-kai);
  border: 1px solid var(--border-light);
  transition: all var(--transition-fast);
}
.badge:hover {
  background: var(--accent-shilu);
  color: #fff;
  transform: translateY(-2px);
}
.bio-title {
  font-size: 1.4rem;
  color: var(--title-color);
  margin-bottom: 18px;
  letter-spacing: 3px;
  padding-left: 14px;
  border-left: 4px solid var(--accent-gold);
}
.bio-content p {
  color: var(--text-secondary);
  line-height: 2.1;
  margin-bottom: 14px;
  text-indent: 2em;
}

/* 区块标题 */
.section-title {
  font-size: 1.5rem;
  color: var(--title-color);
  margin-bottom: 26px;
  padding-bottom: 14px;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: 4px;
  position: relative;
}
.section-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 80px;
  height: 2px;
  background: var(--accent-gold);
}

/* 技能条 */
.skills-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.skill-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.skill-name {
  color: var(--text-primary);
  font-size: 0.98rem;
  font-family: var(--font-kai);
}
.skill-level {
  color: var(--accent-red);
  font-size: 0.85rem;
  font-family: var(--font-title);
  letter-spacing: 2px;
}
.skill-bar {
  height: 10px;
  background: var(--bg-tertiary);
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid var(--border-light);
}
.skill-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--accent-shilu), var(--accent-gold), var(--accent-red));
  border-radius: 5px;
  transition: width 1.2s ease;
  box-shadow: 0 0 8px rgba(201, 168, 76, 0.3);
}

/* 时间线 */
.timeline {
  position: relative;
  padding-left: 28px;
}
.timeline::before {
  content: '';
  position: absolute;
  left: 8px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom,
    var(--accent-gold),
    var(--accent-shilu),
    var(--accent-jade),
    transparent);
}
.timeline-item {
  position: relative;
  margin-bottom: 28px;
}
.timeline-item:last-child { margin-bottom: 0; }
.timeline-dot {
  position: absolute;
  left: -24px;
  top: 4px;
  width: 14px;
  height: 14px;
  background: var(--accent-gold);
  border-radius: 50%;
  border: 3px solid var(--bg-card);
}
.timeline-date {
  font-size: 0.85rem;
  color: var(--accent-gold);
  font-family: var(--font-kai);
}
.timeline-title {
  font-size: 1.05rem;
  color: var(--title-color);
  margin: 4px 0;
}
.timeline-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
}
.about-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.card-title {
  font-size: 1.1rem;
  color: var(--title-color);
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px dashed var(--border-color);
  letter-spacing: 3px;
}
.info-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.info-list li {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
}
.info-label { color: var(--text-muted); }
.info-value { color: var(--text-primary); }
.status-online { color: var(--accent-jade); }
.status-online::before {
  content: '';
  display: inline-block;
  width: 8px;
  height: 8px;
  background: var(--accent-jade);
  border-radius: 50%;
  margin-right: 6px;
  animation: glow 1.5s ease-in-out infinite;
}
.contact-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  background: var(--bg-tertiary);
  border-radius: var(--radius);
  text-decoration: none;
  color: var(--text-secondary);
  transition: all var(--transition-fast);
}
.contact-item:hover {
  background: var(--accent-red);
  color: #fff;
  transform: translateX(4px);
}
.contact-icon { font-size: 1.1rem; }
.contact-text { font-size: 0.85rem; }
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.stat-box {
  text-align: center;
  padding: 16px 8px;
  background: var(--bg-tertiary);
  border-radius: var(--radius);
}
.stat-num {
  display: block;
  font-size: 1.5rem;
  color: var(--accent-red);
  margin-bottom: 4px;
}
.stat-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-kai);
}
@media (max-width: 900px) {
  .about-layout { grid-template-columns: 1fr; }
  .about-sidebar { order: -1; }
}
@media (max-width: 600px) {
  .profile-header { flex-direction: column; text-align: center; }
  .profile-avatar-lg { margin: 0 auto; }
  .profile-badges { justify-content: center; }
}
</style>
