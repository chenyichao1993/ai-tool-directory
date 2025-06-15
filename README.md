# AI工具导航网站

## 项目简介
本项目是一个AI工具导航网站，类似toolify.ai，帮助用户快速找到合适的AI工具。

## 功能列表
- 搜索功能（支持关键词搜索）
- 分类筛选（按类别、价格、评分等筛选）
- 工具卡片展示（展示工具基本信息）
- 工具详情页（展示工具详细信息，包括简介、功能、截图、使用方法等）
- 多语言支持（支持中英文切换）
- 登录与游客模式（部分功能需要登录才能使用）
- 评分、评论、收藏、分享等扩展功能

### 必须登录才能使用的功能
- 一键收藏/加入清单
- 用户评分/评论
- 价格/功能变动订阅提醒
- 我的清单/对比工具
- 反馈/纠错
- 历史浏览记录

### 无需登录即可使用的功能
- 查看工具详情、简介、官网链接
- 一键复制链接/简介
- AI智能摘要/优缺点分析
- 多语言切换
- 深色模式/无障碍支持
- 相关工具推荐
- 快捷跳转到教程/社区

## 用户系统
- 支持游客模式与登录模式
- 游客模式下，部分功能（如收藏、评论、订阅）需要登录才能使用
- 登录后，用户可享受完整功能，包括收藏、评论、订阅、历史记录等

## UI/UX设计
- 简洁、现代、响应式设计
- 深色模式/无障碍支持
- 弹窗设计规范：
  - 当游客点击"必须登录"功能时，弹出友好提示
  - 标题：如"登录后即可使用该功能"
  - 内容：简要说明登录后可用的功能（如收藏、评论、订阅等）
  - 按钮：提供"立即登录/注册"和"稍后再说"两个选项
  - 登录/注册入口：支持邮箱、手机号、第三方账号（如Google、GitHub）快速注册
  - 视觉设计：简洁、现代，不打断用户浏览体验

## 开发计划
1. 工具详情页（点击卡片后展示详细介绍）
2. 多语言支持
3. 用户系统（登录/游客）
4. 评分、评论、收藏、分享等扩展功能

## 技术栈
- 前端：React、Next.js、Tailwind CSS
- 后端：Node.js、Express
- 数据库：MongoDB
- 部署：Vercel

## 贡献指南
欢迎提交Issue和Pull Request，一起完善这个项目！

## 许可证
MIT

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
