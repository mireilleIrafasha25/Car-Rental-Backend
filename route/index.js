
import userRoute from "./userRoute.js";

import express from "express";

const route = express.Router();

route.use("/user", userRoute);

export default route;