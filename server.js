import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;
const https://discord.com/api/webhooks/1478144033514590381/3KgD1bTbiegoQpDZhKLeexuUicadHlbjM8CsK9KYraM9hY3E0hzDfo_oxy25p1_40Y8m = process.env.WEBHOOK;

app.use(express.json());
app.use(express.static("public"));

app.post("/api/send-to-discord", async (req, res) => {
  const { text } = req.body;

  if (!text) return res.status(400).json({ error: "No text provided" });
  if (!https://discord.com/api/webhooks/1478144033514590381/3KgD1bTbiegoQpDZhKLeexuUicadHlbjM8CsK9KYraM9hY3E0hzDfo_oxy25p1_40Y8m) return res.status(500).json({ error: "Webhook not set" });

  try {
    await fetch(https://discord.com/api/webhooks/1478144033514590381/3KgD1bTbiegoQpDZhKLeexuUicadHlbjM8CsK9KYraM9hY3E0hzDfo_oxy25p1_40Y8m, {
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
