let MOCK_PRODUCTS = [
  { id: 1, name: 'MacBook Pro M3', price: 2000, category: 'electronics', inStock: true },
  { id: 2, name: 'iPhone 15 Pro', price: 1200, category: 'electronics', inStock: true },
  { id: 3, name: 'Tai nghe Sony XM5', price: 350, category: 'accessories', inStock: false },
  { id: 4, name: 'Bàn phím Keychron K2', price: 100, category: 'accessories', inStock: true },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const findProductsFromDB = async () => {
  await delay(200);
  return [...MOCK_PRODUCTS];
};

export const findProductByIdFromDB = async (id) => {
  await delay(100);
  return MOCK_PRODUCTS.find((p) => p.id === id) ?? null;
};

export const findProductByNameFromDB = async (name) => {
  await delay(100);
  return MOCK_PRODUCTS.find((p) => p.name.toLowerCase() === name.toLowerCase()) ?? null;
};

export const createProductInDB = async ({ name, price, category = 'general', inStock = true }) => {
  await delay(200);
  const newProduct = {
    id: MOCK_PRODUCTS.length + 1,
    name,
    price: Number(price),
    category,
    inStock: Boolean(inStock),
    created_at: new Date().toISOString(),
  };
  MOCK_PRODUCTS.push(newProduct);
  return { ...newProduct };
};