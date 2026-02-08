const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// ===== YOUR REFERRALS =====
const TG_REF = "https://t.me/hector_trojanbot?start=r-solprofitportal";
const WEB_REF = "https://trojan.com/@Satoshit";

// ===== SIMPLE ANALYTICS =====
let analytics = {
  total_requests: 0,
  signals_served: 0,
  intents_created: 0
};

app.use((req, res, next) => {
  analytics.total_requests++;
  next();
});

// ======================================================
// ROOT
// ======================================================
app.get("/", (req, res) => {
  res.json({
    service: "Trojan Feature Gateway API",
    status: "online",
    available_features: [
      "Pump.fun Signals",
      "Copy Trading (Simulated)",
      "Token Audits",
      "Real-Time Alerts",
      "Historic Data",
      "Watchlists",
      "Custom PNL Cards",
      "Perpetual Indicators"
    ],
    analytics
  });
});

// ======================================================
// PUMP.FUN TRENDING (YOU ALREADY HAD THIS — ENHANCED)
// ======================================================
app.get("/pumpfun/trending", (req, res) => {
  analytics.signals_served++;

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
      telegram: TG_REF,
      web: WEB_REF
    }
  });
});

// ======================================================
// COPY TRADING (SIMULATED)
// ======================================================
app.get("/copy-trading/top-wallets", (req, res) => {
  res.json({
    feature: "copy_trading",
    description: "Top performing wallets (simulated)",
    wallets: [
      { wallet: "7xA...9Qp", pnl_7d: "+124%", winrate: "78%" },
      { wallet: "9Fz...Lm2", pnl_7d: "+96%", winrate: "71%" }
    ],
    copy_via: {
      telegram: TG_REF,
      web: WEB_REF
    }
  });
});

// ======================================================
// TOKEN AUDIT (SIMULATED)
// ======================================================
app.get("/token/audit", (req, res) => {
  const token = req.query.token || "UNKNOWN";

  res.json({
    feature: "token_audit",
    token,
    audit: {
      mint_verified: true,
      lp_locked: false,
      honeypot_risk: "medium",
      contract_risk_score: 6.4
    },
    trade_with: {
      telegram: TG_REF,
      web: WEB_REF
    }
  });
});

// ======================================================
// REAL-TIME ALERTS (SIMULATED)
// ======================================================
app.get("/alerts/latest", (req, res) => {
  res.json({
    feature: "real_time_alerts",
    alerts: [
      { type: "volume_spike", token: "WIF2", change: "+320%" },
      { type: "whale_buy", token: "DOGX", amount_usd: 18000 }
    ],
    enable_alerts_via: {
      telegram: TG_REF,
      web: WEB_REF
    }
  });
});

// ======================================================
// HISTORIC DATA
// ======================================================
app.get("/historic/price", (req, res) => {
  const token = req.query.token || "WIF2";

  res.json({
    feature: "historic_data",
    token,
    prices: [
      { t: "T-15m", price: 0.004 },
      { t: "T-10m", price: 0.005 },
      { t: "T-5m", price: 0.007 }
    ]
  });
});

// ======================================================
// WATCHLISTS
// ======================================================
app.get("/watchlists/sample", (req, res) => {
  res.json({
    feature: "watchlists",
    watchlist_name: "Pump.fun Hot Picks",
    tokens: ["WIF2", "DOGX", "PEEP"],
    manage_via: {
      telegram: TG_REF,
      web: WEB_REF
    }
  });
});

// ======================================================
// CUSTOM PNL CARD (SIMULATED)
// ======================================================
app.get("/pnl/card", (req, res) => {
  res.json({
    feature: "custom_pnl_card",
    wallet: "Simulated",
    pnl_24h: "+18.4%",
    pnl_7d: "+112%",
    share_via: {
      telegram: TG_REF,
      web: WEB_REF
    }
  });
});

// ======================================================
// PERPETUALS (SIMULATED SIGNAL)
// ======================================================
app.get("/perps/indicator", (req, res) => {
  res.json({
    feature: "perpetuals",
    market: "SOL-PERP",
    funding_rate: "0.012%",
    bias: "long",
    trade_via: {
      telegram: TG_REF,
      web: WEB_REF
    }
  });
});

// ======================================================
// ANALYTICS (FOR YOU)
// ======================================================
app.get("/analytics", (req, res) => {
  res.json(analytics);
});

app.listen(PORT, () => {
  console.log("Trojan Feature Gateway API running on port " + PORT);
});
