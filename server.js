const express = require('express');
const cors = require('cors');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT || 3000);

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  res.json({
    ok: true,
    service: 'binance-ai-lab-api',
    timestamp: new Date().toISOString(),
    providers: {
      openrouter: !!process.env.OPENROUTER_API_KEY,
      pollinations: true,
      ollama: !!process.env.OLLAMA_BASE_URL
    }
  });
});

app.get('/api/binance/klines', async (req, res) => {
  const symbol = String(req.query.symbol || 'BTCUSDT').toUpperCase();
  const interval = String(req.query.interval || '1h');
  const limit = Number(req.query.limit || 300);

  const endpoints = [
    'https://api.binance.com',
    'https://data-api.binance.vision'
  ];

  for (const base of endpoints) {
    try {
      const response = await axios.get(`${base}/api/v3/klines`, {
        params: { symbol, interval, limit }
      });
      return res.json(response.data);
    } catch (error) {
      continue;
    }
  }

  return res.status(502).json({
    error: 'Binance is unavailable from the backend right now.'
  });
});

app.post('/api/ai/chat', async (req, res) => {
  const { provider = 'openrouter', model, messages = [], temperature = 0.3 } = req.body || {};

  try {
    if (provider === 'pollinations') {
      const response = await axios.post(
        'https://text.pollinations.ai/openai',
        {
          model: model || 'openai',
          messages,
          temperature
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      return res.json(response.data);
    }

    if (provider === 'ollama') {
      const baseUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
      const response = await axios.post(
        `${baseUrl}/v1/chat/completions`,
        {
          model: model || 'llama3.2',
          messages,
          temperature
        },
        { headers: { 'Content-Type': 'application/json' } }
      );
      return res.json(response.data);
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(401).json({
        error: 'Missing OPENROUTER_API_KEY in server environment.'
      });
    }

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model || 'meta-llama/llama-3.3-70b-instruct:free',
        messages,
        temperature
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiKey}`
        }
      }
    );

    return res.json(response.data);
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error?.message || error.message || 'AI request failed';
    return res.status(status).json({ error: message });
  }
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(PORT, () => {
  console.log(`Binance AI lab backend listening on http://localhost:${PORT}`);
});
