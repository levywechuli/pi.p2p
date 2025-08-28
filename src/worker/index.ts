import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();

app.use("/*", cors());

app.post("/api/messages", async (c) => {
  const { message } = await c.req.json();

  if (!message || message.trim().split(" ").length !== 24) {
    return c.json({ error: "Message must be exactly 24 words" }, 400);
  }

  await c.env.DB.prepare(
    "INSERT INTO messages (content) VALUES (?)"
  ).bind(message).run();

  return c.json({ success: true });
});

// ✅ Admin can fetch messages
app.get("/api/messages", async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM messages ORDER BY id DESC").all();
  return c.json(results);
});

export default app;
