import express from "express";
import { createTripPlan } from "../Controllers/tripController.js";

const tripRouter = express.Router();
tripRouter.route("/").post(createTripPlan)

export { tripRouter };