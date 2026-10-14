<template>
  <div class="daily-poem card">
    <h4 class="card-title title-font">
      <span class="title-icon">📜</span> 每日一诗
    </h4>
    <div class="poem-content">
      <p class="poem-title kai-font">{{ currentPoem.title }}</p>
      <p class="poem-author">—— {{ currentPoem.dynasty }} · {{ currentPoem.author }}</p>
      <div class="poem-lines">
        <p v-for="(line, i) in currentPoem.lines" :key="i" class="poem-line kai-font">{{ line }}</p>
      </div>
    </div>
    <div class="poem-footer">
      <span class="poem-date kai-font">{{ todayStr }}</span>
      <button class="poem-refresh" @click="refreshPoem" title="换一首">↻</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const poems = [
  { title: '静夜思', dynasty: '唐', author: '李白', lines: ['床前明月光', '疑是地上霜', '举头望明月', '低头思故乡'] },
  { title: '春晓', dynasty: '唐', author: '孟浩然', lines: ['春眠不觉晓', '处处闻啼鸟', '夜来风雨声', '花落知多少'] },
  { title: '登鹳雀楼', dynasty: '唐', author: '王之涣', lines: ['白日依山尽', '黄河入海流', '欲穷千里目', '更上一层楼'] },
  { title: '相思', dynasty: '唐', author: '王维', lines: ['红豆生南国', '春来发几枝', '愿君多采撷', '此物最相思'] },
  { title: '江雪', dynasty: '唐', author: '柳宗元', lines: ['千山鸟飞绝', '万径人踪灭', '孤舟蓑笠翁', '独钓寒江雪'] },
  { title: '悯农', dynasty: '唐', author: '李绅', lines: ['锄禾日当午', '汗滴禾下土', '谁知盘中餐', '粒粒皆辛苦'] },
  { title: '咏鹅', dynasty: '唐', author: '骆宾王', lines: ['鹅鹅鹅', '曲项向天歌', '白毛浮绿水', '红掌拨清波'] },
  { title: '游子吟', dynasty: '唐', author: '孟郊', lines: ['慈母手中线', '游子身上衣', '临行密密缝', '意恐迟迟归', '谁言寸草心', '报得三春晖'] },
  { title: '清明', dynasty: '唐', author: '杜牧', lines: ['清明时节雨纷纷', '路上行人欲断魂', '借问酒家何处有', '牧童遥指杏花村'] },
  { title: '山行', dynasty: '唐', author: '杜牧', lines: ['远上寒山石径斜', '白云生处有人家', '停车坐爱枫林晚', '霜叶红于二月花'] },
  { title: '枫桥夜泊', dynasty: '唐', author: '张继', lines: ['月落乌啼霜满天', '江枫渔火对愁眠', '姑苏城外寒山寺', '夜半钟声到客船'] },
  { title: '望庐山瀑布', dynasty: '唐', author: '李白', lines: ['日照香炉生紫烟', '遥看瀑布挂前川', '飞流直下三千尺', '疑是银河落九天'] }
]

const currentIndex = ref(0)

const currentPoem = computed(() => poems[currentIndex.value])

const todayStr = computed(() => {
  const now = new Date()
  return `${now.getMonth() + 1}月${now.getDate()}日`
})

const refreshPoem = () => {
  let newIndex
  do {
    newIndex = Math.floor(Math.random() * poems.length)
  } while (newIndex === currentIndex.value && poems.length > 1)
  currentIndex.value = newIndex
}

onMounted(() => {
  const now = new Date()
  const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
  currentIndex.value = dayOfYear % poems.length
})
</script>

<style scoped>
.daily-poem {
  position: relative;
  overflow: hidden;
}
.daily-poem::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-red), var(--accent-gold));
}
.card-title {
  font-size: 1.05rem;
  color: var(--title-color);
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 10px;
  border-bottom: 1px dashed var(--border-color);
}
.title-icon { font-size: 1.1rem; }
.poem-content {
  text-align: center;
  padding: 8px 0;
}
.poem-title {
  font-size: 1.1rem;
  color: var(--accent-red);
  margin-bottom: 4px;
  letter-spacing: 2px;
}
.poem-author {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 14px;
}
.poem-lines {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.poem-line {
  font-size: 0.95rem;
  color: var(--text-primary);
  line-height: 1.9;
  letter-spacing: 2px;
}
.poem-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 14px;
  padding-top: 10px;
  border-top: 1px dashed var(--border-light);
}
.poem-date {
  font-size: 0.75rem;
  color: var(--text-muted);
}
.poem-refresh {
  width: 28px;
  height: 28px;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.poem-refresh:hover {
  border-color: var(--accent-gold);
  color: var(--accent-gold);
  transform: rotate(180deg);
}
</style>
