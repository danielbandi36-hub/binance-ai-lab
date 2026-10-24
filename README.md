# Binance Strategy Lab + AI Agent

This repository contains a static HTML trading dashboard and a lightweight Node.js backend for safer API handling.

## Files

- `index.html` — GitHub Pages frontend entry point
- `binance_ai_lab.html` — original HTML dashboard file
- `server.js` — backend proxy for Binance + AI requests
- `.env.example` — backend environment template
- `package.json` — scripts and dependencies

## Frontend deployment on GitHub Pages

1. Go to your repository.
2. Open Settings → Pages.
3. Set Source to `Deploy from a branch`.
4. Select the `main` branch.
5. Set folder to `/root`.
6. Save.

Your static frontend URL will be:

```text
https://danielbandi36-hub.github.io/binance-ai-lab/
```

## Backend deployment

This app has a safer backend layer designed to keep AI keys off the browser.

### Local run

```bash
npm install
cp .env.example .env
npm start
```

Then test:

```bash
curl http://localhost:3000/health
```

### Production hosting ideas

Use a small host such as:

- Render
- Railway
- Fly.io
- DigitalOcean App Platform
- Vercel (Node server)

Set your environment variables there:

- `OPENROUTER_API_KEY`
- `OLLAMA_BASE_URL`
- `PORT`

Then point the browser frontend to the deployed backend URL instead of calling external providers directly.

## Custom domain setup

If you already own a domain, add it to GitHub Pages and create a DNS record:

- GitHub Pages: `Settings -> Pages -> Custom domain`
- DNS record: `CNAME` pointing to `danielbandi36-hub.github.io`

If you want to route traffic through a subdomain such as `tradinglab.yourdomain.com`, create a DNS CNAME for that name.

## Security notes

- Keep API keys on the backend, never in browser storage or the static page.
- Prefer demo account testing before live Deriv orders.
- The app is for research and educational use only, not financial advice.

## Disclaimer

This project is for educational and research purposes only. It is not financial advice.
