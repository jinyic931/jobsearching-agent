# OfferFit Agent

一个本地运行的 AI 投递匹配助手 demo。它把岗位描述拆成需求信号，再和个人经历进行匹配，输出匹配分、命中关键词、缺口关键词、投递说明和优化建议。

## 适合投递时这样写

作品名称：OfferFit Agent - AI 投递匹配助手

作品简介：独立完成的 AI agent demo，面向实习投递场景，支持粘贴简历片段和岗位描述，自动抽取岗位关键词并生成匹配报告。项目展示了需求拆解、关键词抽取、匹配评分、内容生成和前端交互能力，可作为 AI 产品/AI 应用方向的个人作品。

## 使用方式

直接打开 `index.html`，点击“载入示例”或粘贴自己的经历和 JD 后生成报告。

## 文件结构

```text
ai-portfolio-agent/
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
