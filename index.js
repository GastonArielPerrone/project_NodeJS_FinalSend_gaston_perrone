import cors from "cors";
import express from "express";

const app = express();
const PORT = 3000;
const products = [
  {
    name: "Producto 1",
    price: 100,
  },
  {
    name: "Producto 2",
    price: 200,
  },
  {
    name: "Producto 3",
    price: 300,
  },
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

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
