"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogBySlug = exports.getAllBlogs = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await prisma_1.default.blog.findMany({
            orderBy: { createdAt: "desc" }
        });
        res.json(blogs);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllBlogs = getAllBlogs;
const getBlogBySlug = async (req, res) => {
    try {
        const { slug } = req.params;
        const blog = await prisma_1.default.blog.findUnique({
            where: { slug: slug }
        });
        if (!blog)
            return res.status(404).json({ message: "Blog not found" });
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getBlogBySlug = getBlogBySlug;
const createBlog = async (req, res) => {
    try {
        const { title, slug, content, thumbnail, category } = req.body;
        const blog = await prisma_1.default.blog.create({
            data: { title, slug, content, thumbnail, category }
        });
        res.status(201).json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createBlog = createBlog;
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const blog = await prisma_1.default.blog.update({
            where: { id: id },
            data
        });
        res.json(blog);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateBlog = updateBlog;
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.blog.delete({ where: { id: id } });
        res.json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteBlog = deleteBlog;
