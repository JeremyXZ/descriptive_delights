import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },

  password: {
    type: String,
    required: [true, "Password is required!"],
    minlength: [8, "Password should have a minimum length of 8 characters!"],
  },
});

const User = models.User || model("User", UserSchema);
//models object(provided by the mongoose library) stores all the registered models. If a model named "User" already exists
//in the models object, it assigns that existing model to the "User" variable, which
//prevents redefining the modle and ensures the existing model is reused.  If that modle doesn't exist, UserSchema is assigned
//to User variable

export default User;
