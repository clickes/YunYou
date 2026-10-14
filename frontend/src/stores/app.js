import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
  const userData = ref(JSON.parse(localStorage.getItem('userData')) || {
    level: '蒙童', points: 0, totalDays: 0, continuousDays: 0, lastSignDate: null
  })
  const favorites = ref(JSON.parse(localStorage.getItem('favorites')) || [])
  const likes = ref(JSON.parse(localStorage.getItem('likes')) || [])
  const searchHistory = ref(JSON.parse(localStorage.getItem('searchHistory')) || [])
  const readerSettings = ref(JSON.parse(localStorage.getItem('readerSettings')) || { fontSize: 'medium', lineHeight: 'medium', background: 'xuan' })

  // 古代科举等级体系
  const levels = [
    { name: '蒙童', minExp: 0 },
    { name: '秀才', minExp: 30 },
    { name: '举人', minExp: 80 },
    { name: '进士', minExp: 150 },
    { name: '同进士', minExp: 250 },
    { name: '二甲进士', minExp: 400 },
    { name: '一甲进士', minExp: 600 },
    { name: '探花', minExp: 900 },
    { name: '榜眼', minExp: 1300 },
    { name: '状元', minExp: 1800 },
    { name: '翰林修撰', minExp: 2500 },
    { name: '侍讲学士', minExp: 3500 },
    { name: '侍读学士', minExp: 5000 },
    { name: '内阁学士', minExp: 7000 },
    { name: '协办大学士', minExp: 10000 },
    { name: '大学士', minExp: 15000 },
    { name: '太子太傅', minExp: 22000 },
    { name: '文圣', minExp: 35000 }
  ]

  const currentLevelIndex = computed(() => {
    let idx = 0
    for (let i = 0; i < levels.length; i++) {
      if (userData.value.points >= levels[i].minExp) idx = i
    }
    return idx
  })
  const currentLevel = computed(() => levels[currentLevelIndex.value])
  const nextLevel = computed(() => levels[currentLevelIndex.value + 1] || null)
  const levelProgress = computed(() => {
    if (!nextLevel.value) return 100
    const cur = currentLevel.value.minExp
    const next = nextLevel.value.minExp
    return Math.min(100, ((userData.value.points - cur) / (next - cur)) * 100)
  })

  const signIn = () => {
    const today = new Date().toDateString()
    if (userData.value.lastSignDate === today) {
      return { success: false, message: '今日已签到' }
    }
    const yesterday = new Date(Date.now() - 86400000).toDateString()
    userData.value.continuousDays = userData.value.lastSignDate === yesterday
      ? userData.value.continuousDays + 1
      : 1
    const totalPoints = 10 + Math.min(userData.value.continuousDays * 2, 20)
    userData.value.points += totalPoints
    userData.value.totalDays++
    userData.value.lastSignDate = today
    userData.value.level = currentLevel.value.name
    saveUserData()
    return { success: true, exp: totalPoints, level: userData.value.level }
  }

  const canSignIn = computed(() => userData.value.lastSignDate !== new Date().toDateString())

  const toggleFavorite = (articleId) => {
    const idx = favorites.value.indexOf(articleId)
    if (idx > -1) favorites.value.splice(idx, 1)
    else favorites.value.push(articleId)
    localStorage.setItem('favorites', JSON.stringify(favorites.value))
    return idx === -1
  }
  const isFavorite = (articleId) => favorites.value.includes(articleId)

  const toggleLike = (articleId) => {
    const idx = likes.value.indexOf(articleId)
    if (idx > -1) likes.value.splice(idx, 1)
    else likes.value.push(articleId)
    localStorage.setItem('likes', JSON.stringify(likes.value))
    return idx === -1
  }
  const isLiked = (articleId) => likes.value.includes(articleId)

  const addSearchHistory = (keyword) => {
    if (!keyword.trim()) return
    const idx = searchHistory.value.indexOf(keyword)
    if (idx > -1) searchHistory.value.splice(idx, 1)
    searchHistory.value.unshift(keyword)
    if (searchHistory.value.length > 10) searchHistory.value.pop()
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory.value))
  }
  const clearSearchHistory = () => {
    searchHistory.value = []
    localStorage.removeItem('searchHistory')
  }

  const updateReaderSettings = (settings) => {
    readerSettings.value = { ...readerSettings.value, ...settings }
    localStorage.setItem('readerSettings', JSON.stringify(readerSettings.value))
  }

  const saveUserData = () => localStorage.setItem('userData', JSON.stringify(userData.value))

  return {
    userData, favorites, likes, searchHistory, readerSettings, levels,
    currentLevel, nextLevel, levelProgress, canSignIn, signIn,
    toggleFavorite, isFavorite, toggleLike, isLiked, addSearchHistory, clearSearchHistory, updateReaderSettings
  }
})
