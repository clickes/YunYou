export const categories = [
  { id: 1, name: '技术修行', description: '编程技术与开发心得', icon: '⚡', articleCount: 12 },
  { id: 2, name: '生活随笔', description: '日常生活的感悟与记录', icon: '🍃', articleCount: 8 },
  { id: 3, name: '读书笔记', description: '读过的书与思考', icon: '📖', articleCount: 6 },
  { id: 4, name: '古风雅韵', description: '传统文化与古典美学', icon: '🏮', articleCount: 5 },
  { id: 5, name: '项目实战', description: '个人项目与作品', icon: '⚔️', articleCount: 4 }
]

export const tags = [
  { id: 1, name: 'Vue', count: 8 }, { id: 2, name: 'SpringBoot', count: 6 },
  { id: 3, name: 'JavaScript', count: 7 }, { id: 4, name: 'Java', count: 5 },
  { id: 5, name: 'MySQL', count: 4 }, { id: 6, name: 'Docker', count: 3 },
  { id: 7, name: '古风', count: 5 }, { id: 8, name: '生活', count: 6 },
  { id: 9, name: '读书', count: 4 }, { id: 10, name: 'Linux', count: 3 },
  { id: 11, name: 'CSS', count: 4 }, { id: 12, name: '算法', count: 3 }
]

