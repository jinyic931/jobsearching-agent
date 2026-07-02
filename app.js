const resumeInput = document.querySelector("#resumeInput");
const jdInput = document.querySelector("#jdInput");
const analyzeBtn = document.querySelector("#analyzeBtn");
const clearBtn = document.querySelector("#clearBtn");
const loadSample = document.querySelector("#loadSample");
const scoreRing = document.querySelector("#scoreRing");
const scoreValue = document.querySelector("#scoreValue");
const scoreTitle = document.querySelector("#scoreTitle");
const scoreSummary = document.querySelector("#scoreSummary");
const matchedTags = document.querySelector("#matchedTags");
const missingTags = document.querySelector("#missingTags");
const pitchText = document.querySelector("#pitchText");
const adviceList = document.querySelector("#adviceList");
const pipeline = [...document.querySelectorAll(".node")];

const domainKeywords = [
  "AI", "LLM", "大模型", "agent", "RAG", "Prompt", "Python", "JavaScript",
  "React", "Vue", "API", "OpenAI", "FastGPT", "LangChain", "数据分析",
  "产品", "用户调研", "原型", "需求分析", "A/B", "SQL", "爬虫", "自动化",
  "向量检索", "知识库", "工作流", "评估", "部署", "GitHub", "开源"
];

const samples = {
  resume: `AI 投递匹配助手：使用 JavaScript 实现本地 agent 工作流，解析岗位描述并提取关键词，输出匹配分、缺口项和投递说明。
FastGPT 知识库 Demo：搭建基于 RAG 的问答应用，整理实习面试资料，设计 prompt 模板和评估表。
技能：Python、JavaScript、API 调用、需求分析、原型设计、数据分析、GitHub、自动化脚本。`,
  jd: `AI 产品实习生
要求：对 AI 应用、LLM、agent 或 RAG 有实践经验；能独立做需求分析、竞品分析和原型设计；熟悉 Prompt 调优、数据评估、API 对接；有个人项目、开源仓库或小工具作品者优先。`
};

function normalize(text) {
  return text.toLowerCase().replace(/\s+/g, " ");
}

function extractKeywords(text) {
  const lower = normalize(text);
  const exact = domainKeywords.filter((word) => lower.includes(word.toLowerCase()));
  const cnTerms = text.match(/[\u4e00-\u9fa5]{2,8}/g) || [];
  const ranked = cnTerms
    .filter((term) => !["要求", "岗位", "职责", "熟悉", "优先", "相关", "能力"].includes(term))
    .reduce((map, term) => map.set(term, (map.get(term) || 0) + 1), new Map());
  const frequent = [...ranked.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([term]) => term);
  return [...new Set([...exact, ...frequent])].slice(0, 18);
}

function renderTags(target, tags, className = "") {
  target.innerHTML = "";
  if (!tags.length) {
    target.innerHTML = `<span class="tag ${className}">暂无</span>`;
    return;
  }
  tags.forEach((tag) => {
    const item = document.createElement("span");
    item.className = `tag ${className}`;
    item.textContent = tag;
    target.appendChild(item);
  });
}

function setPipeline(index) {
  pipeline.forEach((node, i) => {
    node.className = "node";
    if (i < index) node.classList.add("done");
    else if (i === index) node.classList.add("active");
    else node.classList.add("idle");
  });
}

function buildAdvice(matched, missing, score) {
  const advice = [];
  if (missing.length) {
    advice.push(`补充 ${missing.slice(0, 4).join("、")} 的证据，最好写成可量化的项目结果。`);
  }
  if (!matched.includes("GitHub") && !matched.includes("开源")) {
    advice.push("把项目代码、在线 Demo 或截图整理成一个可访问链接，投递时放在作品说明第一行。");
  }
  if (score < 70) {
    advice.push("重写项目经历标题，让标题直接包含目标岗位最看重的 AI 关键词。");
  }
  advice.push("用“问题-方案-结果”的结构描述作品，避免只罗列技术名词。");
  return advice.slice(0, 4);
}

function analyze() {
  const resume = resumeInput.value.trim();
  const jd = jdInput.value.trim();
  if (!resume || !jd) {
    scoreTitle.textContent = "需要两段输入";
    scoreSummary.textContent = "请同时填写个人经历和岗位描述。";
    return;
  }

  setPipeline(0);
  const jdKeywords = extractKeywords(jd);
  setTimeout(() => setPipeline(1), 120);

  const lowerResume = normalize(resume);
  const matched = jdKeywords.filter((word) => lowerResume.includes(word.toLowerCase()));
  const missing = jdKeywords.filter((word) => !lowerResume.includes(word.toLowerCase()));
  const score = Math.min(96, Math.round((matched.length / Math.max(jdKeywords.length, 1)) * 78 + Math.min(matched.length, 6) * 3));

  setTimeout(() => setPipeline(2), 240);
  setTimeout(() => setPipeline(3), 360);
  setTimeout(() => pipeline.forEach((node) => node.className = "node done"), 520);

  scoreRing.style.setProperty("--score", score);
  scoreValue.textContent = score;
  scoreTitle.textContent = score >= 80 ? "高度匹配" : score >= 62 ? "中等匹配" : "需要补强";
  scoreSummary.textContent = `识别到 ${jdKeywords.length} 个岗位信号，当前经历命中 ${matched.length} 个。`;

  renderTags(matchedTags, matched);
  renderTags(missingTags, missing.slice(0, 10), "missing");

  const topMatched = matched.slice(0, 5).join("、") || "AI 项目实践";
  const topMissing = missing.slice(0, 3).join("、") || "岗位核心要求";
  pitchText.textContent = `我做过一个面向投递场景的 OfferFit Agent 小工具，围绕 ${topMatched} 构建本地分析流程，可以把岗位描述拆成需求信号，再和个人经历进行匹配，输出匹配分、关键词缺口和可复用的投递说明。下一步可继续补充 ${topMissing} 的案例或指标，让作品更贴近目标岗位。`;

  adviceList.innerHTML = "";
  buildAdvice(matched, missing, score).forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    adviceList.appendChild(li);
  });
}

loadSample.addEventListener("click", () => {
  resumeInput.value = samples.resume;
  jdInput.value = samples.jd;
  analyze();
});

analyzeBtn.addEventListener("click", analyze);

clearBtn.addEventListener("click", () => {
  resumeInput.value = "";
  jdInput.value = "";
  matchedTags.innerHTML = "";
  missingTags.innerHTML = "";
  adviceList.innerHTML = "";
  pitchText.textContent = "暂无内容。";
  scoreRing.style.setProperty("--score", 0);
  scoreValue.textContent = "0";
  scoreTitle.textContent = "等待分析";
  scoreSummary.textContent = "输入内容后，agent 会拆解岗位需求并生成投递匹配建议。";
  pipeline.forEach((node) => node.className = "node idle");
});
