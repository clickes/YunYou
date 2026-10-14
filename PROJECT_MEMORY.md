# PROJECT_MEMORY.md — 云游博客项目记忆

> 本文件记录**会变**的事实。长期规则见 `AGENTS.md`。
> 证据等级标注：
> - 【代码事实】本轮（2026-10-13）我亲自读过源码/目录核实。
> - 【本轮用户明确】本轮对话用户原话。
> - 【用户已确认】历史对话中用户拍板过（**来源会话已不可考，待用户复核**）。
> - 【AI 观察】我从代码推断，但用户尚未确认。
> - 【待确认】信息缺失，不要据此行动。

---

## 一、当前快照（30 秒接手）

- **项目**：云游博客，Vue 3 + Vite 纯前端 SPA，位于 `frontend/`。【代码事实】
- **能不能跑**：`frontend/node_modules/` 与 `frontend/dist/` 都已存在，说明历史上装过依赖、打过包；**本轮未实际启动 dev server**，故「现在能不能直接 `npm run dev`」属【待确认】。
- **数据**：全部来自 `frontend/src/mock/data.js`（12 篇文章 / 5 分类 / 12 标签 / 1 篇示例评论 / 6 条友链占位 / 8 句随机诗）。【代码事实】
- **视觉**：双主题。默认「敦煌壁画」暖底（#F5EEDD 澄板土）+ 强调朱砂/泥金/石绿/石青；`[data-theme="yueye"]` 为洞窟夜景冷色。字体标题用 Ma Shan Zheng / ZCOOL XiaoWei，正文 Noto Serif SC。【代码事实】
- **已落地的玩法**（代码里都在）：每日签到 + 18 级科举等级（蒙童→文圣）、文章收藏/点赞、Ctrl+K 全局搜索、阅读模式（顶栏/底栏/装饰全部隐藏）、按时辰切换主题名（卯/午/酉/子）、墨点鼠标、点击盖章、落梅飘雪装饰、欢迎动画。【代码事实】
- **页面清单**：首页、文章详情、分类、标签、归档、关于、友链、留言板、画阁、诗苑、节气志、404。【代码事实，见 `src/router/index.js`】
- **未做 / 占位**：
  - 无后端、无登录、无真实评论提交（留言板组件存在，但提交落库逻辑【待确认】）。
  - `Footer.vue` 第 55 行 ICP 备案号仍是 `冀ICP备XXXXXXXX号` 占位。【代码事实】
  - `public/reference.png` 是设计参考图，**它对应哪一版设计、是否仍为现行方向【待确认】**。
  - 友链 `url` 全部是 `https://example.com` 占位。【代码事实】
- **版本管理**：**已于 2026-10-14 建立 Git 仓库并推送 GitHub**。远程 `origin` = `https://github.com/clickes/YunYou.git`（HTTPS，凭据走 gh 的 credential helper），分支 `main`，提交 `74263b2`（首次，59 文件）+ `1b334a8`（Pages 工作流）。【本轮实测】（旧事实「项目根与 `frontend/` 下均无 `.git`」**已于 2026-10-14 被 Git 初始化取代**。）
- **GitHub 仓库 / Pages**：`clickes/YunYou`（public）。Pages 站 <https://clickes.github.io/YunYou/>，`build_type=workflow`。**站点是 2026-10-14 用用户 PAT 走 `gh api --method POST repos/clickes/YunYou/pages -f build_type=workflow` 手工创建的**——首次跑 `actions/configure-pages@v5`（`enablement:true`）时 GITHUB_TOKEN 报 `Resource not accessible by integration`，建不了站。【本轮实测】
- **技能配置**：2026-10-14 跑过 `/setup-matt-pocock-skills`，产出 `docs/agents/issue-tracker.md`（GitHub 后端）/ `triage-labels.md`（默认五角色）/ `domain.md`（single-context），并在 `AGENTS.md` 末尾追加 `## Agent skills` 块；仓库标签已建齐 triage 五角色 + wayfinder 五个。【本轮实测】
- **遗留未做**：SSH key 已生成（`C:\Users\Administrator.DESKTOP-QV7CIK7\.ssh\id_ed25519`）但**尚未注册到 GitHub**——`gh` token 缺 `admin:public_key` scope，API 直接回 404；远程目前仍是 HTTPS。【本轮实测】
- **本机 gh 已装好 / 已登录 / 已接上 git**：`gh` 2.102.0（2026-10-14 经 winget 包 `GitHub.cli` 装到 `C:\Program Files\GitHub CLI\gh.exe`，机器级 PATH 已含该目录）；已登录 github.com 账号 **clickes**（token 存 keyring，协议 https，scopes：gist / read:org / repo / workflow）；`gh auth setup-git --hostname github.com` 已写入 `C:\Users\Administrator.DESKTOP-QV7CIK7\.gitconfig`。实测 `gh api user` 可用。【本轮实测】
- **临时文件（可直接删）**：项目根 `gh-setup-wizard.sh`（2026-10-14 新建）是装 gh 的一次性向导，**它那 4 个 stage 现在全部已完成**，文件已无用途，删掉即可。【本轮用户明确，位置由用户指定】

