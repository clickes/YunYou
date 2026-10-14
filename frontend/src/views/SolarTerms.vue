<template>
  <div class="solar-terms-page">
    <div class="page-header">
      <div class="container">
        <BrushTitle text="节气志" :delay="0.12" />
        <p class="page-subtitle kai-font">二十四节气 · 岁时流转</p>
        <div class="current-term card-ink" v-if="currentTerm">
          <div class="term-badge">
            <span class="term-season">{{ currentTerm.season }}</span>
            <span class="term-name title-font">{{ currentTerm.name }}</span>
          </div>
          <div class="term-info">
            <p class="term-date kai-font">{{ currentTerm.date }}</p>
            <p class="term-desc">{{ currentTerm.desc }}</p>
          </div>
          <div class="term-countdown">
            <span class="countdown-label kai-font">距下一节气</span>
            <span class="countdown-days title-font">{{ daysToNext }}</span>
            <span class="countdown-unit">日</span>
          </div>
        </div>
      </div>
    </div>
    <div class="container page-body">
      <div class="terms-grid">
        <div
          v-for="(term, index) in solarTerms"
          :key="term.name"
          class="term-card"
          :class="{ active: currentTerm && currentTerm.name === term.name, past: isPast(index) }"
          @click="selectTerm(term)"
        >
          <div class="term-card-inner">
            <span class="term-number">{{ String(index + 1).padStart(2, '0') }}</span>
            <span class="term-card-name title-font">{{ term.name }}</span>
            <span class="term-card-date kai-font">{{ term.date }}</span>
            <span class="term-card-icon">{{ term.icon }}</span>
          </div>
        </div>
      </div>
      <transition name="fade">
        <div v-if="selectedTerm" class="term-detail card-ink">
          <div class="detail-header">
            <h3 class="detail-title title-font">{{ selectedTerm.name }}</h3>
            <span class="detail-season">{{ selectedTerm.season }} · {{ selectedTerm.date }}</span>
            <button class="detail-close" @click="selectedTerm = null">✕</button>
          </div>
          <div class="detail-body">
            <div class="detail-section">
              <h4 class="section-title kai-font">❖ 节气释义</h4>
              <p class="section-text">{{ selectedTerm.desc }}</p>
            </div>
            <div class="detail-section">
              <h4 class="section-title kai-font">❖ 三候</h4>
              <div class="wuhou-list">
                <div v-for="(hou, i) in selectedTerm.wuhou" :key="i" class="wuhou-item">
                  <span class="wuhou-index">{{ ['一', '二', '三'][i] }}候</span>
                  <span class="wuhou-text kai-font">{{ hou }}</span>
                </div>
              </div>
            </div>
            <div class="detail-section">
              <h4 class="section-title kai-font">❖ 节气诗词</h4>
              <div class="poem-block">
                <p class="poem-title kai-font">{{ selectedTerm.poem.title }}</p>
                <p class="poem-author">—— {{ selectedTerm.poem.author }}</p>
                <p v-for="(line, i) in selectedTerm.poem.lines" :key="i" class="poem-line kai-font">{{ line }}</p>
              </div>
            </div>
            <div class="detail-section">
              <h4 class="section-title kai-font">❖ 食俗养生</h4>
              <div class="food-tags">
                <span v-for="food in selectedTerm.foods" :key="food" class="food-tag">{{ food }}</span>
              </div>
              <p class="section-text">{{ selectedTerm.health }}</p>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import BrushTitle from '../components/common/BrushTitle.vue'

const selectedTerm = ref(null)

