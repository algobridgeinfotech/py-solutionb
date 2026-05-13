"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInquiry = exports.updateInquiryStatus = exports.getAllInquiries = exports.createInquiry = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
// Create Inquiry
const createInquiry = async (req, res) => {
    try {
        const { productName, productId, customerName, customerPhone, customerEmail, message } = req.body;
        const inquiry = await prisma_1.default.inquiry.create({
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
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createInquiry = createInquiry;
// Get All Inquiries
const getAllInquiries = async (req, res) => {
    try {
        const inquiries = await prisma_1.default.inquiry.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(inquiries);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.getAllInquiries = getAllInquiries;
// Update Inquiry Status
const updateInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        const inquiry = await prisma_1.default.inquiry.update({
            where: { id },
            data: { status }
        });
        res.json(inquiry);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.updateInquiryStatus = updateInquiryStatus;
// Delete Inquiry
const deleteInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma_1.default.inquiry.delete({
            where: { id }
        });
        res.json({ message: 'Inquiry deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.deleteInquiry = deleteInquiry;
