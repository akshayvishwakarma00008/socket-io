const MessageModel = require('../model/messageModal')

const getMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        console.log("request.body",req.body);
        const messages = await MessageModel.find({
            users: {
                $all: [from, to]
            }
        }).sort({ updatedAt: 1 })

        const projectedMessage = messages.map((message)=>{
            return {
                isSent : message.sender.toString() === from,
                message: message.message.text,
                createdAt:message.createdAt
            }
        })

        res.json(projectedMessage)
    } catch (error) {
        console.log(`[+] error occured ${error}`);
        next(error)
    }
}

const addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const newMessage = await MessageModel.create({
            message: { text: message },
            users: [from, to],
            sender: from,
        })

        if (newMessage) {
            return res.json({
                status: true,
                message: "[+] Message added successfully"
            })
        } else {
            return res.json({
                status: false,
                message: "[+] Failed to add message in DB"
            })
        }
    } catch (error) {
        console.log('error: ', error);
        next(error);
    }
}
module.exports = { getMessages,addMessage };