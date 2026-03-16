# SEO / AEO / GEO 通用优化指令

适用于任何静态内容网站（Astro、Next.js、Nuxt、Hugo 等）。
按顺序执行，每项完成后打勾。

---

## 一、SEO 基础修复

### 1.1 Meta 标签完整性

- [ ] `<html lang="">` 使用精确语言区域代码（如 `en-SG`、`zh-TW`、`ja-JP`），不要只写 `en`
- [ ] 每页有唯一 `<title>`（建议格式：`页面标题 | 站点名称`）
- [ ] 每页有 `<meta name="description">`，长度 120–160 字符
- [ ] 每页有 `<link rel="canonical">` 指向自身绝对 URL
- [ ] 所有页面路径风格一致：**不带**尾部斜杠，或**统一带**尾部斜杠，不能混用
- [ ] 添加 `<link rel="icon">` favicon
- [ ] 添加 `<meta name="theme-color">` 移动浏览器主题色

### 1.2 Open Graph / 社交分享

- [ ] `og:title`
- [ ] `og:description`
- [ ] `og:url`（绝对 URL）
- [ ] `og:type`（首页用 `website`，文章用 `article`）
- [ ] `og:image`（绝对 URL，建议 1200×630px）
- [ ] `og:image:width` + `og:image:height`
- [ ] `og:locale`（如 `en_SG`、`zh_TW`）
- [ ] `og:site_name`

### 1.3 Twitter / X Card

- [ ] `twitter:card`（有图用 `summary_large_image`，无图用 `summary`）
- [ ] `twitter:title`
- [ ] `twitter:description`
- [ ] `twitter:image`（与 `og:image` 相同即可）

### 1.4 国际化 / 地理定向

- [ ] `<link rel="alternate" hreflang="语言-地区" href="绝对URL">` — 针对每个目标市场添加
- [ ] 同时添加 `hreflang="x-default"` 指向默认语言页面

### 1.5 Sitemap

- [ ] 所有页面（含动态路由页面）均已列入 sitemap
- [ ] 每个 `<url>` 包含 `<lastmod>`（ISO 8601 日期）
- [ ] 每个 `<url>` 包含 `<changefreq>`（首页 `weekly`，内容页 `monthly`）
- [ ] 每个 `<url>` 包含 `<priority>`（首页 `1.0`，核心页 `0.8`，普通页 `0.7`）
- [ ] `robots.txt` 中 `Sitemap:` 指向正确的绝对 URL

### 1.6 Core Web Vitals（图片）

- [ ] LCP 首屏主图加 `loading="eager"` + `fetchpriority="high"`
- [ ] 首屏以下图片加 `loading="lazy"`
- [ ] 所有 `<img>` 有 `width` + `height` 属性（防止 CLS 布局偏移）
- [ ] 所有 `<img>` 有语义化 `alt` 文本

### 1.7 结构化数据 — 基础 Schema

| 页面类型 | 必须添加的 Schema |
|----------|------------------|
| 首页 | `WebSite` |
| 关于页 | `Organization` |
| FAQ 页 | `FAQPage` |
| 文章/博客 | `Article` + `BreadcrumbList` |
| 工具/清单页 | `WebPage` + `BreadcrumbList` |
| 产品页 | `Product` |
| 联系页 | `LocalBusiness`（如适用） |

所有 Schema 的通用字段：
- [ ] `inLanguage`（如 `"en-SG"`）
- [ ] `url`（绝对 URL）
- [ ] `name`

---

## 二、AEO — 答案引擎优化

目标：触发 Google 精选摘要（Featured Snippet）、AI Overview、语音搜索朗读

### 2.1 SpeakableSpecification（语音/AI 可读标记）

在 `Article`、`WebPage`、`FAQPage`、`WebSite` Schema 中添加：

```json
"speakable": {
  "@type": "SpeakableSpecification",
  "cssSelector": ["h1", "article > p:first-of-type", ".key-takeaway"]
}
```

建议选择器：
- `h1` — 页面标题
- 正文第一段（直接回答核心问题的段落）
- 关键结论块（`.summary`、`.key-takeaway`、`blockquote` 等）

### 2.2 FAQPage Schema

- [ ] FAQ 页：将**全部** Q&A 条目放入 `FAQPage.mainEntity`，不要截断
- [ ] 非 FAQ 页：如页面内有隐式 Q&A 结构（如"常见误区"、"注意事项"），同样提取为 `FAQPage` Schema
- [ ] 每个 `Question.name` 使用完整疑问句
- [ ] 每个 `Answer.text` 为 40–60 字的直接回答（不要只写"见下文"）

### 2.3 DefinedTermSet — 术语定义 Schema

适用于含有术语解释、词汇表、定义类内容的页面：

```json
{
  "@type": "DefinedTermSet",
  "name": "页面术语集名称",
  "inLanguage": "en-SG",
  "hasDefinedTerm": [
    {
      "@type": "DefinedTerm",
      "name": "术语名称",
      "description": "一句话定义（不超过 80 字）",
      "inDefinedTermSet": "页面 URL"
    }
  ]
}
```

适用场景：法律术语页、产品分类页、行业词汇页、标签解读页

### 2.4 HowTo Schema

适用于步骤式内容（操作指南、购买清单、使用教程）：

```json
{
  "@type": "HowTo",
  "name": "如何…",
  "step": [
    { "@type": "HowToStep", "position": 1, "name": "步骤标题", "text": "步骤说明" }
  ]
}
```

