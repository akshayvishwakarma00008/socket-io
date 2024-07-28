const express = require('express')
const { getMessages,addMessage } = require('../controllers/messageController')

const router = express.Router()
router.post("/getmsg/", getMessages);    
router.post("/add-msg/", addMessage);    

module.exports = router