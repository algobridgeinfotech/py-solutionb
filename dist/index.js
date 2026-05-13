"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const prisma_1 = __importDefault(require("./lib/prisma"));
const helmet_1 = __importDefault(require("helmet"));
const hpp_1 = __importDefault(require("hpp"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const inquiry_routes_1 = __importDefault(require("./routes/inquiry.routes"));
const blog_routes_1 = __importDefault(require("./routes/blog.routes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
// Security Middleware
app.use((0, helmet_1.default)());
app.use((0, hpp_1.default)());
app.use((0, cors_1.default)({
    origin: ["http://localhost:3000", process.env.FRONTEND_URL || ""],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));
app.use(express_1.default.json({ limit: "10kb" })); // Limit body size to prevent DoS
// Rate Limiting
const limiter = (0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests from this IP, please try again after 15 minutes",
});
app.use("/api/", limiter);
// Routes
app.use('/api/products', product_routes_1.default);
app.use('/api/auth', auth_routes_1.default);
app.use('/api/inquiries', inquiry_routes_1.default);
app.use('/api/blogs', blog_routes_1.default);
app.get('/', (req, res) => {
    res.json({ message: 'PY SOLUTION API is running' });
});
// Health check and Prisma test
app.get('/health', async (req, res) => {
    try {
        await prisma_1.default.$queryRaw `SELECT 1`;
        res.json({ status: 'UP', database: 'CONNECTED' });
    }
    catch (error) {
        res.status(500).json({ status: 'DOWN', error: 'Database connection failed' });
    }
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
