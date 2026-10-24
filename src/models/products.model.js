import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;

const dataPath = path.join(__dirname, '../data/dataProducts.json');

export const getAllProducts = async () => {
    const data = fs.readFileSync(dataPath, 'utf8');
    return JSON.parse(data);
}

export const getProductById = async (id) => {
    const products = await getAllProducts();
    return products.find((product) => product.id === id);
}

export const createProduct = async (product) => {
    const products = await getAllProducts();
    const newProduct = { id: products.length + 1, ...product };
    products.push(newProduct);
    fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
    return newProduct;
}

export const deleteProduct = async (id) => {
    const products = await getAllProducts();
    const productDeleted = products.filter((product) => product.id !== id);
    fs.writeFileSync(dataPath, JSON.stringify(productDeleted, null, 2));
    return productDeleted;
}

export const updateProduct = async (id, product) => {
    const products = await getAllProducts();
    const index = products.findIndex((p) => p.id === id);
    if (index !== -1) {
        products[index] = { ...products[index], ...product };
        fs.writeFileSync(dataPath, JSON.stringify(products, null, 2));
        return products[index];
    }
    throw new Error("Product not found");
}