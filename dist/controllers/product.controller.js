"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getAllProducts = exports.createProduct = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// Create Product
const createProduct = async (req, res) => {
    try {
        const { title, slug, description, price, discountPrice, stock, specifications, categoryId, featured, images // Expecting array of { url: string, isMain: boolean }
         } = req.body;
        const product = await prisma_1.default.product.create({
            data: {
                title,
                slug,
                description,
                price: parseFloat(price),
                discountPrice: discountPrice ? parseFloat(discountPrice) : null,
                stock: parseInt(stock),
                specifications,
                featured: featured || false,
                categoryId,
                images: {
                    create: images.map((img) => ({
                        url: img.url,
                        isMain: img.isMain || false
                    }))
                }
            },
            include: {
                images: true,
                category: true
            }
        });
        res.status(201).json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createProduct = createProduct;
// Get All Products
const getAllProducts = async (req, res) => {
    try {
        const products = await prisma_1.default.product.findMany({
            include: {
                images: true,
                category: true
            },
            orderBy: { createdAt: 'desc' }
        });
        res.json(products);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllProducts = getAllProducts;
// Get Single Product
const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma_1.default.product.findUnique({
            where: { id },
            include: {
                images: true,
                category: true
            }
        });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getProductById = getProductById;
// Update Product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, discountPrice, stock, specifications, categoryId, featured } = req.body;
        const product = await prisma_1.default.product.update({
            where: { id },
            data: {
                title,
                description,
                price: price ? parseFloat(price) : undefined,
                discountPrice: discountPrice ? parseFloat(discountPrice) : undefined,
                stock: stock ? parseInt(stock) : undefined,
                specifications,
                featured,
                categoryId
            },
            include: {
                images: true,
                category: true
            }
        });
        res.json(product);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateProduct = updateProduct;
// Delete Product
const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.product.delete({
            where: { id }
        });
        res.json({ message: 'Product deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteProduct = deleteProduct;
