# AGENTS.md — 云游博客项目入口

> 新对话开始时先读本文件，再读 `PROJECT_MEMORY.md` 的「当前快照」。
> 本文件只写**长期稳定**的规则；会变的事实一律进 `PROJECT_MEMORY.md`。

## 1. 项目是什么

- **名称**：云游博客（YunYou），个人博客前端。
- **定位**：记录技术、生活与修行；视觉走**中式古风 + 敦煌壁画**路线。
- **形态**：纯前端单页应用（SPA），**当前无后端、无数据库、无登录**，所有数据来自 `src/mock/data.js`，用户行为（收藏/点赞/签到/阅读设置）存 `localStorage`。
- **技术栈**：Vue 3（`<script setup>`）+ Vite 8 + Pinia 4 + Vue Router 5；Markdown 渲染用 `marked`，代码高亮用 `highlight.js`，动效用 `animejs` 与 `@vueuse/core`。无 TypeScript、无测试框架、无 ESLint/Prettier 配置。

## 2. 关键目录

```
YunYou/
├── AGENTS.md              ← 本文件（新对话入口）
├── PROJECT_MEMORY.md      ← 当前快照 / 决定 / 状态 / 历史
└── frontend/              ← 全部代码都在这里
    ├── index.html
    ├── package.json       ← 脚本只有 dev / build / preview
    ├── vite.config.js      ← 未配置代理、别名、端口
    ├── public/            ← favicon、icons.svg、背景图、reference.png
    └── src/
        ├── main.js / App.vue        ← 入口、全局布局、快捷键(Ctrl+K 搜索)
        ├── router/index.js          ← 全部路由与标题前缀「- 云游博客」
        ├── stores/                   ← app.js(签到/积分/收藏/点赞)、theme.js(主题/时辰)
        ├── mock/data.js              ← 唯一数据源（文章/分类/标签/评论/友链/诗句）
        ├── utils/index.js            ← 中文日期、数字大写、阅读时长、时辰等工具
        ├── assets/styles/            ← variables.css(设计变量) + main.css
        ├── components/layout/        ← Navbar / Footer / Sidebar
        ├── components/common/       ← 卡片、目录、搜索框、墨鼠、印章、节气装饰等
        └── views/                    ← 首页/文章详情/分类/标签/归档/关于/友链/留言/画阁/诗苑/节气志/404
```

## 3. 开始工作时按顺序读

1. 本文件 + `PROJECT_MEMORY.md` 的「当前快照」与「下一步边界」。
2. `frontend/src/router/index.js` —— 知道有哪些页面。
3. `frontend/src/assets/styles/variables.css` —— 配色/字体/圆角/字号的唯一真源，**改样式先改这里的 CSS 变量**，不要在组件里另造色值。
4. 你要动的那个 `views/*.vue` 或 `components/**/*.vue`。
5. 涉及数据再读 `frontend/src/mock/data.js`。

## 4. 执行方式与授权边界

- **工作目录**：只在 `D:\ruanjian\wangluo\idea\xiangmu\YunYou\` 内操作。**不读写项目外的任何文件**，不主动碰用户其他项目、系统目录、全局配置。
- **本项目当前无 Git 仓库**（已核实根目录与 `frontend/` 下都没有 `.git`）。不要擅自 `git init`、不要提交、不要生成远端链接；需要版本管理时先问用户。
- **本轮（2026-10-13）用户明确授权范围**：仅整理 `AGENTS.md` 与 `PROJECT_MEMORY.md` 两份文档，**不改产品代码、不改素材、不改部署配置**。后续每轮新指令以用户原话为准。
- 默认在 Windows + PowerShell 环境执行；前端命令在 `frontend/` 下跑：`npm run dev` / `npm run build` / `npm run preview`。
- 高风险动作（删文件、动 `public/` 下大图、改 `index.html` 的字体/标题、引入新依赖）先说明再做。

## 5. 修改规范

- **数据**：目前唯一数据源是 `src/mock/data.js`。加文章/分类/标签就改这里，不要新建第二份数据文件；后续若接后端，再整体替换这层。
- **样式**：颜色、字体、圆角、过渡时长一律用 `variables.css` 里的变量；双主题（默认敦煌暖 / `[data-theme="yueye"]` 月夜冷）都要同步覆盖，不能只改一套。
- **新页面**：先在 `router/index.js` 加路由与 `meta.title`（标题会自动拼成「页面名 - 云游博客」），再写 `views/` 下的组件。
- **组件命名**：布局类放 `components/layout/`，可复用小部件放 `components/common/`；图标用 `public/icons.svg` 已有的 SVG，不要引入 emoji 当正式图标（mock 数据里的 ⚡🏮 等是占位，正式界面不要扩散）。
- **文案**：站点名「云游博客」、栏目名（画阁/诗苑/节气志/关于/友链/留言板）是既定叫法，不要改成「相册/诗歌/天气」之类的通用名。
- **提交前自检**：本地 `npm run build` 能过；首页、文章详情、404 至少在浏览器里各看一眼。

## 6. 完成标准

一次任务算做完，必须同时满足：

1. 用户本轮点名的改动全部落地，且没有顺手改他没让你动的文件。
2. `npm run build` 通过（若动了前端代码）。
3. 改到的页面在浏览器里实际打开看过，而不是只凭读代码推断。
4. 若过程中确认了新决定、踩了新坑、或某状态发生变化，**同步更新 `PROJECT_MEMORY.md`**（见下条）。
5. 回复里说明：改了哪些文件、怎么验证的、还有什么没验证。

## 7. 何时更新项目记忆

每次对话结束前，若出现以下任一情况，**必须**更新 `PROJECT_MEMORY.md`，不要等用户提醒：

- 用户拍板了某个之前「待确认」的问题；
- 新做了一个页面/组件并已让用户看过；
- 踩到一个会复发的坑（依赖、样式兼容、构建、浏览器行为）；
- 推翻了之前的做法（在历史里把旧条目标为「已失效」，不要直接删）；
- 下一步要做的事变了。

更新规则：**新结论写在前面，旧事实标注「已于 YYYY-MM-DD 被 X 取代」，不要静默覆盖。**