const solarTerms = [
  { name: '立春', season: '春', date: '2月3-5日', icon: '🌱', desc: '春之始也，万物复苏，东风解冻，蛰虫始振。', wuhou: ['东风解冻', '蛰虫始振', '鱼陟负冰'], poem: { title: '立春', author: '杜甫', lines: ['春日春盘细生菜', '忽忆两京梅发时', '盘出高门行白玉', '菜传纤手送青丝'] }, foods: ['春饼', '萝卜', '春卷'], health: '宜养肝，少食辛辣，多吃新鲜蔬菜，早睡早起。' },
  { name: '雨水', season: '春', date: '2月18-20日', icon: '🌧️', desc: '气温回升，冰雪融化，降水增多，故曰雨水。', wuhou: ['獭祭鱼', '鸿雁来', '草木萌动'], poem: { title: '春夜喜雨', author: '杜甫', lines: ['好雨知时节', '当春乃发生', '随风潜入夜', '润物细无声'] }, foods: ['汤圆', '罐罐肉', '龙须饼'], health: '宜健脾祛湿，注意保暖，勿过早减衣。' },
  { name: '惊蛰', season: '春', date: '3月5-7日', icon: '⚡', desc: '春雷始鸣，惊醒蛰伏于地下冬眠的昆虫。', wuhou: ['桃始华', '仓庚鸣', '鹰化为鸠'], poem: { title: '惊蛰', author: '韦应物', lines: ['微雨众卉新', '一雷惊蛰始', '田家几日闲', '耕种从此起'] }, foods: ['梨', '炒豆', '煎饼'], health: '宜疏肝理气，多食清淡，保持心情舒畅。' },
  { name: '春分', season: '春', date: '3月20-22日', icon: '🌸', desc: '昼夜平分，阴阳相半，寒暑平衡，万物生长。', wuhou: ['玄鸟至', '雷乃发声', '始电'], poem: { title: '春分日', author: '徐铉', lines: ['仲春初四日', '春色正中分', '绿野徘徊月', '晴天断续云'] }, foods: ['春菜', '太阳糕', '驴打滚'], health: '宜调和阴阳，作息规律，适度运动。' },
  { name: '清明', season: '春', date: '4月4-6日', icon: '🌿', desc: '气清景明，万物皆显，踏青扫墓，慎终追远。', wuhou: ['桐始华', '田鼠化为鴽', '虹始见'], poem: { title: '清明', author: '杜牧', lines: ['清明时节雨纷纷', '路上行人欲断魂', '借问酒家何处有', '牧童遥指杏花村'] }, foods: ['青团', '馓子', '清明果'], health: '宜疏肝养肺，注意防过敏，外出踏青。' },
  { name: '谷雨', season: '春', date: '4月19-21日', icon: '🌾', desc: '雨生百谷，春雨绵绵，谷物生长，春之末也。', wuhou: ['萍始生', '鸣鸠拂其羽', '戴胜降于桑'], poem: { title: '谷雨', author: '郑板桥', lines: ['不风不雨正晴和', '翠竹亭亭好节柯', '最爱晚凉佳客至', '一壶新茗泡松萝'] }, foods: ['香椿', '谷雨茶', '乌米饭'], health: '宜健脾除湿，多食香椿等时令蔬菜。' },
  { name: '立夏', season: '夏', date: '5月5-7日', icon: '☀️', desc: '夏之始也，万物繁茂，气温升高，雷雨增多。', wuhou: ['蝼蝈鸣', '蚯蚓出', '王瓜生'], poem: { title: '立夏', author: '陆游', lines: ['赤帜插城扉', '东君整驾归', '泥新巢燕闹', '花尽蜜蜂稀'] }, foods: ['立夏蛋', '立夏饭', '尝三鲜'], health: '宜养心安神，少食油腻，多吃瓜果。' },
  { name: '小满', season: '夏', date: '5月20-22日', icon: '🌾', desc: '麦粒渐满，尚未成熟，万物小得盈满，故曰小满。', wuhou: ['苦菜秀', '靡草死', '麦秋至'], poem: { title: '小满', author: '欧阳修', lines: ['夜莺啼绿柳', '皓月醒长空', '最爱垄头麦', '迎风笑落红'] }, foods: ['苦菜', '麦糕', '枇杷'], health: '宜清热利湿，多吃苦味食物，防湿热。' },
  { name: '芒种', season: '夏', date: '6月5-7日', icon: '🌾', desc: '有芒之谷可种，过此即失效，农忙之时也。', wuhou: ['螳螂生', '鵙始鸣', '反舌无声'], poem: { title: '芒种', author: '范成大', lines: ['乙酉甲申雷雨惊', '乘除却贺芒种晴', '插秧先插蚤籼稻', '少忍数旬蒸米成'] }, foods: ['青梅', '煮梅', '酸梅汤'], health: '宜清补，多吃酸味食物，防暑降温。' },
  { name: '夏至', season: '夏', date: '6月21-22日', icon: '🌞', desc: '日长之至，日影短至，阳气极盛，阴气始生。', wuhou: ['鹿角解', '蝉始鸣', '半夏生'], poem: { title: '夏至', author: '刘禹锡', lines: ['日长之至日影短', '鹿角解落蝉始鸣', '半夏生时梅雨细', '一阴初起夜渐长'] }, foods: ['面条', '馄饨', '荔枝'], health: '宜养心护阳，少食生冷，注意防暑。' },
  { name: '小暑', season: '夏', date: '7月6-8日', icon: '🌡️', desc: '暑气渐盛，尚未至极，天气炎热，雷雨频繁。', wuhou: ['温风至', '蟋蟀居宇', '鹰始鸷'], poem: { title: '小暑', author: '元稹', lines: ['倏忽温风至', '因循小暑来', '竹喧先觉雨', '山暗已闻雷'] }, foods: ['藕', '黄鳝', '绿豆汤'], health: '宜清热解暑，多吃瓜果，注意补水。' },
  { name: '大暑', season: '夏', date: '7月22-24日', icon: '🔥', desc: '暑气至极，一年中最热之时，万物繁茂生长。', wuhou: ['腐草为萤', '土润溽暑', '大雨时行'], poem: { title: '大暑', author: '曾几', lines: ['赤日几时过', '清风无处寻', '经书聊枕籍', '瓜李漫浮沉'] }, foods: ['仙草', '凤梨', '伏茶'], health: '宜防暑降温，多饮汤水，避免暴晒。' },
  { name: '立秋', season: '秋', date: '8月7-9日', icon: '🍂', desc: '秋之始也，暑去凉来，万物始收，禾谷成熟。', wuhou: ['凉风至', '白露降', '寒蝉鸣'], poem: { title: '立秋', author: '刘翰', lines: ['乳鸦啼散玉屏空', '一枕新凉一扇风', '睡起秋色无觅处', '满阶梧桐月明中'] }, foods: ['西瓜', '秋桃', '贴秋膘'], health: '宜润肺养阴，少食辛辣，注意防燥。' },
  { name: '处暑', season: '秋', date: '8月22-24日', icon: '🌤️', desc: '暑气至此而止，气温逐渐下降，秋意渐浓。', wuhou: ['鹰乃祭鸟', '天地始肃', '禾乃登'], poem: { title: '处暑', author: '苏泂', lines: ['处暑无三日', '新凉直万金', '白头更世事', '青草印禅心'] }, foods: ['鸭肉', '龙眼', '白丸子'], health: '宜滋阴润燥，多吃白色食物，养肺。' },
  { name: '白露', season: '秋', date: '9月7-9日', icon: '💧', desc: '阴气渐重，露凝而白，天气转凉，秋意正浓。', wuhou: ['鸿雁来', '玄鸟归', '群鸟养羞'], poem: { title: '蒹葭', author: '诗经', lines: ['蒹葭苍苍', '白露为霜', '所谓伊人', '在水一方'] }, foods: ['龙眼', '白露茶', '番薯'], health: '宜养肺润燥，多吃白色食物，注意保暖。' },
  { name: '秋分', season: '秋', date: '9月22-24日', icon: '🍁', desc: '昼夜平分，阴阳相半，寒暑平衡，秋收之时。', wuhou: ['雷始收声', '蛰虫坯户', '水始涸'], poem: { title: '秋分', author: '刘禹锡', lines: ['自古逢秋悲寂寥', '我言秋日胜春朝', '晴空一鹤排云上', '便引诗情到碧霄'] }, foods: ['秋菜', '汤圆', '桂花酒'], health: '宜调和阴阳，早睡早起，适度秋冻。' },
  { name: '寒露', season: '秋', date: '10月8-9日', icon: '🍂', desc: '露气寒冷，将凝结也，气温更低，秋深露重。', wuhou: ['鸿雁来宾', '雀入大水为蛤', '菊有黄华'], poem: { title: '池上', author: '白居易', lines: ['袅袅凉风动', '凄凄寒露零', '兰衰花始白', '荷破叶犹青'] }, foods: ['芝麻', '螃蟹', '菊花酒'], health: '宜滋阴润肺，多食芝麻、蜂蜜，防秋燥。' },
  { name: '霜降', season: '秋', date: '10月23-24日', icon: '❄️', desc: '气肃而凝，露结为霜，秋之末也，冬之将至。', wuhou: ['豺乃祭兽', '草木黄落', '蛰虫咸俯'], poem: { title: '山行', author: '杜牧', lines: ['远上寒山石径斜', '白云生处有人家', '停车坐爱枫林晚', '霜叶红于二月花'] }, foods: ['柿子', '栗子', '牛肉'], health: '宜健脾养胃，多食温补食物，注意防寒。' },
  { name: '立冬', season: '冬', date: '11月7-8日', icon: '🌨️', desc: '冬之始也，万物收藏，水始冰，地始冻。', wuhou: ['水始冰', '地始冻', '雉入大水为蜃'], poem: { title: '立冬', author: '李白', lines: ['冻笔新诗懒写', '寒炉美酒时温', '醉看墨花月白', '恍疑雪满前村'] }, foods: ['饺子', '羊肉', '冬酿酒'], health: '宜温补养藏，多食温热食物，早睡晚起。' },
  { name: '小雪', season: '冬', date: '11月22-23日', icon: '🌨️', desc: '气寒将雪，地寒未甚，雪量尚小，故曰小雪。', wuhou: ['虹藏不见', '天气上升地气下降', '闭塞而成冬'], poem: { title: '小雪', author: '戴叔伦', lines: ['花雪随风不厌看', '更多还肯失林峦', '愁人正在书窗下', '一片飞来一片寒'] }, foods: ['糍粑', '腊肉', '刨汤'], health: '宜温补肾阳，多食黑色食物，注意保暖。' },
  { name: '大雪', season: '冬', date: '12月6-8日', icon: '❄️', desc: '雪盛也，至此而雪盛，气温骤降，冬意正浓。', wuhou: ['鹖鴠不鸣', '虎始交', '荔挺出'], poem: { title: '江雪', author: '柳宗元', lines: ['千山鸟飞绝', '万径人踪灭', '孤舟蓑笠翁', '独钓寒江雪'] }, foods: ['羊肉', '红薯粥', '腌肉'], health: '宜温补避寒，多食羊肉等温补食物。' },
  { name: '冬至', season: '冬', date: '12月21-23日', icon: '🌙', desc: '日短之至，日影长之至，阴极阳生，数九寒天。', wuhou: ['蚯蚓结', '麋角解', '水泉动'], poem: { title: '冬至', author: '杜甫', lines: ['天时人事日相催', '冬至阳生春又来', '刺绣五纹添弱线', '吹葭六琯动浮灰'] }, foods: ['饺子', '汤圆', '羊肉汤'], health: '宜温补阳气，多食温补，注意养藏。' },
  { name: '小寒', season: '冬', date: '1月5-7日', icon: '🥶', desc: '天气寒冷，尚未至极，三九严寒，冬之深也。', wuhou: ['雁北乡', '鹊始巢', '雉始雊'], poem: { title: '小寒', author: '元稹', lines: ['小寒连大吕', '欢鹊垒新巢', '拾食寻河曲', '衔紫绕树梢'] }, foods: ['腊八粥', '糯米饭', '菜饭'], health: '宜温补脾肾，多食温热，注意防寒保暖。' },
  { name: '大寒', season: '冬', date: '1月20-21日', icon: '🧊', desc: '寒气之逆极，故谓大寒，冬之末也，春之将至。', wuhou: ['鸡乳', '征鸟厉疾', '水泽腹坚'], poem: { title: '大寒', author: '邵雍', lines: ['旧雪未及消', '新雪又拥户', '阶前冻银床', '檐头冰钟乳'] }, foods: ['八宝饭', '年糕', '鸡汤'], health: '宜温补藏精，多食温补，为迎春做准备。' }
]

