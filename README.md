# Magento China — 静态网站项目

> 域名：https://www.magentochina.org/
> 部署平台：阿里云 EdgeOne Pages / Cloudflare Pages

Magento 2 中文社区门户与文档中心，为中文商家和开发者提供 Magento 2 的商业介绍、技术文档和社区资源。

## 项目概述

本站是一个纯静态网站，无后端依赖，所有页面均由原生 HTML + CSS + JavaScript 构建，适配 Cloudflare Pages 的最佳实践。

### 网站结构

| 页面 | 文件 | 说明 |
|------|------|------|
| 首页 | `index.html` | 商家视角介绍 Magento 2（定位、核心能力、适用场景、版本对比） |
| 文档 | `docs.html` | 统一技术文档页（10 大分类，含安装指南、架构、模块开发等） |
| 社区 | `community.html` | 社区入口与资源导航 |
| 关于 | `about.html` | 关于本站与 Magento China 社区 |

### 设计风格

- 主题色：Magento 橙色 `#f26322` + 深色 `#1a1a2e`
- 响应式布局：3 档断点（1024px / 768px / 480px）
- 组件：Tab 导航（安装方式切换）、折叠面板、IntersectionObserver 滚动动画

### 文档页分类（参考 Mage-OS / Adobe Commerce 官方体系）

1. 入门指南
2. 安装指南（Composer / Docker / Git / 归档包 / 本地开发 5 种方式）
3. 基本配置
4. 架构概览
5. 模块开发
6. 前端开发
7. API 参考
8. 安全与性能
9. CLI 命令
10. 资源

## 文件结构

```
├── index.html              # 首页
├── docs.html               # 技术文档（统一页面）
├── community.html          # 社区页
├── about.html              # 关于页
├── favicon.svg             # 站点图标
├── package.json            # npm 构建配置（部署平台需要）
├── build.js                # 构建脚本（复制静态文件到 dist/）
├── assets/
│   ├── css/
│   │   └── style.css       # 全站样式（含变量、组件、布局）
│   └── js/
│       └── main.js         # 全站脚本（动画、Tab、折叠、搜索）
├── _headers                # Cloudflare Pages 安全头 + 缓存策略
├── _redirects              # Cloudflare Pages 301 重定向
├── sitemap.xml             # SEO 站点地图
├── robots.txt              # SEO 爬虫规则
```

## 部署方式

### 阿里云 EdgeOne Pages 部署

平台要求 npm 构建流程，本项目通过 `package.json` + `build.js` 满足要求：

1. 登录阿里云 EdgeOne Pages 控制台
2. 创建新项目，连接 GitHub 仓库（`https://github.com/shuaiZend/mtc`）
3. 构建配置：
   - **构建命令**：`npm run build`
   - **构建输出目录**：`dist`
   - **Node.js 版本**：18 或更高
4. 部署完成后，绑定自定义域名

构建脚本 `build.js` 仅将静态文件复制到 `dist/` 目录，无需任何前端框架。

### Cloudflare Pages 部署

本项目专为 Cloudflare Pages 设计，部署步骤如下：

#### 方式一：Git 仓库自动部署（推荐）

1. 将本项目推送到 GitHub / GitLab 仓库
2. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
3. 创建新项目，连接 Git 仓库
4. 构建配置：
   - **构建命令**：留空（纯静态站无需构建）
   - **构建输出目录**：`/`（根目录）
5. 部署完成后，绑定自定义域名 `www.magentochina.org`

#### 方式二：Direct Upload 手动部署

1. 登录 [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
2. 创建新项目 → 选择 **Direct Upload**
3. 上传整个项目目录
4. 部署完成后，绑定自定义域名

### 域名配置

在 Cloudflare Dashboard 中：

1. 进入 Pages 项目 → Custom domains
2. 添加 `www.magentochina.org`
3. Cloudflare 会自动配置 DNS 记录
4. 如需根域名 `magentochina.org` 也指向本站，添加 DNS CNAME 或 A 记录指向 Pages

### Cloudflare Pages 特殊文件

| 文件 | 作用 |
|------|------|
| `_headers` | 定义安全响应头（CSP、X-Frame-Options 等）和缓存策略（CSS/JS 1 年，HTML 1 小时） |
| `_redirects` | 旧路径 301 重定向到新扁平页面结构 |

## 本地预览

无需构建工具，直接启动任意静态文件服务器即可：

```bash
# Python（最简单）
python3 -m http.server 8080

# Node（如果安装了 serve）
npx serve .

# PHP
php -S localhost:8080
```

浏览器访问 `http://localhost:8080` 即可预览。

## SEO 配置

- **sitemap.xml**：包含 4 个主要页面，提交至搜索引擎
- **robots.txt**：允许全站爬取，指向 sitemap
- **Open Graph / Twitter Card**：每个页面均配置社交分享元数据
- **结构化数据**：首页 WebSite + Organization，文档页 TechArticle
- **语义化 HTML**：使用 `<main>`、`<section>`、`<nav>` 等语义标签
- **canonical URL**：每个页面声明唯一规范地址

## 技术细节

- **零依赖**：不使用任何框架或构建工具，纯原生 HTML/CSS/JS
- **fade-in 动画**：IntersectionObserver + CSS transition（`.visible` 类切换），避免 CSS animation 不可回退的问题
- **Tab 导航**：`data-tab` 属性驱动，JS 切换 `.active` 类
- **折叠面板**：`collapsible` 类组件，点击切换 `.open` 类
- **SVG 插图**：终端模拟、架构图、流程图均使用内联 SVG，无外部图片依赖

## 许可

本站内容基于 Mage-OS / Adobe Commerce 官方文档整理，仅供中文社区学习参考。Magento 是 Adobe Inc. 的注册商标。
