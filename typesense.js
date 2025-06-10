const Typesense = require('typesense');

const client = new Typesense.Client({
  nodes: [
    {
      host: process.env.TYPESENSE_HOST || 'localhost',
      port: Number(process.env.TYPESENSE_PORT) || 8108,
      protocol: process.env.TYPESENSE_PROTOCOL || 'http'
    }
  ],
  apiKey: process.env.TYPESENSE_API_KEY || '',
  connectionTimeoutSeconds: 10
});

const PRODUCT_COLLECTION = 'products';

async function ensureSchema() {
  const schema = {
    name: PRODUCT_COLLECTION,
    fields: [
      { name: 'id', type: 'string' },
      { name: 'title', type: 'string' },
      { name: 'body', type: 'string', optional: true },
      { name: 'tags', type: 'string[]', facet: true, optional: true },
      { name: 'price', type: 'float', optional: true }
    ],
    default_sorting_field: 'id'
  };

  try {
    await client.collections(PRODUCT_COLLECTION).retrieve();
  } catch (err) {
    if (err && err.httpStatus === 404) {
      await client.collections().create(schema);
    } else {
      throw err;
    }
  }
}

async function syncProduct(product) {
  await ensureSchema();
  return client
    .collections(PRODUCT_COLLECTION)
    .documents()
    .upsert(product);
}

module.exports = { client, syncProduct };