---

## 二、已确认决定及原因

> 说明：以下条目除特别标注外，均为「代码里已经这么写了」的事实；**当初是谁拍板、为什么拍板，本轮无对话记录可考**。落地存在 ≠ 用户已认可最终效果，故「是否已验收」单列在第三节。

| # | 决定 | 原因 / 依据 | 状态 |
|---|---|---|---|
| D1 | 前端选 Vue 3 + Vite + Pinia + Vue Router | 见 `package.json`；`<script setup>` 风格 | 【代码事实】已落地 |
| D2 | 不做 SSR / 不引入 TS / 不引测试框架 | `package.json` 中均无相关依赖；`vite.config.js` 极薄 | 【代码事实】已落地，是否长期维持【待确认】 |
| D3 | 文章正文用 Markdown（`marked`）+ 代码高亮（`highlight.js`） | `ArticleDetail.vue` 依赖；mock 内容即 Markdown | 【代码事实】已落地 |
| D4 | 视觉走敦煌壁画双主题（暖 default / 冷 yueye） | `variables.css` 两套完整变量 | 【代码事实】已落地；设计方向是否用户最终认可【待确认】 |
| D5 | 游戏化等级用古代科举体系（蒙童→文圣，共 18 级） | `stores/app.js` 中 levels 数组 | 【代码事实】已落地 |
| D6 | 用户行为（收藏/点赞/签到/阅读设置/主题）存 localStorage，不做账户体系 | `stores/app.js`、`stores/theme.js` | 【代码事实】已落地 |
| D7 | 站点中文名「云游博客」，栏目用古风名（画阁/诗苑/节气志） | `router/index.js` 的 meta.title 与 `index.html` | 【代码事实】已落地 |
| D8 | 本轮只整理两份记忆文档，不动产品代码/素材/部署 | 【本轮用户明确】原话："本轮只整理这两份文档，不修改产品代码、素材或部署配置" | 本轮生效 |
| D9 | 工作范围严格限定在当前项目文件夹内 | 【本轮用户明确】"本项目只在当前文件夹当中使用，不会涉及到其他的文件内容" | 长期生效 |

---

## 三、制作与验收状态

