import { Hono } from "hono";
import { log } from "@repo/logger";
const app = new Hono();

app.get("/", (c) => {
  log("Hello from the Hono API!");
  return c.text("Hello from the Hono API!");
});

export default app;
