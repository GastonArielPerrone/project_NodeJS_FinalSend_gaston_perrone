const products = [
  { id: 1, name: "Teclado", price: 100, categoryID: 1 },
  { id: 2, name: "Mouse", price: 50, categoryID: 1 },
  { id: 3, name: "Lámpara", price: 300, categoryID: 2 },
];

export const getAllProducts = async () => {
  return products;
};

export const getProductById = async (id) => {
  return products.find((product) => product.id === id);
};

export const createProduct = async (product) => {
  const newProduct = { id: products.length + 1, ...product };
  products.push(newProduct);
  return newProduct;
}