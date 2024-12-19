import carModel from "../model/AvailableCar.js"
import { NotFoundError, BadRequestError } from "../error/index.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";
import cloudinary from "../utils/cloudinary.js";
export const test = (req, res, next) => {
    res.send('Hello Car Owner!');
}

export const addAvailablecar = asyncWrapper(async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

          const {userId}=req.user || {};
          if(!userId)
          {
            return res.status(401).send({ error: 'Unauthorized' });
          }
        // Check if Cloudinary upload was successful
        if (!result || !result.url) {
            throw new Error('Failed to upload image to Cloudinary');
        }

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        }

        // Create new car
        const newCar = await carModel.create({
           Description:req.body.Description,
           Price:req.body.Price,
           Available:req.body.Available,
           name:req.body.name,
           type:req.body.type,
            image: {
                url: result.url
            },
            userId
        });

        res.status(201).json(newCar);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
export const getCarsByUser = asyncWrapper(async (req, res, next) => {
    
    const userCars = await carModel.find({userId:req.user.userId});

    if (!userCars || userCars.length === 0) 
        {
        return res.status(404).json({ message: "No cars found for this user" });
    }
    res.status(200).json({
        cars: userCars,
        message: 'Cars posted by the user retrieved successfully',
    });
});

export const GetAllCar=asyncWrapper(async(req,res,next)=>
{
    const Allcar=await carModel.find()
    res.status(200).json({
        Car:Allcar,
        message:'All Car are returned successfully'
    }
    )
})

export const getCarByName=asyncWrapper(async(req,res,next)=>
{
const {name,type,price}=req.query
const foundCar=await carModel.find({name:name,type:type,price:price})

res.status(200).json({
    Car:foundCar,
    message:'Car is returned successfully'
})
})

// export const getCarById=asyncWrapper(async(req,res,next)=>
// {
//     const {id}=req.params
//     const foundCar=await carModel.findById(id)
//     if(!foundCar)
//     {
//         return next(new NotFoundError('Car not found'))
//     }
//     res.status(200).json({
//         car:foundCar
//     })

// }
// )
export const UpdateCarbyId=asyncWrapper(async(req,res,next)=>
{
    const {id}=req.params
    const updatedCar=await carModel.findByIdAndUpdate(id,req.body,{new:true})
    if(!updatedCar)
    {
        return next(new NotFoundError('Car not found'))
    }
    res.status(200).json({
        car:updatedCar
    })
})
