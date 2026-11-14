import test from 'node:test';
import assert from 'node:assert/strict';
import { SynchronizedOrderBook, OrderBookManager } from './orderBookManager';
import { LiquidityDetector } from './liquidityDetector';
import { CoinbasePredictionModule } from './coinbasePredictionModule';
import { assetToSymbol, symbolToAsset } from '../types/radar';

test('SynchronizedOrderBook applies snapshot and incremental updates accurately', () => {
  const book = new SynchronizedOrderBook('BTC/USDT', 'BTC-USDT', 'SPOT', 25);
  assert.equal(book.synchronized, false);

  book.applySnapshot(
    [
      { side: 'bid', price_level: '90000', new_quantity: '2.5' },
      { side: 'bid', price_level: '89950', new_quantity: '1.0' },
      { side: 'offer', price_level: '90050', new_quantity: '1.5' },
      { side: 'offer', price_level: '90100', new_quantity: '3.0' }
    ],
    100,
    '2026-11-06T16:00:00Z'
  );

  assert.equal(book.synchronized, true);
  assert.equal(book.getBestBid(), 90000);
  assert.equal(book.getBestAsk(), 90050);
  assert.equal(book.getMidPrice(), 90025);

  // Remove 90000 bid and add 90010 bid
  const res = book.applyIncrementalUpdate(
    [
      { side: 'bid', price_level: '90000', new_quantity: '0' },
      { side: 'bid', price_level: '90010', new_quantity: '4.0' }
    ],
    101,
    '2026-11-06T16:00:01Z'
  );
  assert.equal(res.ok, true);
  assert.equal(book.getBestBid(), 90010);
});

test('LiquidityDetector detects buy and sell walls and computes imbalance', () => {
  const book = new SynchronizedOrderBook('BTC/USDT', 'BTC-USDT', 'SPOT', 25);
  book.applySnapshot(
    [
      { side: 'bid', price_level: '90000', new_quantity: '0.2' },
      { side: 'bid', price_level: '89950', new_quantity: '0.2' },
      { side: 'bid', price_level: '89900', new_quantity: '12.0' }, // $1.078M Buy Wall
      { side: 'offer', price_level: '90050', new_quantity: '0.2' },
      { side: 'offer', price_level: '90100', new_quantity: '0.2' },
      { side: 'offer', price_level: '90200', new_quantity: '5.0' } // $451K Sell Wall
    ],
    200,
    '2026-11-06T16:00:00Z'
  );

  const detector = new LiquidityDetector(50000);
  const { telemetry } = detector.analyzeOrderBook(book, 5.0);

  assert.equal(telemetry.synchronized, true);
  assert.ok(telemetry.totalBuyLiquidityUsd > telemetry.totalSellLiquidityUsd);
  assert.ok(telemetry.imbalancePct > 0);
  assert.ok(telemetry.strongestBuyWall !== null);
  assert.equal(telemetry.strongestBuyWall?.price, 89900);
  assert.ok(telemetry.strongestSellWall !== null);
  assert.equal(telemetry.strongestSellWall?.price, 90200);
});

test('CoinbasePredictionModule aggregates 15m candles and computes probabilities', () => {
  const mod = new CoinbasePredictionModule();
  const baseTime = Math.floor(Date.now() / 1000 / 900) * 900 - 20 * 900;
  const seedCandles = Array.from({ length: 20 }, (_, i) => ({
    time: baseTime + i * 900,
    open: 90000 + i * 50,
    high: 90080 + i * 50,
    low: 89980 + i * 50,
    close: 90050 + i * 50,
    volume: 15 + i
  }));

  mod.seedCandlesForAsset('BTC', seedCandles);
  mod.onRealtimeTick('BTC-USD', 91200, 2.5, 'BUY');

  const prediction = mod.computeAssetPrediction('BTC', 'BTC-USD');
  assert.equal(prediction.asset, 'BTC');
  assert.equal(prediction.granularity, '15m');
  assert.equal(prediction.bullishProbabilityPct + prediction.bearishProbabilityPct, 100);
  assert.equal(prediction.horizonProjections.length, 3);
  assert.equal(prediction.binaryContracts.length, 3);
  assert.ok(prediction.candles.length >= 20);
});

test('OrderBookManager and CoinbasePredictionModule support Zcash (ZEC), Commodities, and Pocket Option Forex Majors', () => {
  const manager = new OrderBookManager();
  const mod = new CoinbasePredictionModule();
  const allPredictions = mod.computeAllPredictions({});

  const forexPairs = [
    { symbol: 'EUR/USD', asset: 'EURUSD' },
    { symbol: 'GBP/USD', asset: 'GBPUSD' },
    { symbol: 'USD/JPY', asset: 'USDJPY' },
    { symbol: 'USD/CHF', asset: 'USDCHF' },
    { symbol: 'AUD/USD', asset: 'AUDUSD' },
    { symbol: 'USD/CAD', asset: 'USDCAD' },
    { symbol: 'NZD/USD', asset: 'NZDUSD' }
  ] as const;

  for (const fx of forexPairs) {
    assert.equal(symbolToAsset(fx.symbol), fx.asset);
    assert.equal(assetToSymbol(fx.asset), fx.symbol);
    const book = manager.getBookBySymbol(fx.symbol);
    assert.ok(book, `OrderBook should exist for ${fx.symbol}`);
    assert.equal(book?.exchange, 'Pocket Option FX');
    assert.equal(book?.marketType, 'FOREX');

    const pred = allPredictions[fx.asset];
    assert.ok(pred, `Prediction should exist for ${fx.asset}`);
    assert.equal(pred.exchange, 'Pocket Option FX');
    assert.equal(pred.bullishProbabilityPct + pred.bearishProbabilityPct, 100);
    assert.ok(pred.candles.length >= 20);
    assert.ok(pred.livePrice > 0);
  }

  for (const asset of ['ZEC', 'XAU', 'XAG', 'WTI'] as const) {
    const pred = allPredictions[asset];
    assert.ok(pred, `Prediction should exist for ${asset}`);
    assert.equal(pred.asset, asset);
    assert.equal(pred.bullishProbabilityPct + pred.bearishProbabilityPct, 100);
    assert.ok(pred.candles.length >= 20, `Candles should be seeded for ${asset}`);
    assert.ok(pred.livePrice > 0, `Live price should be positive for ${asset}`);
  }
});


