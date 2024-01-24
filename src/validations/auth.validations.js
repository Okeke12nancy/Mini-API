// import { Validation } from "../index.js";
import { Validation } from "./index.validation.js";

export class AuthValidator extends Validation {
  constructor() {
    super();
  }

  loginValidationRule() {
    return {
      email: "required|string|email",
      password: "required|string",
    };
  }

  login() {
    return (req, res, next) => {
      const validationRules = this.loginValidationRule();
      this.validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
          this.sendError(res, err);
        } else {
          next();
        }
      });
    };
  }

  registerValidationRule() {
    return {
      firstName: "required|string",
      lastName: "required|string",
      userName: "required|string",
      email: "required|string|email",
      password: "required|string",
    };
  }

  register() {
    return (req, res, next) => {
      const validationRules = this.registerValidationRule();
      this.validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
          this.sendError(res, err);
        } else {
          next();
        }
      });
    };
  }
}

export default new AuthValidator();
