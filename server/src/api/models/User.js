const bcrypt = require("bcrypt")

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name : { type:String , required: true },
    email: { type:String , required: true },
    password: { type:String , required: true },
    avatar: { type:String },
},{
    timestamps: true
})

userSchema.pre("save", async function(next) {
  const saltRounds = 10
  this.password = await bcrypt.hash(this.password, saltRounds)
  next()
})

const User = mongoose.model("User", userSchema)

module.exports = User

