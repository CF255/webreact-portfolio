import bcrypt from "bcrypt"
import jsonResponse from "../lib/jsonResponse.js";
import log from "../lib/Trace.js";
import User from "../schema/user.js";
import getTokenFromHeader from "../auth/getTokenFromHeader.js";
import { Router } from 'express'


const router = Router();
  

router.get("/",  (req, res, )=> {
  
  log.info("user", req.user);

  res.json(jsonResponse(200, req.user));

}); 

router.get("/users", async (req, res, )=> {
  
  try {
    const users =  await User.find({}).populate('notes', {
      title: 1,
      description: 1,
      favorite: 1
    })
    
     res.status(200).json({users}) 


} catch (error) {
    console.log(error)
    res.status(500).send(error)
}


}); 

router.get("/users/info", async (req, res, )=> {
 
 

  try {
    const users =  await User.find({}).populate('notes', {
      title: 1,
      description: 1,
      favorite: 1
    })
    res.json(users) 
   
} catch (error) {
    console.log(error)
    res.status(500).send(error)
}

}); 

router.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  
  response.json(user.toJSON())
})


router.put("/:id/:newname/:newusername/:newpassword", async function(req, res, next ) {
  
  
  const{username, password, name} = req.body   
  try {
  
  
    const user = new User();
    const userExists = await user.usernameExists(username);
  
    if (userExists) {
      
      console.log('llega')
      return res.status(409).json(
        jsonResponse(409, {
          miss: "username already exists",
        }))

    }else{
      const refreshToken = getTokenFromHeader(req.headers)

      if(refreshToken){

      

        const id = req.params.id
    const newname = req.params.newname
    const newusername = req.params.newusername
    let newpassword = req.params.newpassword

      
            bcrypt.hash(newpassword, 10, (err, hash) => {
              if (err) {
                next(err);
              } else {
                newpassword = hash;
              
                User.findByIdAndUpdate({_id: id}, {$set: {name: newname, username: newusername , password: newpassword }})
                .then(doc =>{})
                next();
              }
             
            });
        } 
     
    }
  
   
  } catch (error) {
    console.log(error)
    res.status(400).json({response: 'fail'})
  
  }
  
  });


router.delete("/delete/:id", async (req, res, )=> {

  try {
    const refreshToken = getTokenFromHeader(req.headers)
    const id = req.params.id

    if(refreshToken){
      User.findByIdAndDelete({_id: id})
.then(doc =>{
  res.json({response: 'success'})
})
      }

} catch (error) {
    console.log(error)
  
}


})

export default router