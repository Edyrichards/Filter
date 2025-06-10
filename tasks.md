# Codex Tasks – Shopify Product Filter & Search App

## 🧱 Setup
- [x] Create a Node.js + Express server
- [ ] Add Shopify OAuth and App Bridge integration
- [x] Configure Prisma + PostgreSQL
- [ ] Setup Typesense client and schema creation

## 🔌 Shopify Webhooks & Product Sync
- [ ] Set up webhook for product/create, update, delete
- [ ] Write `syncProducts.js` to push products to Typesense
- [ ] Schedule daily reindexing

## 🖥️ Embedded Admin App (React + Polaris)
- [ ] Create embedded React app with App Bridge
- [ ] Build Filter Management UI (tag, size, price range)
- [ ] Save filter configs in DB
- [ ] Add search ranking override UI

## 🎨 Theme Extension
- [ ] Create App Block for filters
- [ ] Inject filter UI using Tailwind + Alpine.js
- [ ] Connect to Typesense search API
- [ ] Add instant search bar with suggestions

## 💰 Billing Logic
- [ ] Add Shopify Billing API (free + paid tiers)
- [ ] Enforce usage limits in backend
- [ ] Show plan info in admin panel

## 📊 Analytics
- [ ] Track top search terms and no-result queries
- [ ] Store analytics events in DB
- [ ] Visualize in React dashboard

## ✅ Finalization
- [ ] Add privacy policy & TOS pages
- [ ] Test in multiple Shopify themes
- [ ] Prepare App Store assets
