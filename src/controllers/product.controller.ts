import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Create Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { 
      title, 
      slug, 
      description, 
      price, 
      discountPrice, 
      stock, 
      specifications, 
      categoryId, 
      featured,
      images // Expecting array of { url: string, isMain: boolean }
    } = req.body;

    const product = await prisma.product.create({
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
          create: images.map((img: any) => ({
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Products
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        images: true,
        category: true
      },
      orderBy: { createdAt: 'desc' }
    });
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get Single Product
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const product = await prisma.product.findUnique({
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update Product
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { 
      title, 
      description, 
      price, 
      discountPrice, 
      stock, 
      specifications, 
      categoryId, 
      featured 
    } = req.body;

    const product = await prisma.product.update({
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
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    await prisma.product.delete({
      where: { id }
    });
    res.json({ message: 'Product deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
