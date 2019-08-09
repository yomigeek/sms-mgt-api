import Validator from "validatorjs";

class UserValidation {
  static signUpValidation(req, res, next) {
    const userInfo = {
      firstname: "required|alpha|min:2",
      lastname: "required|alpha|min:2",
      phone: "required|digits:11",
      password: "required|alpha_num|min:6|max:20"
    };

    const validator = new Validator(req.body, userInfo);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        errors
      });
    });
  }


  static loginValidation(req, res, next) {
    const loginInfo = {
      phone: "required|digits:11",
      password: "required"
    };
    const validator = new Validator(req.body, loginInfo);
    validator.passes(() => next());
    validator.fails(() => {
      const errors = validator.errors.all();
      return res.status(400).json({
        status: "error",
        statusCode: 400,
        errors
      });
    });
  }

}

export default UserValidation;
