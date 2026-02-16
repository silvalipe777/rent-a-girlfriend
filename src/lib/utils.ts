export function formatCurrency(value: number): string {
  if (value === 0) return "免费";
  return `${value} BNB`;
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(date);
}

export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function getRentalExpiry(plan: string): Date {
  const now = new Date();
  switch (plan) {
    case "hourly":
      return new Date(now.getTime() + 60 * 60 * 1000);
    case "daily":
      return new Date(now.getTime() + 24 * 60 * 60 * 1000);
    case "weekly":
      return new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    default:
      return new Date(now.getTime() + 60 * 60 * 1000);
  }
}

export function isRentalActive(expiresAt: Date): boolean {
  return new Date(expiresAt) > new Date();
}

export function getTimeRemaining(expiresAt: Date): string {
  const now = new Date();
  const diff = new Date(expiresAt).getTime() - now.getTime();
  if (diff <= 0) return "已过期";

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 24) {
    const days = Math.floor(hours / 24);
    return `剩余${days}天${hours % 24}小时`;
  }
  if (hours > 0) return `剩余${hours}小时${minutes}分钟`;
  return `剩余${minutes}分钟`;
}
