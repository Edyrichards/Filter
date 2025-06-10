const express = require('express');
const { shopifyApi } = require('@shopify/shopify-api');
const { PrismaClient } = require('@prisma/client');
const { PrismaSessionStorage } = require('@shopify/shopify-app-session-storage-prisma');
const { syncProduct } = require('./typesense');

const app = express();

const PORT = process.env.PORT || 3000;

// Prisma-based session storage with PostgreSQL
const prisma = new PrismaClient();
const sessionStorage = new PrismaSessionStorage(prisma);

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

    // Persist session in the database
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

module.exports = { app, syncProduct };
