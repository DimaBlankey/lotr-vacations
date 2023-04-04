import express, { Request, Response, NextFunction } from "express";
import VacationModel from "../2-models/vacation-model";
import verifyLoggedIn from "../3-middleware/verify-logged-in";
import dataService from "../5-services/data-service";
import jwt from "jsonwebtoken";
import cyber from "../4-utils/cyber";
import verifyAdmin from "../3-middleware/verify-admin";
import imageHandler from "../4-utils/image-handler";
import FollowersModel from "../2-models/followers-model";

const router = express.Router();

router.get(
  "/vacations/",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = request.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, cyber.secretKey);
      const userId = decodedToken.user.userId;
      const vacations = await dataService.getAllVacations(userId);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/vacations",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.image = request.files?.image
      const vacation = new VacationModel(request.body);
      const addedVacation = await dataService.addVacation(vacation);
      response.status(201).json(addedVacation);
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  "/vacations/:vacationId([0-9]+)",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = +request.params.vacationId;
      await dataService.deleteVacation(vacationId);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);

router.put(
  "/vacations/:vacationId([0-9]+)",
  verifyAdmin,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.vacationId = +request.params.vacationId;
      request.body.image = request.files?.image
      const vacation = new VacationModel(request.body);
      const updatedVacation = await dataService.updateVacation(vacation);
      response.json(updatedVacation);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/vacations/images/:imageName",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const imageName = request.params.imageName;
      const imagePath = imageHandler.getImagePath(imageName);
      response.sendFile(imagePath);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/followers/:vacationId([0-9]+)",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const token = request.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, cyber.secretKey);
    
      request.body.userId = decodedToken.user.userId;
      request.body.vacationId = +request.params.vacationId;

      const follower = new FollowersModel(request.body);
      const addedFollower = await dataService.addFollowVacation(follower);
      response.status(201).json(addedFollower);
    } catch (err: any) {
      next(err);
    }
  }
);

router.delete(
  "/followers/:vacationId([0-9]+)",
  verifyLoggedIn,
  async (request: Request, response: Response, next: NextFunction) => {
    try {

      const token = request.headers.authorization.split(" ")[1];
      const decodedToken = jwt.verify(token, cyber.secretKey);
    
      request.body.userId = decodedToken.user.userId;
      request.body.vacationId = +request.params.vacationId;

      const follower = new FollowersModel(request.body);
      
      await dataService.deleteFollower(follower);
      response.sendStatus(204);
    } catch (err: any) {
      next(err);
    }
  }
);





export default router;
