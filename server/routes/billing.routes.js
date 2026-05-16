import express from "express";

import isAuth from "../middleware/isAuth.js";
import { billing } from "../controllers/billing.controller.js";

const BillingRouter = express.Router();

BillingRouter.post("/", isAuth,billing );

export default BillingRouter;
