import { ValidationError } from "./client-errors";
import Joi from "joi";
import { UploadedFile } from "express-fileupload";

class VacationModel {
  vacationId: number;
  destination: string;
  description: string;
  startDate: string;
  endDate: string;
  price: number;
  imageUrl: string;
  image: UploadedFile;

  public constructor(vacation: VacationModel) {
    this.vacationId = vacation.vacationId;
    this.destination = vacation.destination;
    this.description = vacation.description;
    this.startDate = vacation.startDate;
    this.endDate = vacation.endDate;
    this.price = vacation.price;
    this.imageUrl = vacation.imageUrl;
    this.image = vacation.image;
  }

  private static postValidationSchema = Joi.object({
    vacationId: Joi.number().forbidden().positive().integer(),
    destination: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10).max(1000),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().min(0).max(10000),
    imageUrl: Joi.optional(),
    image: Joi.optional(),
  });

  private static putValidationSchema = Joi.object({
    vacationId: Joi.number().required().positive().integer(),
    destination: Joi.string().required().min(3).max(100),
    description: Joi.string().required().min(10).max(1000),
    startDate: Joi.date().required(),
    endDate: Joi.date().required(),
    price: Joi.number().required().min(0).max(10000),
    imageUrl: Joi.optional(),
    image: Joi.optional(),
  });

  public validateVacationPost(): void {
    const result = VacationModel.postValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }

  public validateVacationPut(): void {
    const result = VacationModel.putValidationSchema.validate(this);
    if (result.error) throw new ValidationError(result.error.message);
  }
}

export default VacationModel;
