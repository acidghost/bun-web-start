export function hello(): Response {
  return Response.json({ message: "Hello from Bun!" });
}

export function health(): Response {
  return Response.json({ ok: true });
}
