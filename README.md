# JobSearching Agent

岗位匹配度 AI 助手，一个本地运行的 AI agent demo。它可以根据个人经历和岗位描述生成匹配度报告，帮助快速判断一段经历是否适合某个岗位。

## 项目亮点

- 自动拆解岗位描述中的关键能力要求
- 对比个人经历，输出匹配分和命中关键词
- 标出缺口关键词，提示简历或项目说明需要补强的地方
- 生成一段可直接用于投递的作品说明
- 纯前端本地运行，无需后端服务，方便部署到 GitHub Pages

## 适合投递时这样写

作品名称：JobSearching Agent - 岗位匹配度 AI 助手

作品简介：独立完成的 AI agent demo，面向实习投递场景，支持粘贴个人经历和岗位描述，自动抽取岗位关键词并生成匹配度报告。项目展示了需求拆解、关键词抽取、匹配评分、内容生成和前端交互能力，可作为 AI 产品/AI 应用方向的个人作品。

## 使用方式

直接打开 `index.html`，点击“载入示例”或粘贴自己的经历和 JD 后生成报告。

## 文件结构

```text
jobsearching-agent/
  index.html
  style.css
  app.js
  assets/
    agent-mark.svg
```

## 后续可扩展

- 接入 OpenAI-compatible API，把规则生成升级为 LLM 生成。
- 增加历史记录和多岗位对比。
- 输出 Markdown 版投递说明，方便复制到申请表。
