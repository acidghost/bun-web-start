# bun-web-start

A small, personal starter for full-stack Bun + TypeScript web apps. The server uses Bun's HTML routes; Lit and missing.css render the browser UI. The production build compiles the server and browser assets into one executable.

> [!NOTE]
> This template is tailored to my own projects. It does not include authentication or persistence.

## Create a project

```sh
bash init.sh <organization/username> <package-name>
# Or bash init.sh --hard <organization/username> <package-name> to replace this README,
# remove UNLICENSE and remove init.sh.
bun install --frozen-lockfile
```

The init script requires GNU sed (`gsed` on macOS; `brew install gnu-sed`). It substitutes the owner and name in template files; review the generated app and README before publishing. It does not rename the directory or configure a Git remote.

## Develop

```sh
bun run dev         # http://127.0.0.1:3000 (hot reload)
bun run check       # Biome format/lint/import checks
bun run format      # apply formatting and safe fixes
bun run typecheck   # strict TypeScript checks
bun run test        # Bun HTTP integration tests
bun run build       # dist/bun-web-start
bun run start       # build and run the executable
```

The demo serves `/`, `/api/hello`, and `/api/health`. The browser calls `/api/hello` and displays its response. Replace it with your app.

## Bind address and security

The server binds to `127.0.0.1:3000` by default. To make it reachable within a trusted homelab or private cluster, set `HOST` and optionally `PORT` explicitly:

```sh
HOST=0.0.0.0 PORT=3000 ./dist/bun-web-start
```

**There is no authentication.** Never expose it directly to the public internet. For users outside a trusted private network, put an authenticating reverse proxy and TLS in front of it. The compiled executable reads exported environment variables only; it does not load `.env` files from its launch directory. Development commands retain Bun's normal dotenv behavior.

## What is included

Bun pinned by mise, a committed `bun.lock`, package scripts instead of a separate task runner, Biome, TypeScript, Bun tests, and a pinned least-privilege CI workflow. No database, router, SSR, Docker image, or release automation yet.
