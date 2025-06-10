const express = require('express');
const { shopifyApi } = require('@shopify/shopify-api');
const { MemorySessionStorage } = require('@shopify/shopify-app-session-storage-memory');

const app = express();

const PORT = process.env.PORT || 3000;

// In-memory session storage (not for production use)
const sessionStorage = new MemorySessionStorage();

const shopify = shopifyApi({
  apiKey: process.env.SHOPIFY_API_KEY || '',
  apiSecretKey: process.env.SHOPIFY_API_SECRET || '',
  scopes: (process.env.SCOPES || 'read_products').split(','),
  hostName: (process.env.HOST || `localhost:${PORT}`).replace(/https?:\/\//, ''),
});

app.get('/auth', async (req, res) => {
  const { shop } = req.query;
  if (!shop) {
    return res.status(400).send('Missing shop parameter');
  }

  await shopify.auth.begin({
    shop,
    callbackPath: '/auth/callback',
    isOnline: true,
    rawRequest: req,
    rawResponse: res,
  });
});

app.get('/auth/callback', async (req, res) => {
  try {
    const { session } = await shopify.auth.callback({
      rawRequest: req,
      rawResponse: res,
    });

    // Persist session in memory
    await sessionStorage.storeSession(session);

    res.redirect(`/?shop=${session.shop}`);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get('/', async (req, res) => {
  const sessionId = await shopify.session.getCurrentId({
    isOnline: true,
    rawRequest: req,
    rawResponse: res,
  });

  if (!sessionId) {
    const { shop } = req.query;
    if (shop) {
      return res.redirect(`/auth?shop=${shop}`);
    }
    return res.status(401).send('No active session');
  }

  const session = await sessionStorage.loadSession(sessionId);

  if (!session) {
    return res.redirect(`/auth?shop=${req.query.shop || ''}`);
  }

  res.send(`Hello, ${session.shop}!`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
