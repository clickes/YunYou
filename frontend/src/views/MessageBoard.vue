<template>
  <div class="message-board-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title title-font">留言板</h1>
        <p class="page-subtitle">闲言碎语 · 记录点滴</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="board-layout">
        <div class="board-main">
          <div class="post-form card">
            <h3 class="form-title title-font"><span class="title-icon">✍️</span> 留下只言片语</h3>
            <textarea v-model="newMessage" placeholder="此刻想说些什么..." class="message-input" rows="3" maxlength="200"></textarea>
            <div class="form-footer">
              <span class="char-count">{{ newMessage.length }}/200</span>
              <button class="btn btn-primary" @click="submitMessage" :disabled="!newMessage.trim()">发布留言</button>
            </div>
          </div>
          <div class="message-timeline">
            <div class="timeline-line"></div>
            <div v-for="(msg, index) in allMessages" :key="msg.id" class="message-item" :class="{ 'is-new': msg.isNew }">
              <div class="timeline-dot"><span class="dot-inner"></span></div>
              <div class="message-card">
                <div class="message-header">
                  <div class="message-avatar"><span class="avatar-letter">{{ msg.author.charAt(0) }}</span></div>
                  <div class="message-info">
                    <span class="message-author">{{ msg.author }}</span>
                    <span class="message-date">{{ formatDate(msg.date) }}</span>
                  </div>
                </div>
                <p class="message-content">{{ msg.content }}</p>
                <div class="message-footer">
                  <button class="message-action" @click="likeMessage(msg.id)">
                    <span>{{ msg.liked ? '❤️' : '🤍' }}</span>
                    <span>{{ msg.likes }}</span>
                  </button>
                  <button class="message-action" @click="replyTo(msg)">
                    <span>💬</span>
                    <span>回复</span>
                  </button>
                </div>
                <div v-if="msg.replies && msg.replies.length > 0" class="message-replies">
                  <div v-for="reply in msg.replies" :key="reply.id" class="reply-item">
                    <span class="reply-author">{{ reply.author }}：</span>
                    <span class="reply-content">{{ reply.content }}</span>
                  </div>
                </div>
                <div v-if="replyingTo === msg.id" class="reply-form">
                  <input v-model="replyContent" placeholder="写下回复..." class="reply-input" @keyup.enter="submitReply(msg.id)" />
                  <button class="btn btn-sm" @click="submitReply(msg.id)">回复</button>
                  <button class="btn btn-sm btn-cancel" @click="replyingTo = null">取消</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="board-sidebar">
          <div class="sidebar-card card">
            <h4 class="card-title title-font"><span class="title-icon">📊</span> 留言统计</h4>
            <div class="stats-grid">
              <div class="stat-box"><span class="stat-num title-font">{{ allMessages.length }}</span><span class="stat-label">留言</span></div>
              <div class="stat-box"><span class="stat-num title-font">{{ totalLikes }}</span><span class="stat-label">点赞</span></div>
            </div>
          </div>
          <div class="sidebar-card card">
            <h4 class="card-title title-font"><span class="title-icon">💡</span> 留言须知</h4>
            <ul class="tips-list">
              <li>欢迎留下你的想法和感悟</li>
              <li>留言仅保存在本地浏览器</li>
              <li>请文明发言，友善交流</li>
              <li>支持回复和点赞互动</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const defaultMessages = [
  { id: 1, author: '云游', content: '这个博客终于上线了，记录技术与生活的点滴。', date: '2024-08-20 10:30', likes: 12, liked: false, replies: [{ id: 101, author: '访客', content: '恭喜上线！' }] },
  { id: 2, author: '文友甲', content: '古风风格很有特色，雪景梅花背景太惊艳了。', date: '2024-08-21 14:20', likes: 8, liked: false, replies: [] },
  { id: 3, author: '云游', content: '今天研究了 Vue 3 组合式 API，自定义 Hook 真的很好用。', date: '2024-08-22 09:15', likes: 5, liked: false, replies: [] },
  { id: 4, author: '访客', content: '文章写得很详细，学到了很多，期待更多内容。', date: '2024-08-23 16:45', likes: 3, liked: false, replies: [] },
  { id: 5, author: '云游', content: '周末泡了一壶茶，看了一下午书，这样的日子真好。', date: '2024-08-24 15:00', likes: 7, liked: false, replies: [] }
]

const messages = ref([])
const newMessage = ref('')
const replyingTo = ref(null)
const replyContent = ref('')

const allMessages = computed(() => [...messages.value, ...defaultMessages].sort((a, b) => new Date(b.date) - new Date(a.date)))
const totalLikes = computed(() => allMessages.value.reduce((sum, m) => sum + m.likes, 0))

const submitMessage = () => {
  if (!newMessage.value.trim()) return
  messages.value.unshift({
    id: Date.now(),
    author: '访客',
    content: newMessage.value,
    date: new Date().toLocaleString('zh-CN'),
    likes: 0,
    liked: false,
    replies: [],
    isNew: true
  })
  newMessage.value = ''
  saveMessages()
}

const likeMessage = (id) => {
  const msg = allMessages.value.find(m => m.id === id)
  if (msg) {
    msg.liked = !msg.liked
    msg.likes += msg.liked ? 1 : -1
  }
}

const replyTo = (msg) => {
  replyingTo.value = replyingTo.value === msg.id ? null : msg.id
  replyContent.value = ''
}

const submitReply = (msgId) => {
  if (!replyContent.value.trim()) return
  const msg = allMessages.value.find(m => m.id === msgId)
  if (msg) {
    if (!msg.replies) msg.replies = []
    msg.replies.push({ id: Date.now(), author: '访客', content: replyContent.value })
  }
  replyingTo.value = null
  replyContent.value = ''
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  const now = new Date()
  const diff = now - date
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return Math.floor(diff / 60000) + '分钟前'
  if (diff < 86400000) return Math.floor(diff / 3600000) + '小时前'
  if (diff < 604800000) return Math.floor(diff / 86400000) + '天前'
  return dateStr
}

