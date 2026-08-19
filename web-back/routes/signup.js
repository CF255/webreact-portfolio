import User from "../schema/user.js"
import  jsonResponse from "../lib/jsonResponse.js";
import { Router } from 'express'
import {upload} from "../config/multer.js";
import { uploadFile } from "../util/uploadFile.js";
import CardSlide from "../schema/cardslide.js";
const router = Router();




router.post("/", upload.fields([{name: 'image', maxCount: 1}]),async function (req, res, next) {
  
  
 const{username, password, name} = req.body   
  const image = req.files.image
  const  body = req.body;

  try {

    const user = new User();
    const userExists = await user.usernameExists(username);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          miss: "Nombre de usuario registrado",
        })
      );
      
    } else if(image && image.length > 0){
        const {downloadURL} = await uploadFile(image[0])
    
        const user = await new User({
          username: body.username,
          password: body.password,
          name: body.name,
          image: downloadURL
        })

        const capaslide = new CardSlide({
          cardslide: false,
          tictac:false,
          apipelis: false,
          giffy: false,
          messages: false,
          user: user._id
        });

        try {
          const saveslide = await capaslide.save();
        user.cardslide = user.cardslide.concat(saveslide._id);
        await user.save();
  
        } catch (error) {
          console.error(error)
        }
        
        user.save() 
    
        return res.status(200).json(
          jsonResponse(200, {
            sucess: "Usuario creado",
          })
        );

      
    }
  } catch (err) {
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando usuario",
      })
    );
  }
});

export default router
