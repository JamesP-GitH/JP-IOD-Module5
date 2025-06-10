const ProductsCache = require("../libraries/ProductsCache");

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductsCache.fetchAllProducts();
        res.json(products);
    } catch (error) {
        res.status(400).json({ message: "Error fetching products" });
    }
};

const getProductById = async (req, res) => {
    const { id } = req.params;

    if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid product ID" });
    }

    try {
        const product = await ProductsCache.fetchProductById(id);
        res.json(product);
    } catch (error) {
        if (error.message === "Product not found") {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(400).json({ message: "Error fetching product" });
    }
};

module.exports = { getAllProducts, getProductById };
