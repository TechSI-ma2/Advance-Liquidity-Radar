export type MarketType = 'SPOT' | 'FUTURES' | 'FOREX';
export type ConnectionStatus = 'CONNECTED' | 'CONNECTING' | 'RESYNCING' | 'DISCONNECTED' | 'ERROR';
export type AssetCategory = 'CRYPTO' | 'COMMODITY' | 'FOREX';
export type SupportedCryptoOnlyAsset = 'BTC' | 'ETH' | 'XRP' | 'SOL' | 'ZEC';
export type SupportedCommodityAsset = 'XAU' | 'XAG' | 'WTI';
export type SupportedForexAsset =
  | 'EURUSD'
  | 'GBPUSD'
  | 'USDJPY'
  | 'USDCHF'
  | 'AUDUSD'
  | 'USDCAD'
  | 'NZDUSD';
export type SupportedCryptoAsset =
  | SupportedCryptoOnlyAsset
  | SupportedCommodityAsset
  | SupportedForexAsset;

export interface ProductConfig {
  asset: SupportedCryptoAsset;
  name: string;
  category: AssetCategory;
  displaySymbol: string;
  coinbaseProductId: string;
  candleProductId: string;
  marketType: MarketType;
  bucketSize: number;
  referencePrice: number;
  exchange?: string;
  pocketOptionPayoutPct?: number;
}

