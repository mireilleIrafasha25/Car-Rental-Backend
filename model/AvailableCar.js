import mongoose from "mongoose";
import UserModel from "../model/UserModel.js";
const schema=mongoose.Schema

const carSchema = new schema({
    Description:{
        type: String,
        required: true
    },
    Price:{
        type: Number,
        required: true
    },
    Available:{
        type:String,
        required: true,
        default:"available"
    },
    name:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true
    },
    image: {
        url: {
            type: String
        }
    }
})

const CarModel=mongoose.model("Car",carSchema)

export default CarModel;