| 模块 | 文件 | 制作状态 | 验收状态 |
|---|---|---|---|
| 脚手架 / 路由 / 入口 | `index.html`, `main.js`, `App.vue`, `router/index.js` | 【代码事实】完整 | 是否在用户浏览器里看过最新版【待确认】 |
| 全局布局 | `components/layout/Navbar.vue` `Footer.vue` `Sidebar.vue` | 【代码事实】完整 | 同上 |
| 首页 | `views/Home.vue` | 【代码事实】存在 | 【待确认】 |
| 文章列表/详情 | `views/Category.vue` `Tag.vue` `Archive.vue` `ArticleDetail.vue` | 【代码事实】存在 | 【待确认】 |
| 特色栏目 | `views/Gallery.vue`(画阁) `Poetry.vue`(诗苑) `SolarTerms.vue`(节气志) | 【代码事实】存在 | 内容是否为最终文案【待确认】 |
| 互动 | `views/MessageBoard.vue` `Friends.vue` `About.vue` | 【代码事实】存在 | 留言板提交是否真的可用【待确认】 |
| 404 | `views/NotFound.vue` | 【代码事实】存在 | — |
| 游戏化 | `stores/app.js` 签到/积分/等级 | 【代码事实】逻辑完整 | 数值平衡是否合适【待确认】 |
| 主题 | `stores/theme.js` + `variables.css` 双主题 | 【代码事实】存在 | 月夜主题实际效果【待确认】 |
| 装饰组件 | InkCursor / SealClick / PlumBlossomSnow / WelcomeAnimation / SeasonDecoration / DailyPoem / AncientCalendar | 【代码事实】存在 | 是否过于花哨、影响阅读【待确认】 |
| 构建产物 | `frontend/dist/` | 【代码事实】存在 | 本轮未重新 build 验证 |
| ICP 备案号 | `Footer.vue:55` | 占位 `冀ICP备XXXXXXXX号` | **待用户提供真实备案号** |

> 注意：上表「待确认」不代表没做好，只代表**本轮对话里没有用户对这些模块的验收记录**。不要把它们当成 bug 去改。

---

## 四、踩过的坑 / 注意事项

> 本节只写「已经踩到、会复发」的。没有踩过的坑不要凑数。

- **K1【代码事实，观察】** `vite.config.js` 没有配置 `server.proxy`。将来若接后端 API，开发环境跨域需要在这里加代理，而不是去组件里硬编码 `http://localhost:8080`。
- **K2【代码事实，观察】** 所有数据都在 `mock/data.js` 里以 ESM 导出。接后端时不要在视图组件里散落 `fetch`，应先在这一层做数据访问抽象。
- **K3【代码事实，观察】** 主题切换依赖 `<html data-theme="yueye">` 选择器（见 `stores/theme.js`）。**新增 CSS 变量时必须在两套选择器里都声明**，否则月夜主题下会漏色。
- **K4【代码事实，观察】** `App.vue` 里全局注册了 `InkCursor`、`SealClick`、`SeasonDecoration`、`SiteStats`，阅读模式（`isReaderMode`）下会整批隐藏——加新的全局装饰组件时，记得决定它在阅读模式下要不要也隐藏。
- **K5【已于 2026-10-14 被 Git 初始化取代】** ~~项目**没有 Git**，任何"我帮你回退一下"类操作都做不到。~~ 现在有了：`main` 分支 + `origin` 远程，回退可行。**随之而来的新坑**：`frontend/dist/` 与 `node_modules/` 已被 `.gitignore` 排除，别指望从仓库里拿到构建产物；但 `frontend/public/` 下的大图**是进仓库的**（最大 `china-knot.png` 2.45MB），换图前留意仓库体积。另：`index.html:5` 引用的 `/vite.svg` 在 `public/` 里并不存在（实际是 `favicon.svg`），线上会有一个 404，属**既有问题、非本次引入**。
- **K6【代码事实】** `index.html` 直接从 Google Fonts 拉 `Noto Serif SC / Ma Shan Zheng / ZCOOL XiaoWei / JetBrains Mono`。国内网络环境下首屏可能慢或加载失败，是否换本地字体 / 国内 CDN【待确认】。
- **K7【本轮新发现，环境】** 本机**没装 WSL**：PATH 上的 `bash` / `sh` 是 Windows 的 WSL 存根，直接执行会失败（`execvpe(/bin/bash) failed: No such file or directory`）。要跑 shell 脚本请用 **Git Bash**：`D:\ruanjian\git\Git\bin\bash.exe`（bash 5.3.15）。若某次 shell 调用报 `EPERM` 拿不到子进程输出，直接改成「写临时脚本文件 + 用 Git Bash 执行」，比换写法反复重试快。

---

## 五、下一步边界（接下来能动什么、不能动什么）

**用户尚未指定下一步做什么。** 以下是基于代码现状列出的候选方向，**全部待用户拍板**，不要自动开工：

