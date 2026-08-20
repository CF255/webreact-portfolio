
import { Router } from 'express'
import Note from "../schema/note.js";
import User from "../schema/user.js";
import jsonResponse from '../lib/jsonResponse.js';
import isOwner from '../lib/isOwner.js';


const router = Router();

router.get("/", async  (req, res, )=> {

    try {
        const notes =  await Note.find({}).populate('user', {
            name: 1,
            username: 1,
        })
          res.json(notes)

    } catch (error) {
        console.error(error)
        res.status(500).json(jsonResponse(500, { error: "Ocurrio un problema" }))
    }

});


 
router.post('/' ,async (req, res) =>{

    const {title, description} = req.body
    const user = await User.findById(req.user.id)

    const note = new Note({
        title,
        description,
        favorite: false,
        user: user._id
      });

  

      try {
        const saveNote = await note.save();
      user.notes = user.notes.concat(saveNote._id);
      await user.save();

      res.json(saveNote)
      } catch (error) {
        console.error(error)
        res.status(500).json(jsonResponse(500, { error: "Ocurrio un problema" }))
      }

 })


router.get('/:id', async(req, res)=>{
    try {
       const note = await Note.findById(req.params.id)
       res.send(note)
    } catch (error) {
       console.error(error)
       res.status(500).json(jsonResponse(500, { error: "Ocurrio un problema" }))
    }
})


router.put('/:id', async(req, res)=>{
    try {
        const note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).json(jsonResponse(404, { error: "Nota no encontrada" }))
        }

        if (!isOwner(note.user, req.user.id)) {
            return res.status(403).json(jsonResponse(403, { error: "No puedes editar la nota de otro usuario" }))
        }

        await Note.findByIdAndUpdate(req.params.id, req.body, {new:true})

        return res.status(200).json(
            jsonResponse(200, {
                sucess: "Nota editada",
            })
          );

    } catch (error) {
        console.error(error)
       return res.status(500).json(
            jsonResponse(500, {
              error: "Ocurrio un problema",
            })
          );
    }
})


router.put('/fav/:id', async(req, res)=>{
  try {

      const favRef = await Note.findById(req.params.id)

      if (!favRef) {
          return res.status(404).json(jsonResponse(404, { error: "Nota no encontrada" }))
      }

      if (!isOwner(favRef.user, req.user.id)) {
          return res.status(403).json(jsonResponse(403, { error: "No puedes editar la nota de otro usuario" }))
      }

      const note = await Note.findOneAndUpdate(
        {_id: req.params.id},
        {favorite: !favRef.favorite}
      )

      await note.save()

      return res.status(200).json(
          jsonResponse(200, {
              sucess: "Nota favorita",
          })
        );

  } catch (error) {
      console.error(error)
     return res.status(500).json(
          jsonResponse(500, {
            error: "Ocurrio un problema",
          })
        );
  }
})



router.delete('/:id', async(req, res)=>{
    try {
        const note = await Note.findById(req.params.id)

        if (!note) {
            return res.status(404).json(jsonResponse(404, { error: "Nota no encontrada" }))
        }

        if (!isOwner(note.user, req.user.id)) {
            return res.status(403).json(jsonResponse(403, { error: "No puedes borrar la nota de otro usuario" }))
        }

        await Note.findByIdAndDelete(req.params.id)

        return res.status(200).json(
            jsonResponse(200, {
                sucess: "Nota Borrada",
            })
          );

    } catch (error) {
        console.error(error)
        return res.status(500).json(
            jsonResponse(500, {
              error: "Ocurrio un problema",
            })
          );
    }
})



export default router
