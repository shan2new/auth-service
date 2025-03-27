// index.ts
import express from "express";
import cors from "cors";
import SuperTokens from "supertokens-node";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import "./ supertokensConfig";

const app = express();

app.use(
  cors({
    origin: process.env.WEBSITE_DOMAIN || "http://localhost:5173",
    allowedHeaders: ["content-type", ...SuperTokens.getAllCORSHeaders()],
    credentials: true,
  })
);

app.use(express.json());

app.use(middleware());

app.use(errorHandler());

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Auth service running on port ${port}`);
});