const saveMessages = () => {
  localStorage.setItem('boardMessages', JSON.stringify(messages.value))
}

onMounted(() => {
  const saved = localStorage.getItem('boardMessages')
  if (saved) {
    try { messages.value = JSON.parse(saved) } catch (e) { messages.value = [] }
  }
})
</script>

<style scoped>
.message-board-page { min-height: 100vh; }

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
.board-layout {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 30px;
}
.board-main { min-width: 0; }

/* 卡片样式 */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 26px;
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

.post-form { margin-bottom: 35px; }
.form-title {
  font-size: 1.3rem;
  color: var(--title-color);
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  letter-spacing: 2px;
}
.title-icon { font-size: 1.1rem; }
.message-input {
  width: 100%;
  padding: 14px 18px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  color: var(--text-primary);
  resize: vertical;
  transition: all var(--transition-fast);
  font-family: inherit;
  line-height: 1.8;
}
.message-input:focus {
  border-color: var(--accent-gold);
  box-shadow: 0 0 12px rgba(201, 168, 76, 0.15);
  outline: none;
}
.form-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
}
.char-count {
  font-size: 0.8rem;
  color: var(--text-muted);
  font-family: var(--font-kai);
}

/* 时间线 */
.message-timeline {
  position: relative;
  padding-left: 35px;
}
.timeline-line {
  position: absolute;
  left: 10px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom,
    var(--accent-gold),
    var(--accent-shilu),
    var(--accent-jade),
    transparent);
}
.message-item {
  position: relative;
  margin-bottom: 28px;
}
.timeline-dot {
  position: absolute;
  left: -35px;
  top: 22px;
  width: 22px;
  height: 22px;
  background: var(--bg-card);
  border: 2px solid var(--accent-gold);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 0 0 10px rgba(201, 168, 76, 0.3);
}
.dot-inner {
  width: 9px;
  height: 9px;
  background: var(--accent-red);
  border-radius: 50%;
}
.message-card {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 22px;
  transition: all var(--transition-normal);
  position: relative;
}
.message-card:hover {
  border-color: var(--accent-gold);
  box-shadow: 0 6px 20px var(--shadow-color);
  transform: translateX(3px);
}
.message-header {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 14px;
}
.message-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--accent-shilu), var(--accent-gold), var(--accent-red));
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.avatar-letter {
  color: #fff;
  font-size: 1.1rem;
  font-family: var(--font-title);
}
.message-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.message-author {
  font-weight: 600;
  color: var(--title-color);
  font-size: 1rem;
  font-family: var(--font-kai);
}
.message-date {
  font-size: 0.8rem;
  color: var(--text-muted);
}
.message-content {
  color: var(--text-secondary);
  line-height: 1.9;
  margin-bottom: 14px;
  text-indent: 2em;
}
.message-footer {
  display: flex;
  gap: 20px;
}
.message-action {
  background: none;
  border: none;
  color: var(--text-muted);
  font-size: 0.85rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  transition: color var(--transition-fast);
}
.message-action:hover {
  color: var(--accent-red);
}
.message-replies {
  margin-top: 14px;
  padding-top: 14px;
  border-top: 1px dashed var(--border-color);
  background: var(--bg-secondary);
  padding: 12px 16px;
  border-radius: var(--radius);
}
.reply-item {
  padding: 6px 0;
  font-size: 0.88rem;
  color: var(--text-secondary);
}
.reply-author {
  color: var(--accent-shilu);
  font-weight: 500;
}
.reply-form {
  display: flex;
  gap: 10px;
  margin-top: 14px;
}
.reply-input {
  flex: 1;
  padding: 9px 14px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  color: var(--text-primary);
  font-size: 0.88rem;
}
.reply-input:focus {
  border-color: var(--accent-gold);
  outline: none;
}
.btn-sm {
  padding: 7px 16px;
  font-size: 0.82rem;
}
.btn-cancel {
  background: var(--bg-tertiary);
  color: var(--text-muted);
  border: 1px solid var(--border-color);
}

/* 侧边栏 */
.board-sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.card-title {
  font-size: 1.1rem;
  color: var(--title-color);
  margin-bottom: 18px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-color);
  letter-spacing: 2px;
  position: relative;
}
.card-title::after {
  content: '';
  position: absolute;
  bottom: -1px;
  left: 0;
  width: 50px;
  height: 1px;
  background: var(--accent-gold);
}
.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
}
.stat-box {
  text-align: center;
  padding: 18px 8px;
  background: var(--bg-secondary);
  border-radius: var(--radius);
  border: 1px solid var(--border-light);
}
.stat-num {
  display: block;
  font-size: 1.6rem;
  color: var(--accent-red);
  margin-bottom: 6px;
}
.stat-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  font-family: var(--font-kai);
  letter-spacing: 1px;
}
.tips-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.tips-list li {
  padding: 10px 0;
  font-size: 0.88rem;
  color: var(--text-secondary);
  border-bottom: 1px dashed var(--border-light);
  padding-left: 18px;
  position: relative;
  line-height: 1.6;
}
.tips-list li::before {
  content: '❖';
  position: absolute;
  left: 0;
  color: var(--accent-gold);
  font-size: 0.75rem;
}
.tips-list li:last-child {
  border-bottom: none;
}

/* 响应式 */
@media (max-width: 900px) {
  .board-layout { grid-template-columns: 1fr; }
  .board-sidebar { order: -1; }
}
</style>
