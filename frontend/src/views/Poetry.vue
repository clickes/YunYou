<template>
  <div class="poetry-page">
    <div class="page-header">
      <div class="container">
        <h1 class="page-title title-font">诗苑</h1>
        <p class="page-subtitle">诗词歌赋 · 古韵悠长</p>
      </div>
    </div>
    <div class="container page-body">
      <div class="poetry-layout">
        <div class="poetry-main">
          <div class="poem-card featured" v-if="currentPoem">
            <div class="poem-header">
              <span class="poem-dynasty">{{ currentPoem.dynasty }}</span>
              <span class="poem-author">{{ currentPoem.author }}</span>
            </div>
            <h2 class="poem-title title-font">{{ currentPoem.title }}</h2>
            <div class="poem-content">
              <p v-for="(line, index) in currentPoem.content" :key="index" class="poem-line">{{ line }}</p>
            </div>
            <div class="poem-actions">
              <button class="poem-btn" @click="prevPoem">‹ 上一首</button>
              <button class="poem-btn primary" @click="randomPoem">🎲 随机一首</button>
              <button class="poem-btn" @click="nextPoem">下一首 ›</button>
            </div>
          </div>
          <div class="poem-analysis card" v-if="currentPoem">
            <h3 class="analysis-title title-font"><span class="title-icon">📖</span> 诗词赏析</h3>
            <p class="analysis-text">{{ currentPoem.analysis }}</p>
          </div>
        </div>
        <div class="poetry-sidebar">
          <div class="sidebar-card card">
            <h4 class="card-title title-font"><span class="title-icon">📜</span> 诗词列表</h4>
            <ul class="poem-list">
              <li v-for="(poem, index) in poems" :key="poem.id" class="poem-list-item" :class="{ active: currentIndex === index }" @click="selectPoem(index)">
                <span class="poem-list-title">{{ poem.title }}</span>
                <span class="poem-list-author">{{ poem.author }}</span>
              </li>
            </ul>
          </div>
          <div class="sidebar-card card">
            <h4 class="card-title title-font"><span class="title-icon">🏷️</span> 诗词分类</h4>
            <div class="poem-tags">
              <span v-for="tag in poemTags" :key="tag" class="poem-tag">{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const poems = [
  { id: 1, title: '静夜思', author: '李白', dynasty: '唐', content: ['床前明月光，', '疑是地上霜。', '举头望明月，', '低头思故乡。'], analysis: '这首诗写的是在寂静的月夜思念家乡的感受。诗的前两句，是写诗人在作客他乡的特定环境中一刹那间所产生的错觉。后两句通过动作神态的刻画，深化思乡之情。' },
  { id: 2, title: '春晓', author: '孟浩然', dynasty: '唐', content: ['春眠不觉晓，', '处处闻啼鸟。', '夜来风雨声，', '花落知多少。'], analysis: '这首诗是诗人隐居在鹿门山时所做，意境十分优美。诗人抓住春天的早晨刚刚醒来时的一瞬间展开描写和联想，生动地表达了诗人对春天的热爱和怜惜之情。' },
  { id: 3, title: '登鹳雀楼', author: '王之涣', dynasty: '唐', content: ['白日依山尽，', '黄河入海流。', '欲穷千里目，', '更上一层楼。'], analysis: '这首诗写诗人在登高望远中表现出来的不凡的胸襟抱负，反映了盛唐时期人们积极向上的进取精神。前两句写所见，后两句写所思，蕴含着"站得高才能看得远"的人生哲理。' },
  { id: 4, title: '相思', author: '王维', dynasty: '唐', content: ['红豆生南国，', '春来发几枝。', '愿君多采撷，', '此物最相思。'], analysis: '这是借咏物而寄相思的诗，是眷怀友人之作。起句因物起兴，语虽单纯，却富于想象；接着以设问寄语，意味深长地寄托情思；第三句暗示珍重友谊，表面似乎嘱人相思，背面却深寓自身相思之重。' },
  { id: 5, title: '江雪', author: '柳宗元', dynasty: '唐', content: ['千山鸟飞绝，', '万径人踪灭。', '孤舟蓑笠翁，', '独钓寒江雪。'], analysis: '这首诗描绘了一幅渔翁寒江独钓图，表达了诗人永贞革新失败后，虽处境孤独，但仍傲岸不屈的性格。诗中运用典型概括的手法，选择千山万径，人鸟绝迹这种最能表现山野严寒的典型景物，描绘大雪纷飞，天寒地冻的图景。' },
  { id: 6, title: '悯农', author: '李绅', dynasty: '唐', content: ['锄禾日当午，', '汗滴禾下土。', '谁知盘中餐，', '粒粒皆辛苦。'], analysis: '这首诗描绘了在烈日当空的正午农民田里劳作的景象，概括地表现了农民终年辛勤劳动的生活，最后以"谁知盘中餐，粒粒皆辛苦"这样近似蕴意深远的格言，表达了诗人对农民真挚的同情之心。' },
  { id: 7, title: '咏鹅', author: '骆宾王', dynasty: '唐', content: ['鹅，鹅，鹅，', '曲项向天歌。', '白毛浮绿水，', '红掌拨清波。'], analysis: '这首诗从一个七岁儿童的眼光看鹅游水嬉戏的神态，写得极为生动活泼。诗中，诗人从自己的视觉、听觉和感觉出发，写出了鹅的形态、叫声和游水时的动作，表现了鹅的可爱。' },
  { id: 8, title: '游子吟', author: '孟郊', dynasty: '唐', content: ['慈母手中线，', '游子身上衣。', '临行密密缝，', '意恐迟迟归。', '谁言寸草心，', '报得三春晖。'], analysis: '这是一首母爱的颂歌。诗中亲切真淳地吟颂了伟大的人性美——母爱。诗的开头两句，所写的人是母与子，所写的物是线与衣，然而却点出了母子相依为命的骨肉之情。' }
]

const poemTags = ['思乡', '春天', '哲理', '友情', '孤独', '悯农', '童趣', '母爱', '山水', '边塞']
const currentIndex = ref(0)
const currentPoem = computed(() => poems[currentIndex.value])

const prevPoem = () => {
  currentIndex.value = (currentIndex.value - 1 + poems.length) % poems.length
}
const nextPoem = () => {
  currentIndex.value = (currentIndex.value + 1) % poems.length
}
const randomPoem = () => {
  let newIndex
  do {
    newIndex = Math.floor(Math.random() * poems.length)
  } while (newIndex === currentIndex.value && poems.length > 1)
  currentIndex.value = newIndex
}
const selectPoem = (index) => {
  currentIndex.value = index
}
</script>

<style scoped>
.poetry-page { min-height: 100vh; }
.page-header { padding: 60px 0 40px; background: linear-gradient(135deg, var(--bg-secondary), var(--bg-tertiary)); text-align: center; }
.page-subtitle { color: var(--text-secondary); font-size: 1rem; margin-top: 10px; font-family: var(--font-kai); letter-spacing: 4px; }
.page-body { padding: 40px 20px 60px; }
.poetry-layout { display: grid; grid-template-columns: 1fr 280px; gap: 30px; }
.poetry-main { min-width: 0; }
.poem-card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 40px; margin-bottom: 24px; position: relative; overflow: hidden; }
.poem-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px; background: linear-gradient(90deg, var(--accent-gold), var(--accent-red), var(--accent-gold)); }
.poem-card.featured { text-align: center; }
.poem-header { display: flex; justify-content: center; gap: 16px; margin-bottom: 20px; }
.poem-dynasty { padding: 2px 10px; background: rgba(201, 169, 97, 0.1); color: var(--accent-gold); border-radius: 2px; font-size: 0.8rem; font-family: var(--font-kai); }
.poem-author { color: var(--text-muted); font-size: 0.9rem; font-family: var(--font-kai); }
.poem-title { font-size: 2rem; color: var(--title-color); margin-bottom: 30px; letter-spacing: 6px; }
.poem-content { margin-bottom: 30px; }
.poem-line { font-size: 1.3rem; color: var(--text-primary); line-height: 2.2; letter-spacing: 2px; font-family: var(--font-kai); }
.poem-actions { display: flex; justify-content: center; gap: 12px; }
.poem-btn { padding: 10px 20px; background: var(--bg-tertiary); border: 1px solid var(--border-color); border-radius: 2px; color: var(--text-secondary); cursor: pointer; transition: all var(--transition-fast); font-family: var(--font-kai); font-size: 0.9rem; }
.poem-btn:hover { border-color: var(--accent-gold); color: var(--accent-red); }
.poem-btn.primary { background: var(--accent-red); color: #fff; border-color: var(--accent-red); }
.poem-btn.primary:hover { background: #8B1830; }
.card { background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius); padding: 24px; position: relative; }
.card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--accent-gold), var(--accent-red), var(--accent-gold)); opacity: 0.5; border-radius: var(--radius) var(--radius) 0 0; }
.analysis-title { font-size: 1.2rem; color: var(--title-color); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; }
.title-icon { font-size: 1.1rem; }
.analysis-text { font-size: 0.95rem; color: var(--text-secondary); line-height: 2; text-indent: 2em; }
.poetry-sidebar { display: flex; flex-direction: column; gap: 20px; }
.card-title { font-size: 1.05rem; color: var(--title-color); margin-bottom: 16px; display: flex; align-items: center; gap: 8px; padding-bottom: 10px; border-bottom: 1px dashed var(--border-color); }
.poem-list { list-style: none; padding: 0; margin: 0; max-height: 400px; overflow-y: auto; }
.poem-list-item { padding: 10px 12px; border-radius: 2px; cursor: pointer; transition: all var(--transition-fast); margin-bottom: 4px; }
.poem-list-item:hover { background: var(--bg-tertiary); }
.poem-list-item.active { background: rgba(196, 30, 58, 0.08); border-left: 3px solid var(--accent-red); }
.poem-list-title { display: block; font-size: 0.9rem; color: var(--title-color); margin-bottom: 2px; }
.poem-list-author { font-size: 0.75rem; color: var(--text-muted); }
.poem-tags { display: flex; flex-wrap: wrap; gap: 8px; }
.poem-tag { padding: 4px 10px; background: var(--bg-tertiary); border-radius: 2px; font-size: 0.8rem; color: var(--text-secondary); font-family: var(--font-kai); }
@media (max-width: 900px) { .poetry-layout { grid-template-columns: 1fr; } .poetry-sidebar { order: -1; } }
@media (max-width: 600px) { .poem-card { padding: 24px; } .poem-title { font-size: 1.5rem; letter-spacing: 4px; } .poem-line { font-size: 1.1rem; } }
</style>
