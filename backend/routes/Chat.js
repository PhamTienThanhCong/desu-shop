const chatController = require('../controllers/ChatController');
const router = require('express').Router();

// create chat
router.post("/create", chatController.createChat);

//get all chat
router.get("/", chatController.getAllChats);

// // get users
// router.get("/:id", chatController.getUser);

// //delete user
// router.delete("/:id" ,chatController.deleteUser);

// //update user
// router.put("/:id" ,chatController.updateUser);

module.exports = router;
