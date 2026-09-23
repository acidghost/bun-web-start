import { rm } from "node:fs/promises";
import { join } from "node:path";

const outdir = join(import.meta.dir, "..", "dist");
await rm(outdir, { recursive: true, force: true });

const result = await Bun.build({
  entrypoints: [join(import.meta.dir, "..", "app", "server.ts")],
  minify: true,
  compile: { outfile: join(outdir, "bun-web-start"), autoloadDotenv: false },
});

for (const log of result.logs) console.log(log);
if (!result.success) process.exit(1);
console.log(`Built ${join(outdir, "bun-web-start")}`);
