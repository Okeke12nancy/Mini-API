// import { Validation } from "../index.js";
import { Validation } from "./index.validation.js";

export class PostValidator extends Validation {
  constructor() {
    super();
  }

  postValidationRule() {
    return {
      title: "required|string",
      body: "required|string",
    };
  }

  post() {
    return (req, res, next) => {
      const validationRules = this.postValidationRule();
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

export default new PostValidator();
