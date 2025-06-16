import express from "express";

import { PORT } from "./config/env.js";
import polls from "./routes/polls.routes.js";
import { connectToDatabase } from "./database/mongodb.js";

const app = express();

app.use("/api/v1/polls", polls);

app.listen(PORT, async () => {
  console.log(`Server is running: ${PORT}`);
  await connectToDatabase();
});
