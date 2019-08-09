import bcrypt from 'bcryptjs';
import connect from '../database/conn';
import TokenUtils from '../utilities/TokenUtils';
import dotenv from 'dotenv';

dotenv.config();

class AuthController {
  static userSignUp(req, res) {
    const { firstname, lastname, phone, password } = req.body;
    const formattedFirstName = firstname.trim().toLowerCase();
    const formattedLastName = lastname.trim().toLowerCase();

    const hashedPassword = bcrypt.hashSync(password.trim(), 10);
    const randomId = Math.floor(Math.random() * 100000000000);
    const userId = randomId + Date.now();

    connect.query(
      `${"insert into users (firstname, lastname, userId, phone, password, role) " +
        "values ('"}${formattedFirstName}', '${formattedLastName}' , '${userId}','${phone}','${hashedPassword}','user')`,
      (err, response) => {
        if (err) {
          throw err.message;
        }
        const tokenData = {
          userId,
          expiryTime: "4320h"
        };
        return res.status(201).json({
          status: "success",
          statusCode: 201,
          message: "account created successfully",
          token: TokenUtils.generateToken(tokenData)
        });
      }
    );
  }
}

export default AuthController;
