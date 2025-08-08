import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors(
    {
        origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
        credentials: true
    }
));
// Middleware to parse JSON and URL-encoded data
app.use(express.json(
    {
        limit: '16kb'
    }
));
// Middleware to parse URL-encoded data
app.use(express.urlencoded(
    {
        extended: true,
        limit: '16kb'
    }
));

// Middleware to serve static files
app.use(express.static('public'));

// Middleware to parse cookies

app.use(cookieParser());

import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/user", userRoutes);

export { app }