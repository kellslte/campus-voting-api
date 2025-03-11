import express from "express";
import compression from "compression";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import globalErrorHandler from "../middleware/error.middleware.js";
import appRouter from "../routes/index.routes.js";

// Application Server Definition
const app = express();
const server = createServer(app);

// Middleware Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());
app.use(helmet());
app.use(cors());
app.use( cookieParser() );

// Application Routes
app.use( appRouter );

// Global Error Handler
app.use( globalErrorHandler );

export { app, server };
