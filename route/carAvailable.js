import express from "express"
import {addAvailablecar} from "../controller/car.js"
import upload from "../middleware/multer.js"

const carroute=express.Router();
carroute.post("/add",upload.single('image'),addAvailablecar);

export default carroute;