const currentTermIndex = computed(() => {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  const termDates = [
    { m: 2, d: 3 }, { m: 2, d: 18 }, { m: 3, d: 5 }, { m: 3, d: 20 },
    { m: 4, d: 4 }, { m: 4, d: 19 }, { m: 5, d: 5 }, { m: 5, d: 20 },
    { m: 6, d: 5 }, { m: 6, d: 21 }, { m: 7, d: 6 }, { m: 7, d: 22 },
    { m: 8, d: 7 }, { m: 8, d: 22 }, { m: 9, d: 7 }, { m: 9, d: 22 },
    { m: 10, d: 8 }, { m: 10, d: 23 }, { m: 11, d: 7 }, { m: 11, d: 22 },
    { m: 12, d: 6 }, { m: 12, d: 21 }, { m: 1, d: 5 }, { m: 1, d: 20 }
  ]
  let idx = 0
  for (let i = 0; i < termDates.length; i++) {
    const t = termDates[i]
    if (month > t.m || (month === t.m && day >= t.d)) {
      idx = i
    }
  }
  return idx
})

const currentTerm = computed(() => solarTerms[currentTermIndex.value])

const daysToNext = computed(() => {
  const nextIdx = (currentTermIndex.value + 1) % 24
  const nextTerm = solarTerms[nextIdx]
  const [m, d] = nextTerm.date.match(/(\d+)月(\d+)/).slice(1).map(Number)
  const now = new Date()
  let nextDate = new Date(now.getFullYear(), m - 1, d)
  if (nextDate <= now) nextDate = new Date(now.getFullYear() + 1, m - 1, d)
  return Math.ceil((nextDate - now) / (1000 * 60 * 60 * 24))
})

