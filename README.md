# Filter App

This project provides a basic Express.js server with Shopify OAuth support. It will be expanded with additional Shopify integrations and other features.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file with your Shopify app credentials:
   ```bash
   SHOPIFY_API_KEY=<your_api_key>
   SHOPIFY_API_SECRET=<your_api_secret>
   HOST=localhost:3000
   # Optional comma-separated scopes
   SCOPES=read_products
   ```
3. Start the development server:
   ```bash
    npm start
    ```
    The server runs on [http://localhost:3000](http://localhost:3000).
    Visit `/auth?shop=your-store.myshopify.com` to begin OAuth.

The sample app stores sessions in memory. Restarting the server will clear all sessions.
