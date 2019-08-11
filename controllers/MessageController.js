import connect from '../database/conn';

class MessageController {

  static send(req, res) {
    const { message, receiverId } = req.body;
    const formattedMessage = message.trim();
    const senderId = req.decoded.userId;
    const randomId = Math.floor(Math.random() * 100000000000);
    const messageId = randomId + Date.now();

    connect.query(
      `${"insert into messages (messageid, message, status, senderid, receiverid) " +
      "values ('"}${messageId}', '${formattedMessage}' , 'received', '${senderId}','${receiverId}')`,
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

  static inbox(req, res) {
    const userId = req.decoded.userId;
    connect.query(
      `SELECT messageid, message, status, users.firstname, users.lastname, users.phone 
      FROM messages
      INNER JOIN users ON messages.senderid = users.userid
      WHERE receiverid = '${userId}'`,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length > 0) {
          return res.status(200).json({
            status: "success",
            statusCode: 200,
            messages: result,
          });
        }
        else {
          return res.status(404).json({
            status: "not found",
            statusCode: 404,
            message: "You have no message(s) in your inbox",
          });
        }
      }
    );
  }
}

export default MessageController;
