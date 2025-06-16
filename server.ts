import express from "express";

import { PORT } from "./config/env.js";
import polls from "./routes/polls.routes.js";

const app = express();

app.use("/api/v1/polls", polls);

app.listen(PORT, () => console.log(`Server is running: ${PORT}`));
