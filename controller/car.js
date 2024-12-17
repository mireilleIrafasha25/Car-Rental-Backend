import carModel from "../model/AvailableCar.js"
import { NotFoundError, BadRequestError } from "../error/index.js";
import { validationResult } from "express-validator";
import asyncWrapper from "../middleware/async.js";
import cloudinary from "../utils/cloudinary.js";

export const test = (req, res, next) => {
    res.send('Hello Brides!');
}

export const addAvailablecar = asyncWrapper(async (req, res, next) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        // Check if Cloudinary upload was successful
        if (!result || !result.url) {
            throw new Error('Failed to upload image to Cloudinary');
        }

        // Validate request body
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            throw new BadRequestError(errors.array()[0].msg);
        }

        // Create new service
        const newService = await carModel.create({
           Description:req.body.Description,
           Price:req.body.Price,
           Available:req.body.Available,
           name:req.body.name,
            image: {
                url: result.url
            },
        });

        res.status(201).json(newService);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

    export const getAllServices =  async (req, res, next) => {
        try{
            const getServices = await serviceModel.find();
            if(getServices){
                return res.status(200).json({
                    size: getServices.length,
                    getServices
                })
            }
            
        }catch (error){
            next(error);  
        }
    }

    export const getServiceById = async (req, res, next) => {
        try{
            const foundedService = await serviceModel.findById(req.params.id)
            if (!foundedService) {
                return next(new NotFoundError(`Service not found`))
            }
            
              return  res.status(200).json(foundedService)
            }
        catch (error) {
            next(error);
            
          }
    }

    export const findServiceCategory = async (req, res, next) => {
        const serviceCategory = req.params.category;
        
        try {
            const foundService = await serviceModel.find({category: serviceCategory});
            return res.status(200).json({
                size: foundService.length,
                foundService
            });
        } catch (error) {
            next(error);
        }
    }
      export const updateService = async(req, res, next) => {
        try {
            const updatedService = await serviceModel.findByIdAndUpdate(req.params.id, req.body,{new:true});
               if(!updatedService) {
                return next(new NotFoundError(`Service not found`));
               }
               return  res.status(200).json(updatedService)
            }
        catch (error) {
            next(error);
        }

    }
  
    export const deleteService = async(req, res, next) => {
        const id =req.params.id;
           
        try {
            const deletedService = await serviceModel.findByIdAndDelete(id);
              return  res.status(200).json({ message : 'Service is deleted'})
            }
            
         catch (error) {
            next(error)
        }

    }
