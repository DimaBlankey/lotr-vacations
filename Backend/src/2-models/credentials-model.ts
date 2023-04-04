import Joi from "joi";
import { ValidationError } from "./client-errors";

class CredentialsModel {
   email: string;
   password: string;

  public constructor(credentials: CredentialsModel) {
    this.email = credentials.email;
    this.password = credentials.password;
  }

  private static credentialsSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  public validateCredentials(): void {
    const result = CredentialsModel.credentialsSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default CredentialsModel;
