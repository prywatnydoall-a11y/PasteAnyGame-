import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const DISCORD_WEBHOOK_URL = process.env.WEBHOOK;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/send-to-discord", async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "No text provided" });
  if (!DISCORD_WEBHOOK_URL) return res.status(500).json({ error: "Webhook not set" });

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: text })
    });

    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to send" });
  }
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
