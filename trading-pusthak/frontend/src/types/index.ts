export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  settings: UserSettings;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSettings {
  theme: 'light' | 'dark';
  defaultInstrument: string;
  defaultProductType: 'MIS' | 'NRML';
  defaultStrategies: string[];
  timezone: string;
  timeFormat: '12h' | '24h';
}

export interface Trade {
  id: string;
  userId: string;
  tradeDate: Date;
  segment: 'Futures' | 'Options';
  instrument: string;
  tradeType: 'Buy' | 'Sell';
  strikePrice?: number;
  optionType?: 'CE' | 'PE';
  expiryDate?: Date;
  productType: 'MIS' | 'NRML';
  entryPrice: number;
  exitPrice: number;
  positionSize: number;
  lots: number;
  stopLoss?: number;
  target?: number;
  pnl: number;
  strategy: string;
  tags: string[];
  screenshot?: string;
  psychology: PsychologyData;
  createdAt: Date;
  updatedAt: Date;
}

export interface PsychologyData {
  moodBefore: 'excellent' | 'good' | 'neutral' | 'anxious' | 'stressed';
  confidenceLevel: number; // 1-10
  focusLevel: number; // 1-10
  emotions: Emotion[];
  mistakesMade: string[];
  followedRules: boolean;
  disciplineScore: number; // 1-10
  reflectionNotes: string;
}

export interface Emotion {
  type: 'fear' | 'greed' | 'confidence' | 'regret' | 'euphoria' | 'anger' | 'anxiety' | 'excitement';
  intensity: number; // 1-10
}

export interface PsychologyEntry {
  id: string;
  userId: string;
  date: Date;
  overallMindset: string;
  topEmotions: string[];
  emotionImpact: string;
  disciplineRating: number; // 1-10
  improvementPlan: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TradeStats {
  totalPnL: number;
  totalTrades: number;
  winningTrades: number;
  losingTrades: number;
  winRate: number;
  avgWin: number;
  avgLoss: number;
  maxWin: number;
  maxLoss: number;
  profitFactor: number;
  expectancy: number;
  largestDrawdown: number;
  consecutiveWins: number;
  consecutiveLosses: number;
}

export interface StrategyStats {
  strategy: string;
  totalTrades: number;
  winningTrades: number;
  totalPnL: number;
  winRate: number;
  avgPnL: number;
}

export interface InstrumentStats {
  instrument: string;
  totalTrades: number;
  totalPnL: number;
  winRate: number;
}

export interface EmotionStats {
  emotion: string;
  frequency: number;
  averageImpact: number;
  associatedPnL: number;
}

export interface EquityPoint {
  date: Date;
  balance: number;
  pnl: number;
  cumulativePnL: number;
}

export interface TradeFilters {
  symbol?: string;
  strategy?: string;
  tag?: string;
  segment?: 'Futures' | 'Options';
  optionType?: 'CE' | 'PE';
  dateRange?: {
    start: Date;
    end: Date;
  };
  pnlRange?: {
    min: number;
    max: number;
  };
  tradeType?: 'Buy' | 'Sell';
}

export interface DashboardData {
  stats: TradeStats;
  equityCurve: EquityPoint[];
  strategyPerformance: StrategyStats[];
  emotionHeatmap: EmotionStats[];
  recentTrades: Trade[];
}

export interface APIResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ChartData {
  name: string;
  value: number;
  date?: Date;
}

export interface FormState {
  isSubmitting: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

export interface NotificationState {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  isVisible: boolean;
  duration?: number;
}