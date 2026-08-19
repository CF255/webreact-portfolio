import bcrypt from "bcrypt"
import jsonResponse from "../lib/jsonResponse.js";
import log from "../lib/Trace.js";
import User from "../schema/user.js";
import getTokenFromHeader from "../auth/getTokenFromHeader.js";
import { Router } from 'express'
import CardSlide from "../schema/cardslide.js";


const router = Router();


router.get("/capacardslide", async (req, res, )=> {

  try {
    const users =  await User.find({}).populate('cardslide', {
      cardslide: 1,
      tictac:1,
      apipelis: 1,
      giffy: 1,
      messages: 1

    })
    
     res.status(200).json({users}) 


} catch (error) {
    console.log(error)
    res.status(500).send(error)
}


}); 

router.get("/users/infocapaslider", async (req, res, )=> {
 

  try {
    const users =  await User.find({}).populate('cardslide', {
        cardslide: 1,
        tictac:1,
        apipelis: 1,
        giffy: 1,
        messages: 1
    })
    res.json(users) 
   
} catch (error) {
    console.log(error)
    res.status(500).send(error)
}

}); 


 router.put('/capslideoptions/:id', async(req, res)=>{
    try {
        
        const options = await CardSlide.findById(req.params.id)
        console.log(req.params.id)
  
        const option = await CardSlide.findOneAndUpdate(
          {_id: req.params.id},
          {cardslide: !options.cardslide}
        )
  
        await option.save()
    
        return res.status(200).json(
            jsonResponse(200, {
                sucess: "correcto",
            })
          );
  
    } catch (error) {
        console.log(error)
       return res.status(500).json(
            jsonResponse(500, {
              error: "Ocurrio un problema",
            })
          );
    }
  })  




router.put('/tictacoptions/:id', async(req, res)=>{
  try {
      
      const options = await CardSlide.findById(req.params.id)
      console.log(req.params.id)

      const option = await CardSlide.findOneAndUpdate(
        {_id: req.params.id},
        {tictac: !options.tictac}
      )

      await option.save()
  
      return res.status(200).json(
          jsonResponse(200, {
              sucess: "correcto",
          })
        );

  } catch (error) {
      console.log(error)
     return res.status(500).json(
          jsonResponse(500, {
            error: "Ocurrio un problema",
          })
        );
  }
})  



router.put('/apipelisoptions/:id', async(req, res)=>{
  try {
      
      const options = await CardSlide.findById(req.params.id)
      console.log(req.params.id)

      const option = await CardSlide.findOneAndUpdate(
        {_id: req.params.id},
        {apipelis: !options.apipelis}
      )

      await option.save()
  
      return res.status(200).json(
          jsonResponse(200, {
              sucess: "correcto",
          })
        );

  } catch (error) {
      console.log(error)
     return res.status(500).json(
          jsonResponse(500, {
            error: "Ocurrio un problema",
          })
        );
  }
})  



router.put('/giffyoptions/:id', async(req, res)=>{
  try {
      
      const options = await CardSlide.findById(req.params.id)
      console.log(req.params.id)

      const option = await CardSlide.findOneAndUpdate(
        {_id: req.params.id},
        {giffy: !options.giffy}
      )

      await option.save()
  
      return res.status(200).json(
          jsonResponse(200, {
              sucess: "correcto",
          })
        );

  } catch (error) {
      console.log(error)
     return res.status(500).json(
          jsonResponse(500, {
            error: "Ocurrio un problema",
          })
        );
  }
})  


router.put('/messagesoptions/:id', async(req, res)=>{
  try {
      
      const options = await CardSlide.findById(req.params.id)
      console.log(req.params.id)

      const option = await CardSlide.findOneAndUpdate(
        {_id: req.params.id},
        {messages: !options.messages}
      )

      await option.save()
  
      return res.status(200).json(
          jsonResponse(200, {
              sucess: "correcto",
          })
        );

  } catch (error) {
      console.log(error)
     return res.status(500).json(
          jsonResponse(500, {
            error: "Ocurrio un problema",
          })
        );
  }
})  

export default router