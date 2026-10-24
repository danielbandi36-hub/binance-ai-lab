# Binance Strategy Lab + AI Agent

This repository contains a static HTML trading dashboard for:

- Binance market data loading
- Strategy backtesting
- AI-driven decision support
- Paper trading simulation
- Optional live Deriv trading setup

## Files

- `index.html` — GitHub Pages entry point
- `binance_ai_lab.html` — original app file name

## Local run

```bash
cd /path/to/repo
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/index.html
```

## GitHub Pages deployment

1. Open your GitHub repository.
2. Go to Settings → Pages.
3. Set Source to `Deploy from a branch`.
4. Select the `main` branch.
5. Set folder to `/root`.
6. Save.

Your site will be published at:

```text
https://danielbandi36-hub.github.io/binance-ai-lab/
```

## Important notes

- The app calls Binance APIs directly from the browser.
- OpenRouter keys are stored in page memory only.
- Ollama must be running locally if you use local AI.
- Deriv trading requires a valid App ID and PAT.
- Live trading should be tested with a demo account first.

## Disclaimer

This project is for educational and research purposes only. It is not financial advice.