### 2.5 内容结构优化（精选摘要友好）

- [ ] H2 标题尽量用疑问句式（"What is…"、"How to…"、"XXX 是什么"）
- [ ] 每个 H2 下的第一段：用 1–2 句直接回答该问题，再展开说明
- [ ] 定义类内容用 "X is Y" 句型开头（AI 最容易提取）
- [ ] 列表类内容用有序或无序列表，不要用连续段落代替

---

## 三、GEO — 生成引擎优化（E-E-A-T）

目标：提高被 ChatGPT、Perplexity、Google SGE、Bing Copilot 引用的概率

### 3.1 E-E-A-T 权威信号

- [ ] **命名监管机构**：在内容中明确提及本地/国际权威机构（政府部门、标准组织、监管机构），并说明其在该话题上的职能
  - 示例：新加坡保健品 → 卫生科学局（HSA）、Health Products Act
  - 示例：金融产品 → 金融管理局（MAS）
  - 示例：食品 → 新加坡食品局（SFA）
- [ ] **解释监管框架**：说明"为什么某个词语/说法是营销用语而非受监管的定义"
- [ ] Organization Schema 添加 `knowsAbout`（列出站点专精的主题实体）
- [ ] Organization Schema 添加 `areaServed`（地理服务范围）

### 3.2 时间新鲜度信号

- [ ] Article Schema 添加 `datePublished`（内容首发日期）
- [ ] Article Schema 添加 `dateModified`（最近修改日期，可在构建时动态生成）
- [ ] WebPage / FAQPage Schema 添加 `dateModified`
- [ ] 页面上可见的"最后更新时间"（`<time datetime="YYYY-MM-DD">`）

### 3.3 实体与主题明确性

- [ ] WebSite Schema 添加 `about`（描述站点核心主题实体）
- [ ] WebSite Schema 添加 `description`
- [ ] WebSite Schema 添加 `publisher`（指向 Organization）
- [ ] Article Schema 添加 `author`（Organization 或 Person，不能为空）

### 3.4 内容可引用性（Citability）

AI 引擎优先引用满足以下条件的内容：

- [ ] **具体事实**：提及具体法律名称、机构名称、标准名称（而非泛泛而谈）
- [ ] **明确立场**：直接说"X 在新加坡没有法定定义"，而非"X 的定义因地而异"
- [ ] **外链权威来源**：在相关陈述后链接官方来源（政府网站、学术数据库）
- [ ] **独特视角**：提供当地市场特有的上下文信息，这是 AI 无法从通用知识中获得的

### 3.5 Organization Schema 完整字段

```json
{
  "@type": "Organization",
  "name": "站点名称",
  "url": "https://domain.com/",
  "logo": "https://domain.com/logo.png",
  "description": "一句话描述站点定位",
  "inLanguage": "en-SG",
  "areaServed": { "@type": "Country", "name": "Singapore" },
  "sameAs": ["https://官方关联站点"],
  "knowsAbout": [
    "主题实体 1",
    "主题实体 2",
    "监管机构名称",
    "相关法律法规名称"
  ]
}
```

---

## 四、执行顺序建议

```
1. SEO 1.1–1.4  → Meta 标签、hreflang（10 分钟）
2. SEO 1.5      → Sitemap 完整性检查（5 分钟）
3. SEO 1.6      → 图片加载属性（5 分钟）
4. SEO 1.7      → 基础 Schema 是否覆盖所有页面类型（15 分钟）
5. AEO 2.1      → 全站 Speakable（10 分钟）
6. AEO 2.2      → FAQPage 完整性（5 分钟）
7. AEO 2.3–2.4  → DefinedTermSet / HowTo（视页面数量）
8. GEO 3.1      → 权威机构内容（需要查资料，20–40 分钟）
9. GEO 3.2–3.3  → 时间与实体字段（10 分钟）
10. GEO 3.4     → 内容可引用性审查（需人工判断）
```

---

## 五、给 AI 助手的提示词模板

将以下指令发给 AI（如 Claude Code），可自动执行上述检查：

```
请对本项目进行 SEO / AEO / GEO 全面审查并修复，遵循以下标准：

【SEO】
1. 检查并补全所有页面的 og:image、twitter:image（summary_large_image）、og:locale、hreflang
2. 将 <html lang=""> 改为精确语言区域代码（如 en-SG）
3. 检查 sitemap：确认所有页面已收录，并为每个 URL 添加 lastmod、changefreq、priority
4. 检查路径一致性：尾部斜杠要统一，不能混用
5. LCP 主图加 fetchpriority="high" + loading="eager"；其余图片加 loading="lazy"
6. 为每种页面类型（首页/关于/FAQ/文章）添加对应的 JSON-LD Schema

【AEO】
7. 在 WebSite、FAQPage、WebPage、Article Schema 中添加 SpeakableSpecification，指向 h1 和正文首段
8. 确认 FAQPage Schema 包含全部 Q&A 条目（不截断）
9. 有术语定义内容的页面添加 DefinedTermSet Schema
10. 有步骤式内容的页面添加 HowTo Schema

【GEO / E-E-A-T】
11. 在主要内容页中加入本地监管机构名称及其监管框架的简要说明（如 HSA、MAS、SFA）
12. 所有 Article Schema 添加 datePublished、dateModified、author、inLanguage
13. Organization Schema 添加 knowsAbout（主题实体列表）、areaServed、inLanguage
14. WebSite Schema 添加 about、publisher、description

完成后提交一个 commit，说明每项改动的原因。
```
