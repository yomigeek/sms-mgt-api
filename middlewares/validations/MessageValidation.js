import Validator from "validatorjs";

class MessageValidation {

  static sendValidation(req, res, next) {
    const msgInfo = {
      phone: "required|digits:11",
      message: "required"
    };
    const validator = new Validator(req.body, msgInfo);
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

export default MessageValidation;
