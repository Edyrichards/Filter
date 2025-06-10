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

Create a PostgreSQL database and set the `DATABASE_URL` environment variable so sessions can be stored using Prisma.
Run `npx prisma migrate dev` to create the required tables.
Sessions will then persist in the database instead of memory.
Set up a Typesense server and define these variables in `.env` to enable product indexing:
```bash
TYPESENSE_API_KEY=<search_or_admin_key>
TYPESENSE_HOST=localhost
TYPESENSE_PORT=8108
TYPESENSE_PROTOCOL=http
```
