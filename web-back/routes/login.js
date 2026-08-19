import User from "../schema/user.js"
import jsonResponse from "../lib/jsonResponse.js";
import getUserInfo from "../lib/getUserInfo.js";
import { Router } from 'express'
import jwt from "jsonwebtoken"

const router = Router();

router.post("/", async function (req, res, next) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json(
      jsonResponse(400, {
        error: "username y password son requeridos",
      })
    );
  }

  try {
    let user = new User();
    const userExists = await user.usernameExists(username);

    if (userExists) {
      user = await User.findOne({ username: username });

      const passwordCorrect = await user.isCorrectPassword(
        password,
        user.password
      );

      if (passwordCorrect) {
        const accessToken = user.createAccessToken();
        const refreshToken = await user.createRefreshToken();

        return res.json(
          jsonResponse(200, {
            accessToken,
            refreshToken,
            user: getUserInfo(user),
            
          })
        );
      } else {

        return res.status(401).json(
          jsonResponse(401, {
            error: "username and/or password incorrect",
          })
        );
      }
    } else {
      return res.status(401).json(
        jsonResponse(401, {
          miss: "username does not exist",
        })
      );
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(
      jsonResponse(500, {
        error: "Ocurrió un problema al iniciar sesión",
      })
    );
  }
});

export default router