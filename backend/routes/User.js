const middleware = require('../middleware/authMiddleware');
const userController = require('../controllers/UserController');
const router = require('express').Router();

//get all users
router.get("/", userController.getAllUsers);

// get users
router.get("/:id",middleware.verifyToken, userController.getUser);

//delete user
router.delete("/:id", middleware.verifyAdmin ,userController.deleteUser);
//update user
router.put("/:id", middleware.verifyAdmin ,userController.updateUser);

module.exports = router;
