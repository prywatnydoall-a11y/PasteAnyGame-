require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;
const WEBHOOK = process.env.DISCORD_WEBHOOK_URL;

app.use(express.json());
app.use(express.static("public"));

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 5
}));

app.post("/api/send-to-discord", async (req, res) => {
  const { text } = req.body;

  if (!text || text.length > 5000) {
    return res.status(400).json({ error: "Invalid message" });
  }

  if (text.includes("@everyone") || text.includes("@here")) {
    return res.status(400).json({ error: "Mentions not allowed" });
  }

  try {
    await fetch(WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: text
      })
    });

    res.json({ success: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: "Failed to send" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
