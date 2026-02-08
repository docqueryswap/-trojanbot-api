const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// ===== YOUR REFERRAL LINKS =====
const TG_REF = "https://t.me/hector_trojanbot?start=r-solprofitportal";
const WEB_REF = "https://trojan.com/@Satoshit";

// ===== SIMPLE IN-MEMORY TRACKING =====
let analytics = {
  total_requests: 0,
  pumpfun_signals: 0,
  buy_intents: 0
};

// ===== MIDDLEWARE: COUNT EVERY REQUEST =====
app.use((req, res, next) => {
  analytics.total_requests += 1;
  next();
});

// Health check
app.get("/", (req, res) => {
  res.json({
    service: "Trojan Execution Gateway API",
    status: "online",
    analytics
  });
});

// ===== PUMP.FUN SIMULATED ANALYTICS =====
app.get("/pumpfun/trending", (req, res) => {
  analytics.pumpfun_signals += 1;

  res.json({
    status: "signal",
    source: "pump.fun",
    token: {
      symbol: "WIF2",
      mint: "ABC123...",
      age_minutes: 18,
      holders: 423,
      market_cap_usd: 182000,
      liquidity_usd: 54000
    },
    trading_activity: {
      volume_5m: 12000,
      buys_5m: 148,
      sells_5m: 61,
      buy_sell_ratio: 2.42
    },
    trojan_analytics: {
      confidence: 0.82,
      momentum: "strong",
      risk_level: "medium",
      whale_activity: "detected",
      strategy: "early momentum scalp"
    },
    execute: {
      telegram: {
        label: "Trade via Trojan Telegram Bot",
        url: TG_REF
      },
      web: {
        label: "Trade via Trojan Web Terminal",
        url: WEB_REF
      }
    }
  });
});

// ===== BUY INTENT (TRACKED) =====
app.get("/intent/buy", (req, res) => {
  analytics.buy_intents += 1;

  const token = req.query.token || "UNKNOWN";

  res.json({
    intent: "buy",
    token,
    created_at: new Date().toISOString(),
    execute: {
      telegram: TG_REF,
      web: WEB_REF
    }
  });
});

// ===== BASIC ANALYTICS ENDPOINT (FOR YOU) =====
app.get("/analytics", (req, res) => {
  res.json({
    tracking: analytics
  });
});

app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});
