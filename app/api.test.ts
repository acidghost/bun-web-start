import { afterAll, expect, test } from "bun:test";
import { health, hello } from "./api.ts";

// Exercise the actual HTTP routes without starting the HTML bundler or a second app process.
const server = Bun.serve({
  hostname: "127.0.0.1",
  port: 3001,
  routes: {
    "/api/hello": { GET: hello },
    "/api/health": { GET: health },
  },
});

afterAll(() => server.stop(true));

test("serves the greeting over HTTP", async () => {
  const response = await fetch(`${server.url}api/hello`);
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ message: "Hello from Bun!" });
});

test("reports health over HTTP", async () => {
  const response = await fetch(`${server.url}api/health`);
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ ok: true });
});