1. 是否要补一个真实后端（mock 文章 #1 标题提到「SpringBoot + Vue 前后端分离博客」，但仓库里**没有任何 Java 代码**，那段只是示例文章内容，不要据此推断后端已经计划好）。
2. 是否接入真实文章数据 / Markdown 文件目录，替换 `src/mock/data.js`。
3. ICP 备案号替换。
4. Google Fonts 在国内的加载方案。
5. ~~是否初始化 Git 并做首次提交。~~ **已于 2026-10-14 完成**（建仓 `clickes/YunYou` + Pages 自动部署）。
6. 留言板 / 评论是否要真的能提交（目前只有 mock 评论，仅文章 id=1 有数据）。
7. `reference.png` 是否仍是现行设计基准；若不是，新的视觉基准是什么。
8. 友链 `example.com` 占位是否替换为真实友链。

**明确不要做**（本轮及默认情况下）：

- 不要改产品代码、素材、部署配置——除非用户下一轮明确要求。
- 不要在项目外读写文件。
- 不要 `git init`、不要装新依赖、不要起 dev server 长挂着。

---

## 六、制作历史（可追溯）

> 规则：新记录追加在最上面；旧做法被取代时，把那一条划掉并注明"已于 YYYY-MM-DD 被 X 取代"，不要删除原文。

### 2026-10-14 — GitHub 仓库 + Pages 自动部署 + 技能套件初始化
- 用户拍板（原话）：「用 gh 给云游博客建仓库、推上去（这个项目目前还没有 Git）／把仓库接上 GitHub Pages / Actions 自动部署／配 SSH key 而不是 HTTPS」。
- 建仓：`git init -b main` → 首次提交 `74263b2`（59 文件）→ `gh repo create YunYou --public --source=. --remote=origin --push` → <https://github.com/clickes/YunYou>。Git 身份用 `clickes` / `123528660+clickes@users.noreply.github.com`（全局配置）。
- Pages：新增 `.github/workflows/deploy.yml`（Node 22 + `npm ci` + `VITE_BASE=/${{ github.event.repository.name }}/` + 复制 `dist/index.html` 为 `404.html` 兜底 SPA 深链）；`frontend/vite.config.js` 的 `base` 改为 `process.env.VITE_BASE || '/'`，本地开发行为不变。
- **坑（会复发）**：首次工作流失败在 `Setup Pages` 步 —— `Create Pages site failed. Error: Resource not accessible by integration`。**原因不是权限块写错**（`permissions: pages: write` 本来就在），而是**仓库从未开过 Pages，GITHUB_TOKEN 建不了站**。修法：用自己的 PAT 先跑 `gh api --method POST repos/clickes/YunYou/pages -f build_type=workflow` 把站点建出来，再重跑工作流即绿。
- SSH：生成了 `~/.ssh/id_ed25519`（ed25519，邮箱用 `123528660+clickes@users.noreply.github.com`），**但注册失败** —— `gh api --method POST /user/keys` 回 404，提示 token 需要 `admin:public_key` scope（当前只有 gist / read:org / repo / workflow）。需 `gh auth refresh -h github.com -s admin:public_key`，或到 <https://github.com/settings/ssh/new> 手工粘贴公钥。**远程目前仍是 HTTPS，未切换。**
- 技能：跑 `/setup-matt-pocock-skills`（后端选 GitHub）。建了 10 个标签（`wontfix` 是 GitHub 默认自带的，其余 9 个新建）；写 `docs/agents/` 三份文档 + `AGENTS.md` 末尾的 `## Agent skills` 块。
- **命名分歧（待用户确认）**：用户口述是「根目录的 `CONTEXT.md`」，但技能自身（`domain-modeling` 的 `GLOSSARY-FORMAT.md`）硬编码找的是 **`GLOSSARY.md`**，所以 `docs/agents/domain.md` 里按技能写成了 `GLOSSARY.md`。若确实想用 `CONTEXT.md`，要连 `docs/agents/domain.md` 的读取规则一起改。

