<template>
  <div class="scroll-reveal" :class="{ unfolded: isUnfolded }">
    <div class="scroll-rod rod-top">
      <div class="rod-cap left"></div>
      <div class="rod-body"></div>
      <div class="rod-cap right"></div>
    </div>
    <div class="scroll-content-wrapper">
      <div class="scroll-content">
        <slot></slot>
      </div>
    </div>
    <div class="scroll-rod rod-bottom">
      <div class="rod-cap left"></div>
      <div class="rod-body"></div>
      <div class="rod-cap right"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  delay: { type: Number, default: 200 },
  autoPlay: { type: Boolean, default: true }
})

const isUnfolded = ref(false)

onMounted(() => {
  if (props.autoPlay) {
    setTimeout(() => { isUnfolded.value = true }, props.delay)
  }
})

const unfold = () => { isUnfolded.value = true }
const fold = () => { isUnfolded.value = false }

defineExpose({ unfold, fold })
</script>

<style scoped>
.scroll-reveal {
  position: relative;
  margin: 1rem 0;
}
.scroll-rod {
  display: flex;
  align-items: center;
  height: 20px;
  position: relative;
  z-index: 2;
}
.rod-body {
  flex: 1;
  height: 14px;
  background: linear-gradient(180deg, #8B6914 0%, #C9A961 30%, #D4AF37 50%, #C9A961 70%, #8B6914 100%);
  border-radius: 2px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3);
}
.rod-cap {
  width: 16px;
  height: 20px;
  background: linear-gradient(180deg, #5C3A1E, #8B5A2B, #5C3A1E);
  border-radius: 3px;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
}
.rod-cap.left { margin-right: -2px; }
.rod-cap.right { margin-left: -2px; }
.scroll-content-wrapper {
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--bg-card);
  border-left: 2px solid var(--accent-gold);
  border-right: 2px solid var(--accent-gold);
  margin: 0 8px;
}
.scroll-reveal.unfolded .scroll-content-wrapper {
  max-height: 2000px;
}
.scroll-content {
  padding: 1.5rem;
  opacity: 0;
  transform: scaleY(0.8);
  transform-origin: top;
  transition: opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s;
}
.scroll-reveal.unfolded .scroll-content {
  opacity: 1;
  transform: scaleY(1);
}
.rod-top { transform: translateY(4px); }
.rod-bottom { transform: translateY(-4px); }
</style>
