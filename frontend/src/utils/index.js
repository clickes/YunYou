export const formatDateCN = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`
}

export const numberToCN = (num) => {
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖', '拾']
  if (num < 10) return cnNums[num]
  if (num < 20) return '拾' + (num % 10 === 0 ? '' : cnNums[num % 10])
  if (num < 100) {
    const tens = Math.floor(num / 10)
    const ones = num % 10
    return cnNums[tens] + '拾' + (ones === 0 ? '' : cnNums[ones])
  }
  return num.toString()
}

export const formatViews = (views) => {
  if (views >= 10000) return (views / 10000).toFixed(1) + 'w'
  if (views >= 1000) return (views / 1000).toFixed(1) + 'k'
  return views.toString()
}

export const calcReadTime = (wordCount) => {
  const minutes = Math.ceil(wordCount / 400)
  return minutes < 1 ? '不足一分钟' : `约${minutes}分钟`
}

export const debounce = (fn, delay = 300) => {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

export const throttle = (fn, delay = 300) => {
  let last = 0
  return function (...args) {
    const now = Date.now()
    if (now - last >= delay) { last = now; fn.apply(this, args) }
  }
}

export const scrollToElement = (selector, offset = 0) => {
  const element = document.querySelector(selector)
  if (element) window.scrollTo({ top: element.offsetTop - offset, behavior: 'smooth' })
}

export const copyToClipboard = async (text) => {
  try { await navigator.clipboard.writeText(text); return true }
  catch {
    const textarea = document.createElement('textarea')
    textarea.value = text
    document.body.appendChild(textarea)
    textarea.select()
    document.execCommand('copy')
    document.body.removeChild(textarea)
    return true
  }
}

export const getCurrentShichen = () => {
  const hour = new Date().getHours()
  const shichens = [
    { name: '子时', range: [23, 1], desc: '夜半' }, { name: '丑时', range: [1, 3], desc: '鸡鸣' },
    { name: '寅时', range: [3, 5], desc: '平旦' }, { name: '卯时', range: [5, 7], desc: '日出' },
    { name: '辰时', range: [7, 9], desc: '食时' }, { name: '巳时', range: [9, 11], desc: '隅中' },
    { name: '午时', range: [11, 13], desc: '日中' }, { name: '未时', range: [13, 15], desc: '日昳' },
    { name: '申时', range: [15, 17], desc: '晡时' }, { name: '酉时', range: [17, 19], desc: '日入' },
    { name: '戌时', range: [19, 21], desc: '黄昏' }, { name: '亥时', range: [21, 23], desc: '人定' }
  ]
  for (const s of shichens) {
    if (hour >= s.range[0] && hour < s.range[1]) return s
    if (s.range[0] > s.range[1] && (hour >= s.range[0] || hour < s.range[1])) return s
  }
  return shichens[5]
}
