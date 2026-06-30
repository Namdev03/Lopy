import Conversation from "../Model/Conversation.model.js";
import Message from "../Model/Message.model.js";
export const sendMessage = async (req, res) => {
    try {
        const userId = req.user._id;
        const receiverId = req.params.id;
        const { message } = req.body;
        console.log("BODY:", req.body);
        console.log("MESSAGE:", req.body?.message);
        console.log(req.body?.message);

        if (!message?.trim()) {
            return res.status(400).json({
                message: "Message is required",
                status: false
            });
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [userId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [userId, receiverId]
            });
        }

        const newMessage = await Message.create({
            sender: userId,
            receiver: receiverId,
            message
        });

        conversation.messages.push(newMessage._id);

        await conversation.save();

        return res.status(201).json({
            message: "Message sent successfully",
            newMessage,
            status: true
        });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
};
export const getmessage = async (req, res) => {
  try {
    const userId = req.user._id;
    const receiverId = req.params.id;

    const conversation = await Conversation.findOne({
      participants: { $all: [userId, receiverId] },
    }).populate({
      path: "messages",
      select: "senderId receiverId message createdAt",
      options: {
        sort: { createdAt: 1 }, // oldest first
      },
    });

    if (!conversation) {
      return res.status(200).json({
        messages: [],
      });
    }

    return res.status(200).json({
      messages: conversation.messages,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};