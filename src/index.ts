// src/index.ts
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import SuperTokens from "supertokens-node";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import './supertokensConfig';
import cookieParser from "cookie-parser";
import { getSession } from "supertokens-node/recipe/session";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.WEBSITE_DOMAIN || "http://localhost:5173",
    allowedHeaders: ["content-type", ...SuperTokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use(middleware());

app.get("/auth/verify", (req: Request, res: Response, next: NextFunction) => {
  (async () => {
    try {
      const session = await getSession(req, res, { sessionRequired: false });
      if (session) {
        const userId = session.getUserId();
        return res.status(200).json({ user: { id: userId } });
      } else {
        return res.status(401).json({ error: "Unauthorized" });
      }
    } catch (error) {
      console.error("Verification error:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  })().catch(next);
});

app.use(errorHandler());

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});