### 2026-10-14 — 直接装好 GitHub CLI（gh 2.102.0）
- 用户连发三次 `/wizard 安装 gh cli`，追问后确认真实诉求是「直接装好」，于是不再只交脚本、改为代为安装。
- 执行：`winget install --id GitHub.cli --exact --source winget --accept-source-agreements --accept-package-agreements`；下载 `gh_2.102.0_windows_amd64.msi`，哈希校验通过，**未弹 UAC、未提权即装成功**（该 shell 进程 `IsInRole(Administrator)` 为 False）。
- 结果：`C:\Program Files\GitHub CLI\gh.exe`，`gh version 2.102.0 (2026-09-30)`；MSI 已把 `C:\Program Files\GitHub CLI\` 写进机器级 PATH。
- 验证：用「从注册表重建的 PATH」模拟新终端，PowerShell 与 Git Bash 下 `gh` 均可解析并报 2.102.0。
- 收尾（同日稍后）：用户自己在浏览器完成了 `gh auth login`，账号 **clickes**；我补跑 `gh auth setup-git --hostname github.com`，在 `~/.gitconfig` 写入 `credential.https://github.com.helper`（第一条是空值，作用是清掉继承来的 helper；第二条指向 `gh.exe auth git-credential`）。实测 `gh api user` 返回 `clickes` / 1 个公开仓库，token 有效。
- 本机 git 现状：系统级 `credential.helper=manager`（Git Credential Manager）仍在 `D:/ruanjian/git/Git/etc/gitconfig`；gitee 走 GCM、github.com 现在走 gh，两者互不干扰。
- 坑：用 `-contains "C:\Program Files\GitHub CLI"` 判断 PATH 会误报 False，因为**实际条目结尾带反斜杠**；应改按子串匹配。同轮我先据此误判成「PATH 未写入」。

### 2026-10-14 — 为安装 GitHub CLI 生成一次性 wizard 脚本
- 背景：用户要求装 gh cli（官方 <https://cli.github.com/>），并调用 `/wizard` 技能，要求做成「一步步带着人操作」的交互脚本，而不是丢一份命令清单。
- 产出：项目根 `gh-setup-wizard.sh`，共 4 个 stage：WinGet 安装 → 确认 gh 可用并补 PATH → 浏览器设备码登录 → 验证并 `gh auth setup-git`。
- 依据（已核对官方，非臆造）：官方 Windows 推荐 WinGet，包 id `GitHub.cli`（本机 winget 1.29.380 可见 2.102.0）；`gh auth login --hostname github.com --git-protocol https --web --clipboard`；`gh auth setup-git` 把 gh 设成 git 凭据助手；`gh auth status` 用于验证。
- 位置决定：用户选择放**项目根**（选项里还有用户主目录）。属一次性临时文件，跑完可删，不进产品代码。
- 验证：`bash -n` 通过；向导库（前 186 行）与技能模板 `template.sh` 逐行比对一致、未手改；**未端到端试跑**（它会开浏览器并阻塞等人输入）。
- 注意：本向导**不写 `.env`、不设 GitHub secrets**（纯安装 / 登录流程），所以 `finish` 的写入清单必然为空，不要以为漏了取值。

### 2026-10-13（晚 第七次）— 首页布局改为参考截图结构（保留敦煌配色）
- 用户上传 wjldarling.top 首页截图，要求"首页布局排版以图片为准"。
- 改动（视觉仍用敦煌暖棕配色，不切回粉色二次元）：
  - `Home.vue`：去掉全屏 hero 大字"云游"段和日历；改为：左侧主栏 = 轮播大图（右侧竖排圆点分页）→ 3 列分类快捷入口卡片（带箭头按钮）→ "查看更多…"链接 → 3 列文章卡片网格；右侧 = Sidebar。
  - `Sidebar.vue`：profile 卡下方新增"公告栏"卡片（主域名/备用域名/欢迎语）。
  - `ArticleCard.vue`：封面底部加 V 形斜切（clip-path polygon），与参考图一致。
- 验证：`npm run build` 通过（1.23s），Home.js 7.79KB。
- 注意：WelcomeAnimation 入口动画保持不变（原版 welcome-bg.jpg）。