export const articles = [
  { id: 1, title: 'SpringBoot + Vue 前后端分离博客开发记', summary: '从零开始搭建一个个人博客，记录技术选型、架构设计、开发过程中遇到的坑与解决方案。本文涵盖后端接口设计、前端页面实现、部署上线全流程。', content: '## 前言\n\n作为一名程序员，拥有一个自己的博客是一件很有意义的事情。本文记录我从零搭建个人博客的全过程。\n\n## 技术选型\n\n后端选择 SpringBoot，前端选择 Vue 3，数据库使用 MySQL。\n\n```java\n@SpringBootApplication\npublic class BlogApplication {\n    public static void main(String[] args) {\n        SpringApplication.run(BlogApplication.class, args);\n    }\n}\n```\n\n## 架构设计\n\n采用前后端分离架构，后端提供 RESTful API，前端通过 Axios 调用接口。\n\n## 总结\n\n博客开发是一个持续迭代的过程，后续会不断优化功能和体验。', category: '技术修行', tags: ['Vue', 'SpringBoot', 'Java'], author: '云游', date: '2024-08-20', views: 1256, likes: 89, comments: 23, cover: null, wordCount: 3500 },
  { id: 2, title: 'Vue 3 组合式 API 最佳实践', summary: '深入探讨 Vue 3 组合式 API 的使用技巧，包括 setup 语法糖、响应式原理、自定义 Hook 封装、性能优化等方面的最佳实践。', content: '## 组合式 API 简介\n\nVue 3 引入的组合式 API 让代码组织更加灵活。\n\n## ref 与 reactive\n\n```javascript\nimport { ref, reactive } from \'vue\'\nconst count = ref(0)\nconst state = reactive({ name: \'云游\', level: \'蒙童\' })\n```\n\n## 自定义 Hook\n\n将可复用的逻辑封装成自定义 Hook。\n\n## 总结\n\n合理使用组合式 API 可以让代码更清晰、更易维护。', category: '技术修行', tags: ['Vue', 'JavaScript'], author: '云游', date: '2024-08-15', views: 892, likes: 67, comments: 15, cover: null, wordCount: 2800 },
  { id: 3, title: '中国古代科举制度漫谈', summary: '从童生到状元，深入解析中国古代科举制度的层级体系，探讨各阶段的考试内容、晋升条件以及科举制度背后的文化内涵与社会影响。', content: '## 科举制度概览\n\n科举制度是中国古代选拔官员的重要制度，延续了一千三百余年。\n\n## 童生试\n\n科举的起点，通过县试、府试、院试，考取秀才功名。\n\n## 乡试\n\n每三年在各省省城举行，考中者为举人，第一名称解元。\n\n## 会试\n\n乡试次年在京城举行，考中者为贡士，第一名称会元。\n\n## 殿试\n\n由皇帝亲自主持，分三甲录取，一甲三名赐进士及第，分别为状元、榜眼、探花。\n\n## 总结\n\n科举制度不仅是选拔机制，更是中国传统文化的重要组成部分。', category: '古风雅韵', tags: ['古风', '读书'], author: '云游', date: '2024-08-10', views: 2341, likes: 156, comments: 45, cover: null, wordCount: 4200 },
  { id: 4, title: 'MySQL 性能优化实战指南', summary: '从索引优化、查询优化、配置优化三个维度，分享 MySQL 数据库性能优化的实战经验，包含具体案例和性能对比数据。', content: '## 索引优化\n\n合理使用索引是提升查询性能的关键。\n\n```sql\nCREATE INDEX idx_title ON articles(title);\n```\n\n## 查询优化\n\n避免 SELECT *，使用 EXPLAIN 分析执行计划。\n\n## 配置优化\n\n调整 innodb_buffer_pool_size 等关键参数。\n\n## 总结\n\n性能优化是一个持续的过程，需要结合实际场景。', category: '技术修行', tags: ['MySQL', 'Java'], author: '云游', date: '2024-08-05', views: 756, likes: 52, comments: 12, cover: null, wordCount: 3100 },
  { id: 5, title: '读《红楼梦》有感', summary: '曹雪芹的《红楼梦》是中国古典小说的巅峰之作，本文分享阅读过程中的感悟，探讨贾宝玉这个角色的魅力以及小说背后的人生哲理与文化内涵。', content: '## 初入红楼\n\n贾宝玉出身名门，却厌恶功名，追求真性情。\n\n## 木石前盟\n\n宝玉与黛玉的爱情，是前世的缘分，也是今生的悲剧。\n\n## 世事洞明\n\n红楼梦中的人情世故，是中国传统社会的缩影。\n\n## 总结\n\n《红楼梦》不仅是一部小说，更是一部中国传统文化的百科全书。', category: '读书笔记', tags: ['读书', '古风'], author: '云游', date: '2024-07-28', views: 1876, likes: 123, comments: 34, cover: null, wordCount: 2600 },
  { id: 6, title: 'Docker 容器化部署实践', summary: '记录使用 Docker 容器化部署应用的完整流程，包括 Dockerfile 编写、docker-compose 编排、镜像优化、数据持久化等实战内容。', content: '## Docker 简介\n\nDocker 让应用部署变得简单高效。\n\n## Dockerfile 编写\n\n```dockerfile\nFROM openjdk:21\nCOPY target/app.jar /app.jar\nENTRYPOINT ["java", "-jar", "/app.jar"]\n```\n\n## docker-compose\n\n使用 compose 编排多容器应用。\n\n## 总结\n\n容器化是现代部署的标配技能。', category: '技术修行', tags: ['Docker', 'Linux'], author: '云游', date: '2024-07-20', views: 634, likes: 41, comments: 8, cover: null, wordCount: 2900 },
  { id: 7, title: '生活中的小确幸', summary: '记录生活中那些让人感到温暖的小瞬间，一杯茶、一本书、一个午后，平凡日子里的诗意与美好。', content: '## 清晨的茶\n\n早晨泡一杯清茶，看茶叶在杯中舒展。\n\n## 午后的书\n\n阳光透过窗户，翻开一本好书。\n\n## 夜晚的静\n\n夜深人静，听虫鸣蛙叫。\n\n## 总结\n\n生活的美好藏在细节里。', category: '生活随笔', tags: ['生活'], author: '云游', date: '2024-07-15', views: 423, likes: 78, comments: 19, cover: null, wordCount: 1500 },
  { id: 8, title: 'JavaScript 异步编程完全指南', summary: '从回调函数到 Promise，再到 async/await，全面梳理 JavaScript 异步编程的演进历程和最佳实践，包含大量示例代码。', content: '## 回调函数\n\n异步编程的起点，回调地狱是痛点。\n\n## Promise\n\n```javascript\nconst promise = new Promise((resolve, reject) => {\n  setTimeout(() => resolve(\'成功\'), 1000)\n})\n```\n\n## async/await\n\n让异步代码看起来像同步代码。\n\n## 总结\n\n掌握异步编程是前端进阶的必经之路。', category: '技术修行', tags: ['JavaScript', 'Vue'], author: '云游', date: '2024-07-10', views: 987, likes: 76, comments: 21, cover: null, wordCount: 3800 },
  { id: 9, title: 'CSS 高级技巧与动画实现', summary: '分享 CSS 高级技巧，包括变量、网格布局、滤镜、混合模式、关键帧动画等，用纯 CSS 实现炫酷的视觉效果。', content: '## CSS 变量\n\n```css\n:root { --primary-color: #C9A961; }\n```\n\n## 关键帧动画\n\n```css\n@keyframes float {\n  0%, 100% { transform: translateY(0); }\n  50% { transform: translateY(-10px); }\n}\n```\n\n## 总结\n\nCSS 的能力远超想象。', category: '技术修行', tags: ['CSS', 'JavaScript'], author: '云游', date: '2024-07-05', views: 567, likes: 45, comments: 11, cover: null, wordCount: 2400 },
  { id: 10, title: '我的第一个开源项目', summary: '记录开发第一个开源项目的心路历程，从想法萌生到代码实现，再到发布上线，分享开源过程中的收获与成长。', content: '## 想法萌生\n\n一直想做一个有趣的小工具。\n\n## 开发过程\n\n利用业余时间，断断续续开发了一个月。\n\n## 发布上线\n\n在 GitHub 上发布，获得了一些 star。\n\n## 总结\n\n开源是一种很棒的学习方式。', category: '项目实战', tags: ['JavaScript', 'Vue'], author: '云游', date: '2024-06-28', views: 712, likes: 63, comments: 17, cover: null, wordCount: 2000 },
  { id: 11, title: '算法学习之路', summary: '分享算法学习的方法和心得，从基础数据结构到经典算法，再到刷题技巧，记录从零开始的算法进阶之路。', content: '## 为什么学算法\n\n算法是程序员的基本功。\n\n## 学习路线\n\n数据结构 → 经典算法 → 刷题实战。\n\n## 刷题技巧\n\n按题型分类练习，总结模板。\n\n## 总结\n\n算法学习没有捷径，唯有坚持。', category: '技术修行', tags: ['算法', 'Java'], author: '云游', date: '2024-06-20', views: 445, likes: 38, comments: 9, cover: null, wordCount: 2200 },
  { id: 12, title: '中国古代文人四友赏析', summary: '琴棋书画，古代文人修身养性的四般雅事，从古琴的悠扬到围棋的玄妙，从书法的气韵到绘画的意境，探讨文人四友背后的文化渊源与美学追求。', content: '## 琴\n\n古琴是中国最古老的弹拨乐器之一，音色清幽，寄托文人情怀。\n\n## 棋\n\n围棋起源于中国，黑白之间蕴含无穷变化，是智慧的博弈。\n\n## 书\n\n书法是汉字的书写艺术，一笔一画间见功力，见性情。\n\n## 画\n\n中国画讲究意境，山水花鸟，笔墨丹青，气韵生动。\n\n## 总结\n\n文人四友不仅是技艺，更是中国传统文人精神的体现。', category: '古风雅韵', tags: ['古风'], author: '云游', date: '2024-06-15', views: 1567, likes: 98, comments: 28, cover: null, wordCount: 3000 }
]

