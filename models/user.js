import mongoose from "mongoose";

// Here creating User's Schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    work:{
        type: String,
        required: true
    },
    mobile:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    address:{
        type: String
    },
    salary:{
        type: Number,
        required: true
    }
});

// Here creating users Model

const User = mongoose.model("User", userSchema);

// Exporting the User
export default User;