const expres = require('express')

const {getAllUsers,registerUser} = require('../controllers/userController');
const router = expres.Router();

router.post("/register",registerUser)
router.get("/allusers/:id",getAllUsers)

module.exports = router;