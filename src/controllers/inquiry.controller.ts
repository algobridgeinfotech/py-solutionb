import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Create Inquiry
export const createInquiry = async (req: Request, res: Response) => {
  try {
    const { 
      productName, 
      productId, 
      customerName, 
      customerPhone, 
      customerEmail, 
      message 
    } = req.body;

    const inquiry = await prisma.inquiry.create({
      data: {
        productName,
        productId,
        customerName,
        customerPhone,
        customerEmail,
        message,
        status: 'PENDING'
      }
    });

    res.status(201).json(inquiry);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Inquiries
export const getAllInquiries = async (req: Request, res: Response) => {
  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(inquiries);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update Inquiry Status
export const updateInquiryStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    const { status } = req.body;

    const inquiry = await prisma.inquiry.update({
      where: { id },
      data: { status }
    });

    res.json(inquiry);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Inquiry
export const deleteInquiry = async (req: Request, res: Response) => {
  try {
    const { id } = req.params as { id: string };
    await prisma.inquiry.delete({
      where: { id }
    });
    res.json({ message: 'Inquiry deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
