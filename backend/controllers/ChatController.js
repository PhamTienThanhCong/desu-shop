const Chat = require('../models/ChatBot');

const ChatController = {
    createChat: async(req, res) => {
        //create chat
        try {
            const chat = await Chat.create(req.body);
            return res.status(200).json(chat);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    },
    getAllChats: async(req, res) => {
        //get all chats
        try {
            const chats = await Chat.find();
            const intents = {
                intents: chats
            }
            return res.status(200).json(intents);
        }
        catch(err) {
            return res.status(500).json(err);
        }
    }
}

module.exports = ChatController;