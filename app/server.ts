import { health, hello } from "./api.ts";
import homepage from "./index.html";

const hostname = process.env.HOST || "127.0.0.1";
const port = Number(process.env.PORT || "3000");
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  throw new Error("PORT must be an integer between 1 and 65535");
}

const server = Bun.serve({
  hostname,
  port,
  routes: {
    "/": homepage,
    "/api/hello": { GET: hello },
    "/api/health": { GET: health },
    "/api/*": () => new Response("Not found", { status: 404 }),
  },
  development: process.env.NODE_ENV === "development" ? { hmr: true, console: true } : false,
});

console.log(`Listening on http://${server.hostname}:${server.port}`);
