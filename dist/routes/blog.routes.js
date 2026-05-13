"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const blog_controller_1 = require("../controllers/blog.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const router = (0, express_1.Router)();
router.get("/", blog_controller_1.getAllBlogs);
router.get("/:slug", blog_controller_1.getBlogBySlug);
// Protected Admin Routes
router.post("/", auth_middleware_1.authenticateAdmin, blog_controller_1.createBlog);
router.put("/:id", auth_middleware_1.authenticateAdmin, blog_controller_1.updateBlog);
router.delete("/:id", auth_middleware_1.authenticateAdmin, blog_controller_1.deleteBlog);
exports.default = router;
