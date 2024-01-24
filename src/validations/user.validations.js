import { Validation } from "./index.validation.js";

export class UserValidator extends Validation {
  constructor() {
    super();
  }

  createUserValidationRule() {
    return {
      first_name: "required|string",
      last_name: "required|string",
      email: "required|string|email",
      phone: "required|string",
      password: "required|string",
    };
  }

  updateUserValidationRule() {
    return {
      firstName: "string",
      lastName: "string",
      email: "string|email",
      phone: "string",
    };
  }

  changePasswordValidationRule() {
    return {
      password: "required|string",
      new_password: "required|string",
    };
  }

  createUser() {
    return (req, res, next) => {
      const validationRules = this.createUserValidationRule();
      this.validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
          this.sendError(res, err);
        } else {
          next();
        }
      });
    };
  }

  updateUser() {
    return (req, res, next) => {
      const validationRules = this.updateUserValidationRule();
      this.validator(req.body, validationRules, {}, (err, status) => {
        if (!status) {
          this.sendError(res, err);
        } else {
          next();
        }
      });
    };
  }

  changePassword() {
    return (req, res, next) => {
      const validationRules = this.changePasswordValidationRule();
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

export default new UserValidator();
