import connect from '../database/conn';

class CheckConflicts {

  static existingUser(req, res, next) {
    const { phone } = req.body;
    connect.query(
      `SELECT id, phone FROM users WHERE phone= '${phone}'`,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length > 0) {
          return res.status(409).json({
            status: "error",
            statusCode: 409,
            message: "Contact already exist! Kindly check the phone number entered"
          });
        }
        next();
      }
    );
  }

  static checkReceiver(req, res, next) {
    const { phone } = req.body;
    
    connect.query(
      `SELECT id FROM users WHERE phone= '${phone}'`,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length < 1) {
          return res.status(404).json({
            status: "error",
            statusCode: 404,
            errors: "Message not sent! This contact doesn't exist"
          });
        }
        next();
      }
    );
  }

  static checkUser(req, res, next) {
    const { userId } = req.decoded;
    
    connect.query(
      `SELECT id FROM users WHERE userid = '${userId}'`,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length < 1) {
          return res.status(404).json({
            status: "error",
            statusCode: 404,
            errors: "This contact doesn't exist or has been deactivated"
          });
        }
        next();
      }
    );
  }

  static checkUserByPhone(req, res, next) {
    const { phone } = req.params;
    
    connect.query(
      `SELECT id, phone FROM users WHERE phone = '${phone}'`,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (result.length < 1) {
          return res.status(404).json({
            status: "error",
            statusCode: 404,
            errors: "This contact doesn't exist or has been deactivated"
          });
        }
        next();
      }
    );
  }

}

export default CheckConflicts;
