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

  static userLogin(req, res) {
    const { password, phone } = req.body;
    const formattedPhone = phone.trim();
    connect.query(
      `SELECT userid, phone, password, role FROM users WHERE phone='${formattedPhone}'`,
      (err, response) => {
        const result = JSON.parse(JSON.stringify(response.rows));
        if (response.rows.length > 0) {
          const passwordIsValid = bcrypt.compareSync(
            password,
            result[0].password
          );
          const tokenData = {
            userId: result[0].userid,
            phone: result[0].phone,
            role: result[0].role,
            expiryTime: "4320h"
          };
          if (passwordIsValid) {
            return res.status(200).json({
              status: "success",
              statusCode: 200,
              message: "Login successful",
              token: TokenUtils.generateToken(tokenData),
            });
          }
          return AuthController.loginError(res);
        }
        return AuthController.loginError(res);
      }
    );
  }


  static delete(req, res) {
    const { phone } = req.params;
    connect.query(
      `
      DELETE FROM users WHERE phone = '${phone}'`,
      (err, response) => {
        if (err) {
          throw err.message;
        }
        return res.status(200).json({
          status: "success",
          statusCode: 200,
          message: "contact deleted successfully",
        });
      }
    );
  }


  static loginError(res) {
    return res.status(401).json({
      status: "error",
      statusCode: 401,
      message: "Invalid Phone Number or Password"
    });
  }


}

export default AuthController;
