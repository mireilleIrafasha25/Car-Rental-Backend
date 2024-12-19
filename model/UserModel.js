import mongoose from "mongoose";
const schema=mongoose.Schema

const userSchema = new schema({
    Name:
    {
        type: String,
        required: true
    },
        Email:{
            type: String,
            required: true,
            unique: true
        },
        Password:{
            type: String,
            required: true
        },
        Address:{
            type: String,
            required: true
        },
        PhoneNumber:{
            type: String,
            required: true,
        },
        Role:{
            type: String,
            required: true,
            enum:
                {
                    values:["admin","customer","manager"],
                    message:"Role must be admin or customer or manager"
                }
            ,
            default:"customer"
        },
        CreatedAt:{
            type: Date,
            default: Date.now
        },
        LastUpdated:{
            type: Date,
            default: Date.now
        },
        otp:{
            type:Number,
            required:true
        },
        otpExpires:{
            type:Date,
            required:false
        },
        verified:{
            type:Boolean,
            required:true,
            default:true
        }

})

const UserModel=mongoose.model("User",userSchema)
export default UserModel;