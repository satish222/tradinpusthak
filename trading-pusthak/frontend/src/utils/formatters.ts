import { format, parseISO, isValid } from 'date-fns';

export const formatCurrency = (amount: number, currency: string = '₹'): string => {
  return `${currency}${amount.toLocaleString('en-IN', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  })}`;
};

export const formatPercentage = (value: number, decimals: number = 2): string => {
  return `${value.toFixed(decimals)}%`;
};

export const formatPnL = (pnl: number): string => {
  const color = pnl >= 0 ? 'text-success-600' : 'text-danger-600';
  const sign = pnl >= 0 ? '+' : '';
  return `${sign}${formatCurrency(pnl)}`;
};

export const formatDate = (date: Date | string, formatString: string = 'MMM dd, yyyy'): string => {
  try {
    const dateObj = typeof date === 'string' ? parseISO(date) : date;
    if (!isValid(dateObj)) return 'Invalid Date';
    return format(dateObj, formatString);
  } catch (error) {
    return 'Invalid Date';
  }
};

export const formatDateTime = (date: Date | string): string => {
  return formatDate(date, 'MMM dd, yyyy HH:mm');
};

export const formatTime = (date: Date | string, timeFormat: '12h' | '24h' = '12h'): string => {
  const formatString = timeFormat === '12h' ? 'hh:mm a' : 'HH:mm';
  return formatDate(date, formatString);
};

export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toLocaleString('en-IN', { 
    minimumFractionDigits: decimals, 
    maximumFractionDigits: decimals 
  });
};

export const formatCompactNumber = (num: number): string => {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  } else {
    return num.toString();
  }
};

export const formatWinRate = (wins: number, total: number): string => {
  if (total === 0) return '0%';
  const rate = (wins / total) * 100;
  return formatPercentage(rate);
};

export const formatProfitFactor = (grossProfit: number, grossLoss: number): string => {
  if (grossLoss === 0) return grossProfit > 0 ? '∞' : '0.00';
  return (grossProfit / Math.abs(grossLoss)).toFixed(2);
};

export const formatExpectancy = (avgWin: number, avgLoss: number, winRate: number): string => {
  const expectancy = (avgWin * winRate / 100) - (Math.abs(avgLoss) * (100 - winRate) / 100);
  return formatCurrency(expectancy);
};

export const formatDrawdown = (drawdown: number): string => {
  return `-${formatCurrency(Math.abs(drawdown))}`;
};

export const formatLots = (lots: number): string => {
  return lots === 1 ? '1 lot' : `${lots} lots`;
};

export const formatInstrument = (instrument: string): string => {
  return instrument.toUpperCase();
};

export const formatOptionType = (optionType: 'CE' | 'PE'): string => {
  return optionType === 'CE' ? 'Call' : 'Put';
};

export const formatTradeType = (tradeType: 'Buy' | 'Sell'): string => {
  return tradeType;
};

export const formatProductType = (productType: 'MIS' | 'NRML'): string => {
  return productType === 'MIS' ? 'Intraday' : 'Delivery';
};

export const formatMood = (mood: string): string => {
  const moodMap: Record<string, string> = {
    'excellent': '😊 Excellent',
    'good': '😌 Good',
    'neutral': '😐 Neutral',
    'anxious': '😰 Anxious',
    'stressed': '😤 Stressed',
  };
  return moodMap[mood] || mood;
};

export const formatEmotion = (emotion: string): string => {
  const emotionMap: Record<string, string> = {
    'fear': '😨 Fear',
    'greed': '🤑 Greed',
    'confidence': '😎 Confidence',
    'regret': '😔 Regret',
    'euphoria': '🤩 Euphoria',
    'anger': '😠 Anger',
    'anxiety': '😰 Anxiety',
    'excitement': '🤗 Excitement',
  };
  return emotionMap[emotion] || emotion;
};

export const formatDisciplineScore = (score: number): string => {
  if (score >= 8) return '🟢 Excellent';
  if (score >= 6) return '🟡 Good';
  if (score >= 4) return '🟠 Fair';
  return '🔴 Poor';
};

export const formatConfidenceLevel = (level: number): string => {
  if (level >= 8) return '🔥 Very High';
  if (level >= 6) return '👍 High';
  if (level >= 4) return '👌 Moderate';
  if (level >= 2) return '👎 Low';
  return '💔 Very Low';
};

export const formatTags = (tags: string[]): string => {
  return tags.map(tag => `#${tag}`).join(', ');
};

export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const formatDuration = (milliseconds: number): string => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days}d ${hours % 24}h`;
  if (hours > 0) return `${hours}h ${minutes % 60}m`;
  if (minutes > 0) return `${minutes}m ${seconds % 60}s`;
  return `${seconds}s`;
};

export const getColorForPnL = (pnl: number): string => {
  return pnl >= 0 ? 'text-success-600' : 'text-danger-600';
};

export const getBgColorForPnL = (pnl: number): string => {
  return pnl >= 0 ? 'bg-success-50' : 'bg-danger-50';
};

export const getColorForWinRate = (winRate: number): string => {
  if (winRate >= 70) return 'text-success-600';
  if (winRate >= 50) return 'text-yellow-600';
  return 'text-danger-600';
};

export const getColorForScore = (score: number, maxScore: number = 10): string => {
  const percentage = (score / maxScore) * 100;
  if (percentage >= 80) return 'text-success-600';
  if (percentage >= 60) return 'text-yellow-600';
  return 'text-danger-600';
};