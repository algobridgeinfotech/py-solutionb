"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = exports.login = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../lib/prisma"));
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Find admin by email
        const admin = await prisma_1.default.admin.findUnique({
            where: { email }
        });
        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Verify password
        const isPasswordValid = await bcryptjs_1.default.compare(password, admin.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        // Generate JWT
        const token = jsonwebtoken_1.default.sign({ id: admin.id, email: admin.email, role: admin.role }, process.env.JWT_SECRET || 'fallback_secret', { expiresIn: '1d' });
        // Remove password from response
        const { password: _, ...adminData } = admin;
        res.json({
            admin: adminData,
            token
        });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.login = login;
const register = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        // Check if admin already exists
        const existingAdmin = await prisma_1.default.admin.findUnique({
            where: { email }
        });
        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 12);
        // Create admin
        const admin = await prisma_1.default.admin.create({
            data: {
                email,
                password: hashedPassword,
                name,
                role: 'admin'
            }
        });
        const { password: _, ...adminData } = admin;
        res.status(201).json(adminData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.register = register;
