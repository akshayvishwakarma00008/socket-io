const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        isAvatarImage: { type: Boolean, default: false },
        avatarImage: { type: String, default: "" }
    }
)

const User = mongoose.model("Users", userSchema)

module.exports = User;