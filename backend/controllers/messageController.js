import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import User from "../models/User.js";

const sendMessage = async (req, res) => {
   const { content, chatId } = req.body

   if(!content || !chatId) {
      console.log('Invalid data passed into request');
      return res.sendMessage(400)
   }

   var newMessage = {
      sender: req.user._id,
      content: content,
      chat: chatId,
   }

   try {
      var message = await Message.create(newMessage);

      message = await message.populate('sender', 'name picture')
      message = await message.populate('chat')
      message = await User.populate(message, {
         path: 'chat.users',
         select: 'name picture email',
      });

      await Chat.findByIdAndUpdate(req.body.chatId, {
         latestMessage: message,
      })

      res.json(message)
   } catch (error) {
      console.log(error);
      throw new Error(error.message)
   }
}


const allMessages = async (req, res) => {
   try {
      const messages = await Message.find({chat: req.params.chatId})
         .populate("sender", "name picture email")
         .populate("chat")

         res.json(messages)

   } catch (error) {
      throw new Error(error.message)
   }
}

export {sendMessage, allMessages}