export const PRODUCTS_CONFIG: ProductConfig[] = [
  { asset: 'BTC', name: 'Bitcoin', category: 'CRYPTO', displaySymbol: 'BTC/USDT', coinbaseProductId: 'BTC-USDT', candleProductId: 'BTC-USD', marketType: 'SPOT', bucketSize: 25, referencePrice: 91250, exchange: 'Coinbase Advanced Trade' },
  { asset: 'ETH', name: 'Ethereum', category: 'CRYPTO', displaySymbol: 'ETH/USDT', coinbaseProductId: 'ETH-USDT', candleProductId: 'ETH-USD', marketType: 'SPOT', bucketSize: 2, referencePrice: 3140, exchange: 'Coinbase Advanced Trade' },
  { asset: 'XRP', name: 'XRP', category: 'CRYPTO', displaySymbol: 'XRP/USDT', coinbaseProductId: 'XRP-USDT', candleProductId: 'XRP-USD', marketType: 'SPOT', bucketSize: 0.005, referencePrice: 1.48, exchange: 'Coinbase Advanced Trade' },
  { asset: 'SOL', name: 'Solana', category: 'CRYPTO', displaySymbol: 'SOL/USDT', coinbaseProductId: 'SOL-USDT', candleProductId: 'SOL-USD', marketType: 'SPOT', bucketSize: 0.25, referencePrice: 194.5, exchange: 'Coinbase Advanced Trade' },
  { asset: 'ZEC', name: 'Zcash', category: 'CRYPTO', displaySymbol: 'ZEC/USDT', coinbaseProductId: 'ZEC-USDT', candleProductId: 'ZEC-USD', marketType: 'SPOT', bucketSize: 0.15, referencePrice: 44.8, exchange: 'Coinbase Advanced Trade' },
  { asset: 'BTC', name: 'Bitcoin', category: 'CRYPTO', displaySymbol: 'BTC/USD', coinbaseProductId: 'BTC-USD', candleProductId: 'BTC-USD', marketType: 'SPOT', bucketSize: 25, referencePrice: 91250, exchange: 'Coinbase Advanced Trade' },
  { asset: 'ETH', name: 'Ethereum', category: 'CRYPTO', displaySymbol: 'ETH/USD', coinbaseProductId: 'ETH-USD', candleProductId: 'ETH-USD', marketType: 'SPOT', bucketSize: 2, referencePrice: 3140, exchange: 'Coinbase Advanced Trade' },
  { asset: 'XRP', name: 'XRP', category: 'CRYPTO', displaySymbol: 'XRP/USD', coinbaseProductId: 'XRP-USD', candleProductId: 'XRP-USD', marketType: 'SPOT', bucketSize: 0.005, referencePrice: 1.48, exchange: 'Coinbase Advanced Trade' },
  { asset: 'SOL', name: 'Solana', category: 'CRYPTO', displaySymbol: 'SOL/USD', coinbaseProductId: 'SOL-USD', candleProductId: 'SOL-USD', marketType: 'SPOT', bucketSize: 0.25, referencePrice: 194.5, exchange: 'Coinbase Advanced Trade' },
  { asset: 'ZEC', name: 'Zcash', category: 'CRYPTO', displaySymbol: 'ZEC/USD', coinbaseProductId: 'ZEC-USD', candleProductId: 'ZEC-USD', marketType: 'SPOT', bucketSize: 0.15, referencePrice: 44.8, exchange: 'Coinbase Advanced Trade' },
  { asset: 'XAU', name: 'Gold', category: 'COMMODITY', displaySymbol: 'XAU/USD', coinbaseProductId: 'XAU-USD', candleProductId: 'PAXG-USD', marketType: 'FUTURES', bucketSize: 2.0, referencePrice: 2684.5, exchange: 'Coinbase Derivatives' },
  { asset: 'XAG', name: 'Silver', category: 'COMMODITY', displaySymbol: 'XAG/USD', coinbaseProductId: 'XAG-USD', candleProductId: 'XAG-USD', marketType: 'FUTURES', bucketSize: 0.05, referencePrice: 31.45, exchange: 'Coinbase Derivatives' },
  { asset: 'WTI', name: 'WTI Oil', category: 'COMMODITY', displaySymbol: 'WTI/USD', coinbaseProductId: 'WTI-USD', candleProductId: 'WTI-USD', marketType: 'FUTURES', bucketSize: 0.1, referencePrice: 69.25, exchange: 'Coinbase Derivatives' },
  { asset: 'EURUSD', name: 'Euro / US Dollar', category: 'FOREX', displaySymbol: 'EUR/USD', coinbaseProductId: 'EUR-USD-FX', candleProductId: 'EUR-USD-FX', marketType: 'FOREX', bucketSize: 0.001, referencePrice: 1.0845, exchange: 'Pocket Option FX', pocketOptionPayoutPct: 92 },
  { asset: 'GBPUSD', name: 'British Pound / US Dollar', category: 'FOREX', displaySymbol: 'GBP/USD', coinbaseProductId: 'GBP-USD-FX', candleProductId: 'GBP-USD-FX', marketType: 'FOREX', bucketSize: 0.001, referencePrice: 1.2965, exchange: 'Pocket Option FX', pocketOptionPayoutPct: 92 },
  { asset: 'USDJPY', name: 'US Dollar / Japanese Yen', category: 'FOREX', displaySymbol: 'USD/JPY', coinbaseProductId: 'USD-JPY-FX', candleProductId: 'USD-JPY-FX', marketType: 'FOREX', bucketSize: 0.05, referencePrice: 154.35, exchange: 'Pocket Option FX', pocketOptionPayoutPct: 91 },
  { asset: 'USDCHF', name: 'US Dollar / Swiss Franc', category: 'FOREX', displaySymbol: 'USD/CHF', coinbaseProductId: 'USD-CHF-FX', candleProductId: 'USD-CHF-FX', marketType: 'FOREX', bucketSize: 0.001, referencePrice: 0.8815, exchange: 'Pocket Option FX', pocketOptionPayoutPct: 89 },
  { asset: 'AUDUSD', name: 'Australian Dollar / US Dollar', category: 'FOREX', displaySymbol: 'AUD/USD', coinbaseProductId: 'AUD-USD-FX', candleProductId: 'AUD-USD-FX', marketType: 'FOREX', bucketSize: 0.001, referencePrice: 0.6585, exchange: 'Pocket Option FX', pocketOptionPayoutPct: 90 },
  { asset: 'USDCAD', name: 'US Dollar / Canadian Dollar', category: 'FOREX', displaySymbol: 'USD/CAD', coinbaseProductId: 'USD-CAD-FX', candleProductId: 'USD-CAD-FX', marketType: 'FOREX', bucketSize: 0.001, referencePrice: 1.3915, exchange: 'Pocket Option FX', pocketOptionPayoutPct: 88 },
  { asset: 'NZDUSD', name: 'New Zealand Dollar / US Dollar', category: 'FOREX', displaySymbol: 'NZD/USD', coinbaseProductId: 'NZD-USD-FX', candleProductId: 'NZD-USD-FX', marketType: 'FOREX', bucketSize: 0.001, referencePrice: 0.5965, exchange: 'Pocket Option FX', pocketOptionPayoutPct: 87 }
];

export function symbolToAsset(symbol: string): SupportedCryptoAsset {
  const matched = PRODUCTS_CONFIG.find((p) => p.displaySymbol === symbol);
  if (matched) return matched.asset;
  return (symbol.split('/')[0] as SupportedCryptoAsset) || 'BTC';
}

export function assetToSymbol(
  asset: SupportedCryptoAsset,
  currentSymbol?: string
): string {
  const matched = PRODUCTS_CONFIG.filter((p) => p.asset === asset);
  if (matched.length === 0) return 'BTC/USDT';
  if (matched.length === 1) return matched[0].displaySymbol;
  if (currentSymbol && currentSymbol.endsWith('/USD') && !currentSymbol.includes('USDT')) {
    const usdMatch = matched.find((m) => m.displaySymbol.endsWith('/USD'));
    if (usdMatch) return usdMatch.displaySymbol;
  }
  return matched[0].displaySymbol;
}

export interface PriceLevel {
  price: number;
  quantity: number;
  usdValue: number;
}

