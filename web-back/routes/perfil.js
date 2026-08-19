import jsonResponse from "../lib/jsonResponse.js";
import log from "../lib/Trace.js";
import User from "../schema/user.js";
import { Router } from 'express'


const router = Router();
  

router.get("/",  (req, res, )=> {
  
  log.info("user", req.user);

  res.json(jsonResponse(200, req.user));

}); 

router.get("/users", async (req, res, )=> {

  try {
    const users =  await User.find({}).select('-password').populate('notes', {
      title: 1,
      description: 1,
      favorite: 1
    })

     res.status(200).json({users})


} catch (error) {
    console.error(error)
    res.status(500).json(jsonResponse(500, { error: "Ocurrió un problema" }))
}


});

router.get("/users/info", async (req, res, )=> {



  try {
    const users =  await User.find({}).select('-password').populate('notes', {
      title: 1,
      description: 1,
      favorite: 1
    })
    res.json(users)

} catch (error) {
    console.error(error)
    res.status(500).json(jsonResponse(500, { error: "Ocurrió un problema" }))
}

});

router.get('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id).select('-password')

    if (!user) {
      return response.status(404).json(jsonResponse(404, { error: "Usuario no encontrado" }))
    }

    response.json(user.toJSON())
  } catch (error) {
    console.error(error)
    response.status(500).json(jsonResponse(500, { error: "Ocurrió un problema" }))
  }
})


router.put("/:id", async function(req, res) {

  const { username, password, name } = req.body
  const id = req.params.id

  if (req.user.id !== id) {
    return res.status(403).json(
      jsonResponse(403, {
        error: "No puedes editar el perfil de otro usuario",
      })
    )
  }

  if (!username || !password || !name) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "username, password y name son requeridos",
      })
    )
  }

  try {
    const userProbe = new User();
    const userExists = await userProbe.usernameExists(username, id);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          miss: "username already exists",
        })
      )
    }

    const user = await User.findById(id)

    if (!user) {
      return res.status(404).json(jsonResponse(404, { error: "Usuario no encontrado" }))
    }

    user.name = name
    user.username = username
    user.password = password
    await user.save()

    return res.status(200).json(
      jsonResponse(200, {
        sucess: "Perfil actualizado",
      })
    )
  } catch (error) {
    console.error(error)
    return res.status(500).json(jsonResponse(500, { error: "Ocurrió un problema" }))
  }

});


router.delete("/delete/:id", async (req, res, )=> {

  const id = req.params.id

  if (req.user.id !== id) {
    return res.status(403).json(
      jsonResponse(403, {
        error: "No puedes eliminar la cuenta de otro usuario",
      })
    )
  }

  try {
    await User.findByIdAndDelete(id)
    return res.json({ response: 'success' })
  } catch (error) {
    console.error(error)
    return res.status(500).json(jsonResponse(500, { error: "Ocurrió un problema" }))
  }

})

export default router