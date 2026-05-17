import express from "express";
import cors from "cors";

import contactRoutes from "./routes/contacts.routes.js";
import userRoutes from "./routes/users.routes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://app-mi-agenda.vercel.app"
  ]
}));
app.use(express.json());

app.get("/health", (_req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/contacts", contactRoutes);
app.use("/auth", userRoutes);
app.use("/users", userRoutes);

app.use(errorMiddleware);

export default app;
