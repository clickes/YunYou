import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const theme = ref(localStorage.getItem('blog-theme') || 'default')
  const timeTheme = ref('noon')

  const setTheme = (newTheme) => {
    theme.value = newTheme
    localStorage.setItem('blog-theme', newTheme)
    applyTheme()
  }

  const applyTheme = () => {
    const html = document.documentElement
    if (theme.value === 'default') html.removeAttribute('data-theme')
    else html.setAttribute('data-theme', theme.value)
  }

  const updateTimeTheme = () => {
    const hour = new Date().getHours()
    if (hour >= 5 && hour < 9) timeTheme.value = 'morning'
    else if (hour >= 9 && hour < 17) timeTheme.value = 'noon'
    else if (hour >= 17 && hour < 20) timeTheme.value = 'dusk'
    else timeTheme.value = 'night'
  }

  const getTimeName = () => {
    const names = { morning: '卯时', noon: '午时', dusk: '酉时', night: '子时' }
    return names[timeTheme.value] || '午时'
  }

  applyTheme()
  updateTimeTheme()
  setInterval(updateTimeTheme, 60000)

  return { theme, timeTheme, setTheme, applyTheme, updateTimeTheme, getTimeName }
})
