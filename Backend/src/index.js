import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./Utils/db.js";
import { router } from "./Routes/userRoutes.js";
import { propertyRouter } from "./Routes/propertyRouter.js";
import { bookingRouter } from "./Routes/bookingRouter.js";
import { tripRouter } from "./Routes/tripRouter.js";

dotenv.config();

const app = express();

// express.json
app.use(express.json({ limit: "100mb" }))

// urlencoded
app.use(express.urlencoded({ limit: "100mb", extended: true }))

// cookieParser
app.use(cookieParser())

app.use(cors({
    origin: process.env.ORIGIN_ACCESS_URL,
    credentials: true
}))

const port = process.env.PORT;

// Test Route
app.get("/", (req, res) => {
    res.send("HomelyHub Server is running")
})

app.use("/api/v1/rent/user", router)
app.use("/api/v1/rent/listing", propertyRouter)
app.use("/api/v1/rent/user/booking", bookingRouter)
app.use("/api/v1/rent/trip", tripRouter)

connectDB();

app.listen(port, () => {
    console.log(`App is running on port no: ${port}`);
})