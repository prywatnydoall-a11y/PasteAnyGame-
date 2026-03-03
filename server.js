require("dotenv").config();
const express = require("express");
const rateLimit = require("express-rate-limit");
const fetch = require("node-fetch");

const app = express();

app.use(express.json());
app.use(express.static("public"));

app.use(rateLimit({
  windowMs: 60 * 1000,
  max: 10
}));

app.post("/api/send-to-discord", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "No message provided" });
  }

  try {
    const response = await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: text
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Discord error:", errorText);
      return res.status(500).json({ error: "Discord rejected message" });
    }

    res.json({ success: true });

  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
