const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

// ===== YOUR REFERRAL LINKS (FINAL) =====
const TG_REF = "https://t.me/hector_trojanbot?start=r-solprofitportal";
const WEB_REF = "https://trojan.com/@Satoshit";

// Health check
app.get("/", (req, res) => {
  res.send("Trojan Execution Gateway API is live");
});

// Pump.fun trending signal
app.get("/pumpfun/trending", (req, res) => {
  res.json({
    status: "signal",
    source: "pump.fun",
    token: {
      symbol: "WIF2",
      mint: "ABC123..."
    },
    confidence: 0.82,
    recommended_action: "buy",
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

// Trade intent endpoint
app.get("/intent/buy", (req, res) => {
  const token = req.query.token || "UNKNOWN";
  res.json({
    intent: "buy",
    token,
    execute: {
      telegram: TG_REF,
      web: WEB_REF
    }
  });
});

app.listen(PORT, () => {
  console.log("API running on port " + PORT);
});
