
import userRoute from "./userRoute.js";

import express from "express";
import carroute from "./carAvailable.js"
const route = express.Router();

route.use("/user", userRoute);
route.use("/carAvailable",carroute);
export default route;