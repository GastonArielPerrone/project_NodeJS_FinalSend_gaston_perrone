import cors from "cors";
import express from "express";
import productsRoutes from "./src/routes/products.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());

app.use("/api", productsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
