import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import courseRouter from './routes/courses.js';
import adminRouter from './routes/admin.js';
import uploadRouter from './routes/upload.js';
import subjectRouter from './routes/subject.js';
import { connectDB } from './database/db.js';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerSpecs from './swagger.js';

dotenv.config();

const app = express(); // ✅ Create app FIRST

// ✅ Define allowed origins
const allowedOrigins = [
  "https://topicwise.vercel.app",
  "http://localhost:3000"
];

// ✅ Apply CORS middleware BEFORE routes
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman / server-to-server
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("❌ CORS blocked for:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Allow preflight requests
app.options("*", cors());

// ✅ Middleware for body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// ✅ Serve static files
app.use('/uploads', express.static('uploads'));

// ✅ Default route
app.get('/', (req, res) => {
  return res.send("✅ Server is running properly with CORS enabled");
});

// ✅ API routes
app.use('/api', userRoutes);
app.use('/api', courseRouter);
app.use('/api', adminRouter);
app.use('/api', uploadRouter);
app.use('/api', subjectRouter);

// ✅ Connect DB and start server
connectDB();

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});

// ✅ Export for Vercel serverless
export default app;
