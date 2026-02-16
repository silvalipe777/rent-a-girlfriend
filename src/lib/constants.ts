export const EMOTIONAL_STYLES = [
  "友好 & 博学",
  "大胆 & 自信",
  "创意 & 励志",
  "狂野 & 活泼",
  "强烈 & 磁性",
  "甜美 & 助人",
  "聪慧 & 机智",
  "自信 & 战略",
  "温暖 & 支持",
  "神秘 & 暗黑",
] as const;

export const CATEGORIES = [
  { value: "assistant", label: "助手" },
  { value: "boyfriend", label: "男友" },
  { value: "friend", label: "朋友" },
  { value: "mentor", label: "导师" },
] as const;

export const PRICING_PLANS = [
  { key: "hourly", label: "每小时", duration: 1 },
  { key: "daily", label: "每天", duration: 24 },
  { key: "weekly", label: "每周", duration: 168 },
] as const;

export const APP_NAME = "AVA";
export const APP_DESCRIPTION = "BSC链上的自主虚拟代理 — 你最聪明的加密助手";