### 2026-10-13（晚 第六次）— 用户要求回滚 Butterfly 改版
- 用户原话："回归所有的改动"。
- 已将以下 7 个文件恢复为本轮改版前的敦煌原版：
  - `variables.css`（敦煌暖棕配色）
  - `Navbar.vue`（灯笼/飘带/印章/主题切换面板）
  - `Home.vue`（hero + 轮播 + 公告栏 + 日历 + 友链段）
  - `ArticleCard.vue`（角花装饰 + 斜切分类标签）
  - `Sidebar.vue`（profile 卡 + 搜索 + 诗 + 分类 + 标签云 + 热门 + 评论）
  - `Tag.vue`、`Category.vue`（莲座装饰 + 渐变飘带）
- 注意：`Category.vue` 当时改版前只 Read 了前 60 行，恢复时按同类页 Tag.vue 的样式模式重建，可能与原始 CSS 细节有微小出入，但视觉风格与结构一致。
- 验证：`npm run build` 通过（1.30s），Home.js 恢复到 17.5KB（改版后是 5.7KB）。
- 当前状态：项目回到本轮 Butterfly 改版前的敦煌古风。

### 2026-10-13（晚 第五次）— 整体视觉转向：仿 wjldarling.top (Hexo Butterfly)
- 用户要求仿照 https://wjldarling.top/ 重做所有页面，静态 UI + 路由跳转，不做后端，预留接口。
- 参考站是 Hexo Butterfly 主题，二次元/Zero Two 粉色风：全屏 hero（头像+站名+打字机欢迎语+文章/标签/分类统计）+ 左侧白卡片文章流 + 右侧边栏分类/最新文章/标签云；标签页是胶囊云，分类页是卡片网格。
- 本轮已改文件：
  - `assets/styles/variables.css`：敦煌暖棕 → #f6f8fa 浅灰底 + 白卡片 + 玫瑰粉 #ec6a8f 强调，无衬线字体，10px 圆角。
  - `components/layout/Navbar.vue`：透明叠 hero → 滚动后白底毛玻璃，删灯笼/飘带/印章装饰。
  - `components/common/ArticleCard.vue`：白圆角卡片封面在上，日期+分类+标题+摘要+标签+详情按钮。
  - `components/layout/Sidebar.vue`：分类列表+最新文章+标签云，删 profile 卡（已挪到 hero）。
  - `views/Home.vue`：全屏 hero（plum-snow-bg.jpg 背景 + 圆形头像"云" + 站名 + 打字机欢迎语 + 三统计）+ 两栏文章流；删轮播/公告/日历/友链段。
  - `views/Tag.vue`、`views/Category.vue`：清掉敦煌装饰，改干净白卡片样式。
- 未动（仍为敦煌旧样式，待下一轮）：Archive/About/Friends/MessageBoard/ArticleDetail/Gallery/Poetry/SolarTerms/NotFound/Footer。
- 数据层 `mock/data.js` 未改，后续接后端时替换这层即可（用户要求预留接口）。
- 验证：`npm run build` 通过（1.14s）。

### 2026-10-13（晚 第四次）— 用户要求回退 WelcomeAnimation 到改版前
- 用户原话："进入的动画还是重新更换回没有改版之前的样子"。
- 已将 `WelcomeAnimation.vue` 完整恢复为本轮对话开始前的版本：`/welcome-bg.jpg` 背景图 + 月亮光晕 + 飘雾 + 水面波光 + 星星/萤火虫 + "云游博客"标题 + "且将新火试新茶·诗酒趁年华"副标 + 诗句 + 进度条。
- 之前三版敦煌风（橄榄棕底/金日/卷云/青绿山峰）全部废弃，未保留。
- 验证：`npm run build` 通过。

