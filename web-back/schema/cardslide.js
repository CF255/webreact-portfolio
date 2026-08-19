import mongoose from "mongoose";


const cardslideSchema = new mongoose.Schema({

    cardslide:{
        type: Boolean,
        default: false
    },
    tictac:{
        type: Boolean,
        default: false
    },
    apipelis:{
      type: Boolean,
       default: false
    },
    giffy:{
      type: Boolean,
       default: false
    },
    messages:{
      type: Boolean,
       default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      } 
    })

    cardslideSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
  }) 


export default mongoose.model("CardSlide", cardslideSchema)