import productsService from "../services/products.service.js";

export const getAllProducts = async (req, res) => {
    res.status(200).json(await productsService.getAllProducts());
};

export const getProductById = async (req, res) => {
    const id = req.params.id;
    const product = await productsService.getProductById(parseInt(id));
    if (product) {
        return res.status(200).json(product);
    } else {
        return res.status(404).json({ message: "Product not found" });
    }
};

export const createProduct = async (req, res) => {
    const { name, price, categoryID } = req.body;
    const newProduct = await productsService.createProduct({ name, price, categoryID });
    res.status(201).json({ message: "Product created", product: newProduct });
};