// import { Validation } from "../index.js";
import { Validation } from "./index.validation.js";

export class CommentValidator extends Validation {
  constructor() {
    super();
  }

  commentValidationRule() {
    return {
      post: "required|string",
      body: "required|string",
    };
  }

  comment() {
    return (req, res, next) => {
      const validationRules = this.commentValidationRule();
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

export default new CommentValidator();
