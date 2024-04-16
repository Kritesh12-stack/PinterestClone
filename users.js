const mongoose = require('mongoose')
const plm = require('passport-local-mongoose')

mongoose.connect("mongodb+srv://kriteshshri:kriteshshri@cluster0.m7hih09.mongodb.net/pinDB")

const userSchema =new mongoose.Schema({
    username : String,
    name : String,
    email : String,
    password : String,
    profileImage : String,
    contact : Number,
    boards : {
        type : Array,
        default : []
    }
})

userSchema.plugin(plm)

module.exports = mongoose.model("users",userSchema)