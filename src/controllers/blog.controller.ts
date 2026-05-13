import { Request, Response } from "express";
import prisma from "../lib/prisma";

export const getAllBlogs = async (req: Request, res: Response) => {
  try {
    const blogs = await prisma.blog.findMany({
      orderBy: { createdAt: "desc" }
    });
    res.json(blogs);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getBlogBySlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;
    const blog = await prisma.blog.findUnique({
      where: { slug: slug as string }
    });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createBlog = async (req: Request, res: Response) => {
  try {
    const { title, slug, content, thumbnail, category } = req.body;
    const blog = await prisma.blog.create({
      data: { title, slug, content, thumbnail, category }
    });
    res.status(201).json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const blog = await prisma.blog.update({
      where: { id: id as string },
      data
    });
    res.json(blog);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.blog.delete({ where: { id: id as string } });
    res.json({ message: "Blog deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
