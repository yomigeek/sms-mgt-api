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
            message: "User already exist! Kindly check the phone number"
          });
        }
        next();
      }
    );
  }

}

export default CheckConflicts;
