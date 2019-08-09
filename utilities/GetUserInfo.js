import connect from '../database/conn';

class GetUserInfo {
  static byPhone(req, res, next) {
    const { phone } = req.body
    connect.query(
      `SELECT id, userid FROM users WHERE phone= '${phone}'`,
      (err, response) => {
        if (err) {
          throw err.message;
        }
        const result = JSON.parse(JSON.stringify(response.rows));
        req.body.receiverId = result[0].userid;
        next();
        }
    );
  }
}

export default GetUserInfo;
