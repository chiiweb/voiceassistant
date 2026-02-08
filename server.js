import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

app.post("/api/ask", async (req, res) => {
  const prompt = req.body.prompt;

  // Call your AI model here
  const aiResponse = await fetch("YOUR_AI_ENDPOINT", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  const data = await aiResponse.json();
  res.json({ reply: data.reply });
});

app.listen(3000, () => console.log("Server running"));
