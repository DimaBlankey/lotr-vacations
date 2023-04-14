import { ValidationError } from "./client-errors";
import Joi from "joi";

class UserModel {
  userId: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;

  public constructor(user: UserModel) {
    this.userId = user.userId;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.password = user.password;
    this.role = user.role;
  }
  private static postValidationSchema = Joi.object({
    userId: Joi.number().forbidden().positive().integer(),
    firstName: Joi.string().required().min(2).max(50),
    lastName: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    password: Joi.string()
      .pattern(
        new RegExp("^[a-zA-Z0-9!@#$%^&*()_+\\-=\\[\\]{}|;':\",./?]{8,30}$")
      )
      .required()
      .messages({
        "string.pattern.base": "Password must be between 8 and 30 characters",
      }),
    role: Joi.string().optional(),
  });

  public validateUserPost(): void {
    const result = UserModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default UserModel;
