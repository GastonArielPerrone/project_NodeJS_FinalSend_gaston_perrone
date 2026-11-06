import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { authentication } from "./src/middlewares/authentication.js";
import authRoutes from "./src/routes/auth.routes.js";
import productsRoutes from "./src/routes/products.routes.js";

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use(express.json());

app.use("/api", authentication, productsRoutes);

app.use((req, res, next) => {
  res.status(404).json({ message: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