const isPast = (index) => index < currentTermIndex.value

const selectTerm = (term) => {
  selectedTerm.value = selectedTerm.value?.name === term.name ? null : term
}
</script>

<style scoped>
.solar-terms-page { min-height: 100vh; }
.page-header {
  padding: 60px 0 40px;
  background: linear-gradient(180deg, var(--bg-secondary), var(--bg-primary));
  text-align: center;
}
.page-subtitle {
  color: var(--text-secondary);
  font-size: 1rem;
  margin-top: 12px;
  letter-spacing: 6px;
}
.current-term {
  max-width: 700px;
  margin: 30px auto 0;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 24px;
  text-align: left;
}
.term-badge {
  text-align: center;
  flex-shrink: 0;
}
.term-season {
  display: block;
  font-size: 0.8rem;
  color: var(--accent-gold);
  margin-bottom: 4px;
  letter-spacing: 4px;
}
.term-name {
  font-size: 2.5rem;
  color: var(--accent-red);
  letter-spacing: 4px;
}
.term-info { flex: 1; }
.term-date {
  font-size: 0.9rem;
  color: var(--accent-shilu);
  margin-bottom: 6px;
}
.term-desc {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.7;
}
.term-countdown {
  text-align: center;
  flex-shrink: 0;
  padding-left: 20px;
  border-left: 1px dashed var(--border-light);
}
.countdown-label {
  display: block;
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 4px;
}
.countdown-days {
  font-size: 2rem;
  color: var(--accent-red);
}
.countdown-unit {
  font-size: 0.8rem;
  color: var(--text-muted);
}
.page-body { padding: 40px 20px 60px; }
.terms-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
  margin-bottom: 30px;
}
.term-card {
  cursor: pointer;
  transition: all var(--transition-normal);
}
.term-card-inner {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 16px 12px;
  text-align: center;
  position: relative;
  transition: all var(--transition-normal);
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}
.term-card:hover .term-card-inner {
  border-color: var(--accent-gold);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px var(--shadow-color);
}
.term-card.active .term-card-inner {
  border-color: var(--accent-red);
  background: linear-gradient(135deg, rgba(196, 30, 58, 0.05), var(--bg-card));
}
.term-card.past .term-card-inner {
  opacity: 0.5;
}
.term-number {
  position: absolute;
  top: 6px;
  right: 8px;
  font-size: 0.65rem;
  color: var(--text-muted);
  font-family: var(--font-mono);
}
.term-card-name {
  font-size: 1.2rem;
  color: var(--title-color);
  letter-spacing: 2px;
}
.term-card.active .term-card-name {
  color: var(--accent-red);
}
.term-card-date {
  font-size: 0.7rem;
  color: var(--text-muted);
}
.term-card-icon {
  font-size: 1.3rem;
  margin-top: 2px;
}
.term-detail {
  padding: 30px;
  animation: fadeIn 0.4s ease;
}
.detail-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px dashed var(--border-light);
  position: relative;
}
.detail-title {
  font-size: 1.8rem;
  color: var(--accent-red);
  letter-spacing: 4px;
}
.detail-season {
  font-size: 0.85rem;
  color: var(--text-muted);
}
.detail-close {
  margin-left: auto;
  width: 32px;
  height: 32px;
  background: var(--bg-tertiary);
  border-radius: 50%;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}
