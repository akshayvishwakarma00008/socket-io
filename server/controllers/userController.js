const User = require('../model/userModel.js')

const registerUser = async (req, res, next) => {
    try {
        const { username, isAvatarImage, avatarImage } = req.body
        const user = await User.findOne({ username })
        if (user) {
            return res.status(400).json({ message: "User already exists" })
        }
        const newUser = await User.create({
            username,
            isAvatarImage,
            avatarImage
        });

        console.log("[+] User Registered Succesfully");
        return res.status(200).json({ message: "User Registered Succesfully", newUser, status: true })

    } catch (err) {
        console.log(err)
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "username",
            "isAvatarImage",
            "avatarImage",
            "_id"
        ])
        return res.json(users)

    } catch (error) {
        console.log(error)
    }
}

const getCurrentUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        return res.json(user)

    } catch (error) {
        console.log("error", error);
    }
}

module.exports = { registerUser, getAllUsers,getCurrentUserDetails }