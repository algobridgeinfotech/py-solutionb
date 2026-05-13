import { Router } from "express";
import { 
  getAllBlogs, 
  getBlogBySlug, 
  createBlog, 
  updateBlog, 
  deleteBlog 
} from "../controllers/blog.controller";

import { authenticateAdmin } from "../middleware/auth.middleware";

const router = Router();

router.get("/", getAllBlogs);
router.get("/:slug", getBlogBySlug);

// Protected Admin Routes
router.post("/", authenticateAdmin, createBlog);
router.put("/:id", authenticateAdmin, updateBlog);
router.delete("/:id", authenticateAdmin, deleteBlog);

export default router;
