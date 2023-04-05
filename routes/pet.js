import express, { request } from "express";
import prisma from "../db/index.js";

const router = express.Router(); //build a router to append to server

export default function petRouter() {

    // Get /pet router
    router.get("/", async (_request, response) => {
        const pets = await prisma.pet.findMany()

        //if (pets.length >= 1){
            response.status(200).json({
                success: true,
                pets
              })
          //  }
        //  else {
        //     response.status(200)({
        //         success: true,
        //         message: "no pets found"
        //       })
        //     }
         })


         //POST /pet
         router.post("/", async (request, response) => {
            try{
                const newPet = await prisma.pet.create({
                    data: {
                        name: request.body.name,
                        description: request.body.description,
                        specie: request.body.specie,
                        userId: 1
                    }
                });
                if(newPet){
                    response.status(201).json({
                        success: true,
                        message: "Find a new pet!"
                    })
                } else {
                    response.status(500).json({
                        succes: false,
                        message: "failed to find new pet!"
                    })
                }
            } catch(e){
                response.status(500).json({
                    success: false,
                    message: "failed to find new pet",
                  });
             }
         })

          //GET 1 by id /pet/123 
    router.get("/:petId", async (request, response)=>{
        const petId = request.params.petId;
      
        try {
          const foundPet = await prisma.pet.findFirstOrThrow({
            where: {
              id: parseInt(petId)
            }
          });
      
          response.status(200).json({
            success: true,
            pet: foundPet
          })
        } catch(e){
          response.status(404).json({
            success: false,
            message: "Could not find the pet!"
          })
        }
        
      })

      //EDIT /pet
      router.put("/:petId", async (request, response) =>{
          const petId = req.params.petId;
  
          try{
              const editPet = await prisma.pet.updateMany( {
                  where: {
                      id: parseInt(petId)
                  },
                  data: {
                      name: request.body.name,
                      description: request.body.description,
                      specie: request.body.specie
                  }
              })
              response.status(200).json({
                  success: true,
                  pet: editPet
                })
  
     
            }
          
          catch(e){
              response.status(404).json({
                success: false,
                message: "Could not edit"
              })
            }
  
      } )
  
      //DELETE /pet
      router.delete("/:petId", async (request, response) =>{
          const petId = request.params.petId;
  
          try{
              const deletePet = await prisma.pet.delete( {
                  where: {
                      id: parseInt(petId)
                  },
                  data: {
                      name: request.body.name,
                      description: request.body.description,
                      specie: request.body.specie
                  }
              })
              response.status(200).json({
                  success: true,
                  pet: deletePet
                })
  
     
            }
          
          catch(e){
              response.status(404).json({
                success: false,
                message: "Could not delete the pet!"
              })
            }
  
      } )

return router 
}