const expres = require('express')

const {getAllUsers,registerUser,getCurrentUserDetails} = require('../controllers/userController');
const router = expres.Router();

router.post("/register",registerUser)
router.get("/allusers/:id",getAllUsers)
router.get("/currentUserDetails/:id",getCurrentUserDetails)

module.exports = router;