export interface HeatmapBucket {
  price: number;
  bidUsd: number;
  askUsd: number;
  bidQty: number;
  askQty: number;
  dominantSide: 'BUY' | 'SELL' | 'NEUTRAL';
  intensity: number;
  isWhaleWall: boolean;
}

export interface HeatmapSlice {
  timestamp: number;
  midPrice: number;
  buckets: HeatmapBucket[];
}

export interface LiquidityWall {
  id: string;
  symbol: string;
  exchange: string;
  marketType: MarketType;
  side: 'BUY' | 'SELL';
  price: number;
  quantity: number;
  usdValue: number;
  distanceFromMidPct: number;
  firstDetectedAt: string;
  lastObservedAt: string;
  relativeSizeRatio: number;
  strength: 'MODERATE' | 'STRONG' | 'INSTITUTIONAL' | 'WHALE';
  unusualSignal?: 'NONE' | 'POTENTIAL_SPOOF_PULL' | 'RAPID_RELOAD' | 'MIGRATED_WALL';
}

export interface LiquidityCluster {
  id: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  zoneLow: number;
  zoneHigh: number;
  centroidPrice: number;
  totalUsdValue: number;
  totalQuantity: number;
  distanceFromMidPct: number;
  levelCount: number;
  strengthScore: number;
}

export interface LiquidityAlert {
  id: string;
  timestamp: string;
  exchange: string;
  symbol: string;
  type:
    | 'BUY_WALL_APPEARED'
    | 'SELL_WALL_APPEARED'
    | 'WALL_DISAPPEARED'
    | 'WALL_MOVED'
    | 'LIQUIDITY_SURGE'
    | 'LIQUIDITY_DRAIN'
    | 'PRICE_NEAR_CLUSTER'
    | 'ORDERBOOK_IMBALANCE';
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  priceLevel?: number;
  usdValue?: number;
}

export interface Candle15m {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  ema9?: number;
  ema21?: number;
  vwap?: number;
}

export interface PredictionSignalFactor {
  name: string;
  score: number;
  weight: number;
  detail: string;
}

export interface BinaryPredictionContract {
  contractId: string;
  question: string;
  strikePrice: number;
  yesProbabilityPct: number;
  noProbabilityPct: number;
  expiryTimeIso: string;
}

export interface CoinbasePredictionTelemetry {
  asset: SupportedCryptoAsset;
  productId: string;
  exchange: string;
  granularity: '15m';
  lastUpdated: string;
  livePrice: number;
  currentCandleStart: number;
  secondsRemainingInCandle: number;
  bias: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  bullishProbabilityPct: number;
  bearishProbabilityPct: number;
  confidenceScore: number;
  predictedNext15mClose: number;
  predictedRangeHigh: number;
  predictedRangeLow: number;
  horizonProjections: Array<{
    step: number;
    time: number;
    predictedPrice: number;
    upperBand: number;
    lowerBand: number;
  }>;
  indicators: {
    rsi14: number;
    ema9: number;
    ema21: number;
    vwap: number;
    atr14: number;
    orderBookImbalancePct: number;
    netTradeFlowDeltaUsd: number;
  };
  factors: PredictionSignalFactor[];
  binaryContracts: BinaryPredictionContract[];
  candles: Candle15m[];
}

export interface PairTelemetry {
  symbol: string;
  productId: string;
  exchange: string;
  marketType: MarketType;
  synchronized: boolean;
  sequenceNum: number;
  lastUpdateTimestamp: string;
  livePrice: number;
  priceChange24hPct: number;
  bestBid: number;
  bestAsk: number;
  spreadPct: number;
  totalBuyLiquidityUsd: number;
  totalSellLiquidityUsd: number;
  imbalancePct: number;
  strongestBuyWall: LiquidityWall | null;
  strongestSellWall: LiquidityWall | null;
  largestCluster: LiquidityCluster | null;
  walls: LiquidityWall[];
  clusters: LiquidityCluster[];
  topBids: PriceLevel[];
  topAsks: PriceLevel[];
  currentHeatmapSlice: HeatmapSlice;
}

export interface HistoricalSnapshotRecord {
  ts: string;
  exchange: string;
  symbol: string;
  midPrice: number;
  bestBid: number;
  bestAsk: number;
  totalBidUsd: number;
  totalAskUsd: number;
  imbalancePct: number;
  buckets: HeatmapBucket[];
}

export interface RadarBroadcastPayload {
  type: 'RADAR_STATE_UPDATE';
  serverTimestamp: string;
  exchangeStatus: {
    exchange: string;
    endpoint: string;
    status: ConnectionStatus;
    lastHeartbeat: string | null;
    reconnectCount: number;
    latencyMs: number;
  };
  pairs: Record<string, PairTelemetry>;
  predictions: Record<SupportedCryptoAsset, CoinbasePredictionTelemetry>;
  recentAlerts: LiquidityAlert[];
}
