import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import { PORT, NODE_ENV, CLIENT_URL_DEV, CLIENT_URL_PROD } from "./config/env";
import polls from "./routes/polls.routes";
import { connectToDatabase } from "./database/mongodb";
import errorMiddleware from "./middlewares/error.middleware";
import authRouter from "./routes/auth.routes";

const app = express();

// Enable CORS
app.use(
  cors({
    origin: NODE_ENV === "production" ? CLIENT_URL_PROD : CLIENT_URL_DEV,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/polls", polls);

app.use(errorMiddleware);

app.listen(PORT, async () => {
  console.log(`Server is running: ${PORT}`);
  await connectToDatabase();
});
