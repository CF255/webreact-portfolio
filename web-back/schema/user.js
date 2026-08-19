import bcrypt from "bcrypt"
import mongoose from "mongoose";
import { generateAccessToken, generateRefreshToken } from "../auth/generateTokens.js";
import Token from "../schema/token.js"
import getUserInfo from "../lib/getUserInfo.js";

/* hola */

const UserSchema = new mongoose.Schema({
  id: { type: Object },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Note'
    }
  ],
  cardslide: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CardSlide'
    }
  ]
}, 
{
  timestamps: true
});

  UserSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
})


UserSchema.pre("save", function (next) {
  if (this.isModified("password") || this.isNew) {
    const document = this;

    bcrypt.hash(document.password, 10, (err, hash) => {
      if (err) {
        next(err);
      } else {
        document.password = hash;
        next();
      }
    });
  } else {
    next();
  }
});

UserSchema.methods.usernameExists = async function (username, excludeId) {
  const query = { username: username };
  if (excludeId) {
    query._id = { $ne: excludeId };
  }
  const result = await mongoose.model("User").find(query);
  return result.length > 0;
};

UserSchema.methods.idExists = async function (id) {
  const result = await mongoose.model("User").find({_id: id });
  return result.length > 0;
};

UserSchema.methods.isCorrectPassword = async function (password, hash) {
  const same = await bcrypt.compare(password, hash);

  return same;
};

UserSchema.methods.createAccessToken = function () {
  return generateAccessToken(getUserInfo(this));
};

UserSchema.methods.createRefreshToken = async function (next) {
  const refreshToken = generateRefreshToken(getUserInfo(this));

  try {
    await new Token({ token: refreshToken }).save();
    return refreshToken;
  } catch (error) {
    console.error(error);
  }
};

export default mongoose.model("User", UserSchema)
