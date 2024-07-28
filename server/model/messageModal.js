const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        message: {
            text: {
                type: String,
                required: true
            },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            require: true
        }

    },
    { timestamps: true }
)

const MessageModel = mongoose.model("Messages",messageSchema)

module.exports = MessageModel;