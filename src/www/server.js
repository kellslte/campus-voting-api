import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import globalErrorHandler from "../middleware/error.middleware.js";
import appRouter from "../routes/index.routes.js";
import { join } from "path";

// Application Server Definition
const app = express();
const server = createServer(app);

// Middleware Configuration
app.use("/assets", express.static(join(process.cwd(), "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173", // ✅ Use "origin" instead of "origins"
    methods: ["GET", "POST", "PUT", "DELETE"], // ✅ Array format is preferred
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Authorization"],
    credentials: true, // ✅ Ensure cookies and credentials are included
  })
);

app.use( cookieParser() );

// Application Routes
app.use( appRouter );

// Global Error Handler
app.use( globalErrorHandler );

export { app, server };
