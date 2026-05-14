import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import helmet from "helmet";
import hpp from "hpp";
import rateLimit from "express-rate-limit";
import prisma from '../src/lib/prisma';
import productRoutes from '../src/routes/product.routes';
import authRoutes from '../src/routes/auth.routes';
import inquiryRoutes from '../src/routes/inquiry.routes';
import blogRoutes from '../src/routes/blog.routes';

const app = express();
const PORT = process.env.PORT || 5000;

// Security Middleware
app.use(helmet()); 
app.use(hpp());    
app.use(cors({
  origin: ["http://localhost:3000", process.env.FRONTEND_URL || ""],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  credentials: true
}));
app.use(express.json({ limit: "10kb" })); // Limit body size to prevent DoS

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api/", limiter);

// Routes
app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/inquiries', inquiryRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'PY SOLUTION API is running' });
});

// Health check and Prisma test
app.get('/health', async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: 'UP', database: 'CONNECTED' });
  } catch (error) {
    res.status(500).json({ status: 'DOWN', error: 'Database connection failed' });
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
