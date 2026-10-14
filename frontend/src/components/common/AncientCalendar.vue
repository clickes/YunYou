<template>
  <div class="ancient-calendar">
    <div class="calendar-header">
      <div class="cal-title title-font">
        <span class="cal-icon">📅</span>
        <span>今日黄历</span>
      </div>
      <div class="cal-date-ganzhi">{{ ganzhiYear }}年</div>
    </div>

    <div class="calendar-main">
      <div class="cal-left">
        <div class="cal-day title-font">{{ currentDay }}</div>
        <div class="cal-month">{{ currentMonth }}月</div>
        <div class="cal-weekday">{{ weekdayName }}</div>
      </div>
      <div class="cal-divider"></div>
      <div class="cal-right">
        <div class="cal-lunar-title">农历</div>
        <div class="cal-lunar-month">{{ lunarMonthStr }}</div>
        <div class="cal-lunar-day title-font">{{ lunarDayStr }}</div>
        <div class="cal-solar-term" v-if="solarTerm">{{ solarTerm }}</div>
        <div class="cal-festival" v-if="festival">{{ festival }}</div>
      </div>
    </div>

    <div class="calendar-yi-ji">
      <div class="yi-ji-row">
        <span class="yi-label">宜</span>
        <span class="yi-content">{{ yiText }}</span>
      </div>
      <div class="yi-ji-row">
        <span class="ji-label">忌</span>
        <span class="ji-content">{{ jiText }}</span>
      </div>
    </div>

    <div class="calendar-footer">
      <div class="cal-extra">
        <span class="extra-item">生肖：{{ zodiac }}</span>
        <span class="extra-item">星座：{{ constellation }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const now = new Date()
const currentDay = now.getDate()
const currentMonth = now.getMonth() + 1
const currentYear = now.getFullYear()

const weekdayNames = ['日', '一', '二', '三', '四', '五', '六']
const weekdayName = '星期' + weekdayNames[now.getDay()]

// 天干地支
const heavenlyStems = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸']
const earthlyBranches = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥']
const ganzhiYear = computed(() => {
  const offset = currentYear - 1984
  const stem = heavenlyStems[offset % 10]
  const branch = earthlyBranches[offset % 12]
  return stem + branch
})

// 生肖
const zodiacs = ['鼠', '牛', '虎', '兔', '龙', '蛇', '马', '羊', '猴', '鸡', '狗', '猪']
const zodiac = computed(() => zodiacs[(currentYear - 1984) % 12])

// 星座
const constellation = computed(() => {
  const month = currentMonth
  const day = currentDay
  const constellations = [
    { name: '摩羯座', start: [12, 22], end: [1, 19] },
    { name: '水瓶座', start: [1, 20], end: [2, 18] },
    { name: '双鱼座', start: [2, 19], end: [3, 20] },
    { name: '白羊座', start: [3, 21], end: [4, 19] },
    { name: '金牛座', start: [4, 20], end: [5, 20] },
    { name: '双子座', start: [5, 21], end: [6, 21] },
    { name: '巨蟹座', start: [6, 22], end: [7, 22] },
    { name: '狮子座', start: [7, 23], end: [8, 22] },
    { name: '处女座', start: [8, 23], end: [9, 22] },
    { name: '天秤座', start: [9, 23], end: [10, 23] },
    { name: '天蝎座', start: [10, 24], end: [11, 22] },
    { name: '射手座', start: [11, 23], end: [12, 21] }
  ]
  for (const c of constellations) {
    if ((month === c.start[0] && day >= c.start[1]) || (month === c.end[0] && day <= c.end[1])) {
      return c.name
    }
  }
  return '摩羯座'
})

// 农历（简化版，实际项目应使用农历库）
const lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊']
const lunarDays = [
  '初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
  '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
  '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
]

// 简化农历计算（基于近似值，实际应使用专业农历库）
const lunarDate = computed(() => {
  // 2026年春节是2月17日
  const springFestival = new Date(currentYear, 1, 17)
  const diff = Math.floor((now - springFestival) / (1000 * 60 * 60 * 24))
  if (diff < 0) {
    // 还在去年农历
    const lastSpring = new Date(currentYear - 1, 1, 17)
    const lastDiff = Math.floor((now - lastSpring) / (1000 * 60 * 60 * 24))
    return { month: Math.floor(lastDiff / 30) % 12, day: lastDiff % 30 }
  }
  return { month: Math.floor(diff / 30) % 12, day: diff % 30 }
})

const lunarMonthStr = computed(() => lunarMonths[lunarDate.value.month] + '月')
const lunarDayStr = computed(() => lunarDays[lunarDate.value.day])

// 二十四节气（简化）
const solarTermsData = [
  { name: '小寒', month: 1, day: 5 }, { name: '大寒', month: 1, day: 20 },
  { name: '立春', month: 2, day: 4 }, { name: '雨水', month: 2, day: 19 },
  { name: '惊蛰', month: 3, day: 6 }, { name: '春分', month: 3, day: 21 },
  { name: '清明', month: 4, day: 5 }, { name: '谷雨', month: 4, day: 20 },
  { name: '立夏', month: 5, day: 6 }, { name: '小满', month: 5, day: 21 },
  { name: '芒种', month: 6, day: 6 }, { name: '夏至', month: 6, day: 21 },
  { name: '小暑', month: 7, day: 7 }, { name: '大暑', month: 7, day: 23 },
  { name: '立秋', month: 8, day: 8 }, { name: '处暑', month: 8, day: 23 },
  { name: '白露', month: 9, day: 8 }, { name: '秋分', month: 9, day: 23 },
  { name: '寒露', month: 10, day: 8 }, { name: '霜降', month: 10, day: 23 },
  { name: '立冬', month: 11, day: 7 }, { name: '小雪', month: 11, day: 22 },
  { name: '大雪', month: 12, day: 7 }, { name: '冬至', month: 12, day: 22 }
]
const solarTerm = computed(() => {
  const term = solarTermsData.find(t => t.month === currentMonth && Math.abs(t.day - currentDay) <= 1)
  return term ? term.name : ''
})

// 传统节日
const festivals = [
  { month: 1, day: 1, name: '元旦' },
  { month: 2, day: 14, name: '情人节' },
  { month: 3, day: 8, name: '妇女节' },
  { month: 3, day: 12, name: '植树节' },
  { month: 4, day: 1, name: '愚人节' },
  { month: 5, day: 1, name: '劳动节' },
  { month: 5, day: 4, name: '青年节' },
  { month: 6, day: 1, name: '儿童节' },
  { month: 7, day: 1, name: '建党节' },
  { month: 8, day: 1, name: '建军节' },
  { month: 9, day: 10, name: '教师节' },
  { month: 10, day: 1, name: '国庆节' },
  { month: 12, day: 25, name: '圣诞节' }
]
const festival = computed(() => {
  const f = festivals.find(f => f.month === currentMonth && f.day === currentDay)
  return f ? f.name : ''
})

// 宜忌（基于日期的伪随机，实际应使用黄历算法）
const yiOptions = [
  '祭祀、祈福、求嗣、开光、出行、解除、伐木',
  '嫁娶、纳采、订盟、祭祀、祈福、求嗣、开光',
  '祭祀、祈福、求嗣、开光、塑绘、斋醮、订盟',
  '祭祀、会亲友、出行、立券、交易、纳财、开市',
  '祭祀、祈福、斋醮、沐浴、酬神、除服、成服',
  '嫁娶、祭祀、祈福、求嗣、开光、出行、解除',
  '祭祀、祈福、求嗣、开光、出行、解除、移徙'
]
const jiOptions = [
  '诸事不宜',
  '嫁娶、开市、破土、作灶、安葬',
  '动土、破土、安葬、开仓、出货财',
  '嫁娶、移徙、入宅、开市、交易',
  '祭祀、祈福、斋醮、嫁娶、开市',
  '动土、破土、掘井、开池、安葬',
  '嫁娶、开市、立券、交易、纳财'
]
const dayIndex = (currentMonth * 31 + currentDay) % 7
const yiText = yiOptions[dayIndex]
const jiText = jiOptions[dayIndex]
</script>

<style scoped>
.ancient-calendar {
  background: var(--bg-card);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 20px;
  position: relative;
  overflow: hidden;
}
.ancient-calendar::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent-gold), var(--accent-red), var(--accent-gold));
}

.calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px dashed var(--border-color);
}
.cal-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 1.1rem;
  color: var(--title-color);
  letter-spacing: 3px;
}
.cal-icon { font-size: 1.2rem; }
.cal-date-ganzhi {
  font-size: 0.8rem;
  color: var(--accent-red);
  font-family: var(--font-kai);
  letter-spacing: 2px;
}

.calendar-main {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 16px;
}
.cal-left {
  text-align: center;
  min-width: 80px;
}
.cal-day {
  font-size: 2.8rem;
  color: var(--accent-red);
  line-height: 1;
  font-weight: bold;
}
.cal-month {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-top: 4px;
  font-family: var(--font-kai);
}
.cal-weekday {
  font-size: 0.75rem;
  color: var(--text-muted);
  margin-top: 2px;
}

.cal-divider {
  width: 1px;
  height: 70px;
  background: linear-gradient(180deg, transparent, var(--border-color), transparent);
}

.cal-right {
  flex: 1;
  text-align: center;
}
.cal-lunar-title {
  font-size: 0.7rem;
  color: var(--text-muted);
  letter-spacing: 2px;
  margin-bottom: 4px;
}
.cal-lunar-month {
  font-size: 0.85rem;
  color: var(--text-secondary);
  font-family: var(--font-kai);
}
.cal-lunar-day {
  font-size: 1.4rem;
  color: var(--accent-gold);
  margin: 4px 0;
}
.cal-solar-term {
  display: inline-block;
  font-size: 0.75rem;
  color: #fff;
  background: var(--accent-jade);
  padding: 2px 8px;
  border-radius: 2px;
  margin-top: 4px;
}
.cal-festival {
  display: inline-block;
  font-size: 0.75rem;
  color: #fff;
  background: var(--accent-red);
  padding: 2px 8px;
  border-radius: 2px;
  margin-top: 4px;
  margin-left: 4px;
}

.calendar-yi-ji {
  background: var(--bg-tertiary);
  border-radius: var(--radius);
  padding: 12px;
  margin-bottom: 12px;
}
.yi-ji-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 8px;
}
.yi-ji-row:last-child { margin-bottom: 0; }
.yi-label, .ji-label {
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  color: #fff;
  border-radius: 2px;
  flex-shrink: 0;
  font-family: var(--font-title);
}
.yi-label { background: var(--accent-jade); }
.ji-label { background: var(--accent-red); }
.yi-content, .ji-content {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.6;
  font-family: var(--font-kai);
}

.calendar-footer {
  padding-top: 10px;
  border-top: 1px dashed var(--border-color);
}
.cal-extra {
  display: flex;
  justify-content: space-around;
}
.extra-item {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-family: var(--font-kai);
}
</style>
