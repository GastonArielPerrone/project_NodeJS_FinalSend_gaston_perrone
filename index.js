import cors from "cors";
import express from "express";

const app = express();
const PORT = 3000;
const products = [
  { id: 1, name: "Teclado", price: 100, categoryID: 1 },
  { id: 2, name: "Mouse", price: 50, categoryID: 1 },
  { id: 3, name: "Lámpara", price: 300, categoryID: 2 },
];

const categories = [
  { id: 1, name: "Tecnología" },
  { id: 2, name: "Hogar" },
];

app.use(cors());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.get("/", (req, res) => {
  res.send("API Funcionando");
});

app.get("/html", (req, res) => {
  res.send("<h1>Bienvenidos al HTML</h1>");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.get("/api/categories", (req, res) => {
  res.json(categories);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  console.log(`Fetching product with ID: ${productId}`);
  const product = products.find((product) => product.id === productId);
  res.json(product);

  !product ? res.status(404).json({ message: "Producto no encontrado" }) : null;
});

app.get("/api/products", (req, res) => {
  const categoryId = parseInt(req.query.categoryId);

  if (!req.query.categoryId) {
    res.json(products);
    return;
  }

  console.log(`Fetching products for category ID: ${categoryId}`);
  const filteredProducts = products.filter(
    (product) => product.categoryID === categoryId,
  );
  res.json(filteredProducts);
});

app.post("/api/products", (req, res) => {
  const { name, price, categoryID } = req.body;

  if (!name || !price || !categoryID) {
    return res.status(400).json({ message: "Faltan datos del producto" });
  }

  const newProduct = {
    id: products.length + 1,
    name,
    price,
    categoryID,
  };

  products.push(newProduct);

  res.send("OK");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
