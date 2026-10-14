<template>
  <div class="tag-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title title-font">标签云</h1>
        <div class="title-lotus">
          <svg width="80" height="16" viewBox="0 0 80 16" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#C9A84C" stroke-width="1" fill="none" opacity="0.7">
              <path d="M0 8 Q13 2 26 8 Q40 14 53 8 Q66 2 80 8" />
              <circle cx="40" cy="8" r="2.5" fill="#B84A3A" opacity="0.8" />
            </g>
          </svg>
        </div>
        <p class="page-subtitle">标签万千，各有千秋</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="tag-cloud-section">
        <div class="tag-cloud">
          <span
            v-for="tag in sortedTags"
            :key="tag.id"
            class="cloud-tag"
            :class="{ active: currentTag === tag.name }"
            :style="{ fontSize: getTagSize(tag.count) + 'px' }"
            @click="selectTag(tag.name)"
          >
            {{ tag.name }}
            <span class="tag-count">{{ tag.count }}</span>
          </span>
        </div>
      </div>
      <div v-if="currentTag" class="tag-articles">
        <div class="section-header">
          <h2 class="section-title title-font">
            <span class="title-deco"></span>
            # {{ currentTag }}
            <span class="title-deco right"></span>
          </h2>
          <button class="btn" @click="currentTag = ''">查看全部标签</button>
        </div>
        <div v-if="filteredArticles.length" class="article-list">
          <ArticleCard v-for="article in filteredArticles" :key="article.id" :article="article" />
        </div>
        <div v-else class="empty-state">
          <div class="empty-icon">📭</div>
          <p>该标签下暂无文章</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ArticleCard from '../components/common/ArticleCard.vue'
import { tags, getArticlesByTag } from '../mock/data'
const route = useRoute()
const router = useRouter()
const currentTag = ref(route.params.name || '')
const sortedTags = computed(() => [...tags].sort((a, b) => b.count - a.count))
const filteredArticles = computed(() => currentTag.value ? getArticlesByTag(currentTag.value) : [])
const getTagSize = (count) => {
  if (count >= 7) return 22
  if (count >= 5) return 18
  if (count >= 3) return 15
  return 13
}
const selectTag = (name) => { currentTag.value = name; router.push(`/tag/${name}`) }
watch(() => route.params.name, (val) => { currentTag.value = val || '' })
</script>

<style scoped>
.tag-page { min-height: 100vh; }

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
  letter-spacing: 3px;
  font-family: var(--font-kai);
}

.page-body { padding: 50px 20px 70px; }

.tag-cloud-section { margin-bottom: 60px; }
.tag-cloud {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 18px;
  padding: 50px 40px;
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  position: relative;
  box-shadow: 0 4px 20px var(--shadow-color);
}
.tag-cloud::before {
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
  border-radius: var(--radius) var(--radius) 0 0;
}
.cloud-tag {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  background: var(--bg-tertiary);
  border-radius: 25px;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  border: 1px solid var(--border-light);
  font-family: var(--font-title);
  letter-spacing: 2px;
}
.cloud-tag:hover {
  background: linear-gradient(135deg, var(--accent-jade), var(--accent-shilu));
  color: #fff;
  transform: scale(1.08);
  border-color: var(--accent-jade);
  box-shadow: 0 4px 15px rgba(74, 138, 122, 0.3);
}
.cloud-tag.active {
  background: linear-gradient(135deg, var(--accent-gold), #B8963C);
  color: #fff;
  border-color: var(--accent-gold);
  box-shadow: 0 4px 15px rgba(201, 168, 76, 0.4);
}
.tag-count {
  font-size: 0.7em;
  opacity: 0.8;
  background: rgba(255,255,255,0.25);
  padding: 2px 8px;
  border-radius: 12px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 35px;
}
.section-title {
  font-size: 1.7rem;
  color: var(--title-color);
  display: flex;
  align-items: center;
  gap: 20px;
  letter-spacing: 4px;
}
.title-deco {
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-gold));
}
.title-deco.right {
  background: linear-gradient(90deg, var(--accent-gold), transparent);
}
.article-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.empty-state {
  text-align: center;
  padding: 80px 20px;
}
.empty-icon {
  font-size: 4rem;
  margin-bottom: 20px;
  opacity: 0.5;
}
.empty-state p {
  color: var(--text-muted);
  font-family: var(--font-kai);
  letter-spacing: 2px;
}

@media (max-width: 768px) {
  .page-title { font-size: 2rem; letter-spacing: 5px; }
  .tag-cloud { padding: 30px 20px; gap: 12px; }
  .section-header { flex-direction: column; gap: 15px; align-items: flex-start; }
}
</style>
