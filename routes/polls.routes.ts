import { Router } from "express";

const pollRouter = Router();

pollRouter.get("/", (req, res) => {
  res.status(200).json({ msg: "Polls" });
});

export default pollRouter;