.detail-close:hover {
  background: var(--accent-red);
  color: #fff;
}
.detail-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
.detail-section {
  margin-bottom: 8px;
}
.section-title {
  font-size: 0.95rem;
  color: var(--accent-shilu);
  margin-bottom: 10px;
  letter-spacing: 2px;
}
.section-text {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.8;
}
.wuhou-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.wuhou-item {
  display: flex;
  align-items: center;
  gap: 10px;
}
.wuhou-index {
  font-size: 0.75rem;
  color: var(--accent-gold);
  background: rgba(201, 169, 97, 0.1);
  padding: 2px 8px;
  border-radius: 2px;
  flex-shrink: 0;
}
.wuhou-text {
  font-size: 0.9rem;
  color: var(--text-primary);
}
.poem-block {
  background: var(--bg-tertiary);
  padding: 16px;
  border-radius: var(--radius);
  text-align: center;
}
.poem-title {
  font-size: 1rem;
  color: var(--title-color);
  margin-bottom: 4px;
}
.poem-author {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-bottom: 12px;
}
.poem-line {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 2;
  letter-spacing: 2px;
}
.food-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}
.food-tag {
  padding: 4px 12px;
  background: rgba(92, 138, 106, 0.1);
  color: var(--accent-jade);
  border-radius: 2px;
  font-size: 0.8rem;
  font-family: var(--font-kai);
}
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
@media (max-width: 900px) {
  .terms-grid { grid-template-columns: repeat(4, 1fr); }
  .detail-body { grid-template-columns: 1fr; }
  .current-term { flex-direction: column; text-align: center; }
  .term-countdown { border-left: none; border-top: 1px dashed var(--border-light); padding-left: 0; padding-top: 12px; }
}
@media (max-width: 600px) {
  .terms-grid { grid-template-columns: repeat(3, 1fr); }
  .term-name { font-size: 1.8rem; }
}
</style>
