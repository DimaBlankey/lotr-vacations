import { ValidationError } from "./client-errors";
import Joi from "joi";

class FollowersModel {
  userId: number;
  vacationId: number;

  public constructor(follower: FollowersModel) {
    this.userId = follower.userId;
    this.vacationId = follower.vacationId;
  }

  private static postValidationSchema = Joi.object({
    userId: Joi.number().positive().integer().required(),
    vacationId: Joi.number().positive().integer().required(),
  });
  public validateFollowerPost(): void {
    const result = FollowersModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default FollowersModel;
