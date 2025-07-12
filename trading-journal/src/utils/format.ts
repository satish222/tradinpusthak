import { format, formatDistanceToNow } from "date-fns"

export function formatDate(date: Date | string, formatStr: string = "MMM dd, yyyy") {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return format(dateObj, formatStr)
}

export function formatDateTime(date: Date | string) {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return format(dateObj, "MMM dd, yyyy HH:mm")
}

export function formatRelativeTime(date: Date | string) {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return formatDistanceToNow(dateObj, { addSuffix: true })
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatNumber(num: number, decimals: number = 2) {
  return new Intl.NumberFormat("en-IN", {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(num)
}

export function formatPercentage(value: number, total: number) {
  if (total === 0) return "0%"
  return `${((value / total) * 100).toFixed(1)}%`
}