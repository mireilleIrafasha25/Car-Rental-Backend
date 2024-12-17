import mongoose from "mongoose";
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
    image: {
        url: {
            type: String
        }
    }
})

const CarModel=mongoose.model("Car",carSchema)

export default CarModel;