export const comments = {
  1: [
    { id: 1, author: '文友甲', avatar: null, content: '写得很详细，学到了！', date: '2024-08-21', likes: 5, replies: [] },
    { id: 2, author: '文友乙', avatar: null, content: '请问部署的时候遇到跨域问题怎么解决？', date: '2024-08-21', likes: 3, replies: [
      { id: 3, author: '云游', avatar: null, content: '后端配置 CorsConfig 或者前端用代理即可。', date: '2024-08-21', likes: 2, isAuthor: true }
    ] }
  ]
}

export const friends = [
  { id: 1, name: '张三的博客', url: 'https://example.com', desc: '一个热爱技术的程序员', avatar: null, category: '技术博客' },
  { id: 2, name: '李四随笔', url: 'https://example.com', desc: '记录生活的点点滴滴', avatar: null, category: '生活随笔' },
  { id: 3, name: '古风阁', url: 'https://example.com', desc: '专注传统文化分享', avatar: null, category: '文化相关' },
  { id: 4, name: '设计灵感集', url: 'https://example.com', desc: '收集优秀的设计作品', avatar: null, category: '设计相关' },
  { id: 5, name: '前端小站', url: 'https://example.com', desc: '前端技术分享与教程', avatar: null, category: '技术博客' },
  { id: 6, name: '读书笔记', url: 'https://example.com', desc: '每本书都有收获', avatar: null, category: '生活随笔' }
]

export const poems = [
  '山不在高，有仙则名。水不在深，有龙则灵。',
  '路漫漫其修远兮，吾将上下而求索。',
  '天行健，君子以自强不息。',
  '千淘万漉虽辛苦，吹尽狂沙始到金。',
  '宝剑锋从磨砺出，梅花香自苦寒来。',
  '不积跬步，无以至千里；不积小流，无以成江海。',
  '长风破浪会有时，直挂云帆济沧海。',
  '会当凌绝顶，一览众山小。'
]

export const getRandomPoem = () => poems[Math.floor(Math.random() * poems.length)]
export const getArticleById = (id) => articles.find(a => a.id === parseInt(id))
export const getArticlesByCategory = (category) => articles.filter(a => a.category === category)
export const getArticlesByTag = (tag) => articles.filter(a => a.tags.includes(tag))
export const searchArticles = (keyword) => {
  const kw = keyword.toLowerCase()
  return articles.filter(a => a.title.toLowerCase().includes(kw) || a.summary.toLowerCase().includes(kw) || a.tags.some(t => t.toLowerCase().includes(kw)) || a.category.toLowerCase().includes(kw))
}
export const getHotArticles = (limit = 5) => [...articles].sort((a, b) => b.views - a.views).slice(0, limit)
export const getArchives = () => {
  const result = {}
  const sorted = [...articles].sort((a, b) => new Date(b.date) - new Date(a.date))
  sorted.forEach(article => {
    const [year, month] = article.date.split('-')
    if (!result[year]) result[year] = { articles: [], months: {} }
    result[year].articles.push(article)
    if (!result[year].months[month]) result[year].months[month] = []
    result[year].months[month].push(article)
  })
  return result
}
