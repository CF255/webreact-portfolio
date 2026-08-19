import mongoose from "mongoose";


const comentarioSchema = new mongoose.Schema({

   
    description:{
        type: String,
    },
    favorite:{
      type: Boolean,
       default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      } 
    },{
    timestamps:{
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

 noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  }) 


export default mongoose.model("Comentario", comentarioSchema)