### 2026-10-13（晚 第三次）— 按视频帧高保真重做 WelcomeAnimation
- 用户提供录屏视频（约 11 秒，录屏同一个敦煌毕设网站）。用 opencv 抽 11 帧看清楚后重写。
- 视频关键帧：f00-f03 是进入 hero（橄榄棕底 + 浓金云团 + 右侧金日同心环 + 白色飞白"敦煌之美" + 底部青绿尖峰 + 莲瓣）；f04 之后是进入后的九色鹿横幅（蓝色背景 + 橙红横幅 + 白鹿）。本次只重做进入动画，未做九色鹿段。
- 本版新增：右侧浓金云团（4 个径向渐变椭圆叠加，右 55% 宽）+ 左侧淡云团；太阳同心环加到 4 圈；近山改成尖峰锯齿；莲瓣加大加叶脉；金尘加到 40 粒。
- 验证：`npm run build` 通过（757ms）。待用户实机看效果。

### 2026-10-13（晚 第二次）— 按参考图高保真重做 WelcomeAnimation
- 用户要求"完全仿照图片"重生成。改动仍只动 `WelcomeAnimation.vue`。
- 相比上一版：底色改为橄榄棕四段渐变（#4A3A20→#7A6038）；右侧金日加三层同心细环；云霭改为 1920×1080 整幅 SVG 流云+卷云螺旋；山峦加右侧莲瓣大叶（带金色叶脉）+ 白点雪斑；标题改为四字"云游四方"横扫；英文副标改为 "A WANDERER'S JOURNEY"（等宽字体加字距）；鼠标 X/Y 双轴视差（云层 -60px、金日反向 +30px）。
- 验证：`npm run build` 通过（1.67s）。仍未实机看动效，待用户验收。

### 2026-10-13（晚）— 重做首页进入动画 WelcomeAnimation
- 来源：用户提供参考图（B站《敦煌之美》毕设截图），要求按图重做进入动画，文字替换为云游博客内容，云霭随鼠标滑动两边散开，营造"拨开云雾进入"的感觉。
- 改动文件：`frontend/src/components/common/WelcomeAnimation.vue`（整文件重写）。
- 新动画要点：
  - 深褐径向底（#7A5A30→#3A2A1A），右侧日光光晕 + 核心暖球。
  - 左右两组金色 SVG 卷云；`mousemove` 把鼠标 X 归一到 -1..1，左云 `translateX(-mouseX*90px)`、右云 `translateX(+mouseX*90px)`，云霭随鼠标向两侧退开。
  - 底部三层青绿山峦（#3A6A6A / #2A5A6A / #1F4A5A）+ 金色苔点。
  - 中央：英文小标 "THE WANDERER'S BLOG" → 大字"云游"（Ma Shan Zheng，逐字上浮入）→ 副标"山不在高·有仙则名"→ 呼吸提示"拨开云霭·点击进入"。
  - 点击任意处退出；4.5 秒自动退出。
- 验证：`npm run build` 通过（712ms）。**未在浏览器实机看过动效与鼠标跟随手感，待用户验收。**
- 未改：Home.vue 调用方式不变（无 props）；其他页面、样式变量、数据均未动。

### 2026-10-13 — 首次建立项目记忆
- 来源：本轮对话，用户要求整理 `AGENTS.md` 与 `PROJECT_MEMORY.md`。
- 我做了什么：实地扫描项目目录、阅读 `package.json` / `router` / `App.vue` / `stores` / `variables.css` / `mock/data.js` / `utils` / `index.html`；确认无 Git、无既有 Markdown 文档（除 `frontend/README.md` 是 Vite 模板默认文案）；在项目根新建 `AGENTS.md`、`PROJECT_MEMORY.md`。
- 未做：未启动 dev server、未 build、未改任何 `.vue` / `.js` / `.css` 文件。
- 遗留：历史对话中关于本项目的设计决策过程（为什么选敦煌风、为什么做科举等级、参考图是哪一版）**本轮无记录可考**，已在文中标为【待确认】，等用户补充。

### —— 2026-10-13 之前 ——
- **状态：不可考。** 仓库内没有任何提交历史、CHANGELOG、README 之外的说明文档。
- 能从代码反推的：前端工程已搭好、双主题已写、主要视图已写、已 build 过一次（存在 `dist/`）。
- **不要凭"听起来像"补这段历史。** 等用户口述或提供资料后再回填。
