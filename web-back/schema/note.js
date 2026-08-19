import mongoose from "mongoose";


const noteSchema = new mongoose.Schema({

    title:{
        type:String,
    },
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


export default mongoose.model("Note", noteSchema)