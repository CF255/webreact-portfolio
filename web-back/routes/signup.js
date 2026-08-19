import User from "../schema/user.js"
import  jsonResponse from "../lib/jsonResponse.js";
import { Router } from 'express'
import CardSlide from "../schema/cardslide.js";
const router = Router();


router.post("/", async function (req, res, next) {

  const { username, password, name } = req.body

  if (!username || !password || !name) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "username, password y name son requeridos",
      })
    );
  }

  if (password.length < 6) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "El password debe tener al menos 6 caracteres",
      })
    );
  }

  try {

    const user = new User();
    const userExists = await user.usernameExists(username);

    if (userExists) {
      return res.status(409).json(
        jsonResponse(409, {
          miss: "Nombre de usuario registrado",
        })
      );

    } else {
        const newUser = new User({
          username,
          password,
          name,
        })

        const capaslide = new CardSlide({
          cardslide: false,
          tictac:false,
          apipelis: false,
          giffy: false,
          messages: false,
          user: newUser._id
        });

        const saveslide = await capaslide.save();
        newUser.cardslide = newUser.cardslide.concat(saveslide._id);
        await newUser.save();

        return res.status(200).json(
          jsonResponse(200, {
            sucess: "Usuario creado",
          })
        );
    }
  } catch (err) {
    console.error(err)
    return res.status(500).json(
      jsonResponse(500, {
        error: "Error creando usuario",
      })
    );
  }
});

export default router
