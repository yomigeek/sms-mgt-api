import connect from '../database/conn';

class MessageController {
  
  static async send(req, res){
    const { message, receiverId } = req.body;
    const formattedMessage = message.trim();
    const senderId = req.decoded.userId;
    const randomId = Math.floor(Math.random() * 100000000000);
    const messageId = randomId + Date.now();

    connect.query(
      `${"insert into messages (messageid, message, status, senderid, receiverid) " +
        "values ('"}${messageId}', '${formattedMessage}' , 'sent', '${senderId}','${receiverId}')`,
      (err, response) => {
        if (err) {
          throw err.message;
        }
        return res.status(201).json({
          status: "success",
          statusCode: 201,
          message: "message sent successfully",
        });
      }
    );
  }
}

export default MessageController;
