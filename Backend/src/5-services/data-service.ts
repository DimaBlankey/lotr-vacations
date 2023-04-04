import dal from "../4-utils/dal";
import { OkPacket } from "mysql";
import { ResourceNotFoundError } from "../2-models/client-errors";
import VacationModel from "../2-models/vacation-model";
import FollowersModel from "../2-models/followers-model";
import appConfig from "../4-utils/app-config";
import imageHandler from "../4-utils/image-handler";

async function getAllVacations(userId: number): Promise<VacationModel> {
  const sql = `
  SELECT DISTINCT
  V.vacationId,
  V.destination,
  V.description,
  V.startDate,
  V.endDate,
  V.price,
  EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
  COUNT(F.userId) AS followersCount,
  CONCAT('${appConfig.imagesUrl}', V.imageName) AS imageUrl
FROM vacations as V LEFT JOIN followers as F
ON V.vacationId = F.vacationId
GROUP BY V.vacationId
ORDER BY V.startDate;
  `;
  const vacations = await dal.execute(sql, [userId]);
  // if (!vacations) throw new ResourceNotFoundError(vacations);
  return vacations;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
  vacation.validateVacationPost();

  let imageName = null;

  if (vacation.image) {
    imageName = await imageHandler.saveImage(vacation.image);
    vacation.imageUrl = appConfig.imagesUrl + imageName;
  }

  const sql = "INSERT INTO vacations VALUES(DEFAULT, ?, ?, ?, ?, ?, ?)";
  const result: OkPacket = await dal.execute(sql, [
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    imageName,
  ]);
  vacation.vacationId = result.insertId;

  delete vacation.image;

  return vacation;
}

async function deleteVacation(vacationId: number): Promise<void> {
  let imageName = await getVacationImageName(vacationId);

  const sql = "DELETE FROM vacations WHERE vacationId = ?";
  const result: OkPacket = await dal.execute(sql, [vacationId]);
  if (result.affectedRows === 0) throw new ResourceNotFoundError(vacationId);

  await imageHandler.deleteImage(imageName);
}

async function updateVacation(vacation: VacationModel): Promise<VacationModel> {
  vacation.validateVacationPut();

  let imageName = await getVacationImageName(vacation.vacationId);

  if (vacation.image) {
    imageName = await imageHandler.updateImage(vacation.image, imageName);
  }
  vacation.imageUrl = appConfig.imagesUrl + imageName;

  const sql = `UPDATE vacations SET destination = ?, description = ?, startDate = ?, endDate = ?, price = ? , imageName = ? WHERE vacationId = ?`;

  const result: OkPacket = await dal.execute(sql, [
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price,
    imageName,
    vacation.vacationId,
  ]);

  if (result.affectedRows === 0)
    throw new ResourceNotFoundError(vacation.vacationId);

  delete vacation.image;

  return vacation;
}

async function getVacationImageName(vacationId: number): Promise<string> {
  const sql = `
  SELECT imageName FROM vacations WHERE vacationId = ?
  `;
  const vacations = await dal.execute(sql, [vacationId]);
  const vacation = vacations[0];

  if (!vacation) return null;

  const imageName = vacation.imageName;

  return imageName;
}

async function addFollowVacation(followers: FollowersModel): Promise<FollowersModel> {
  followers.validateFollowerPost();

  const sqlCheck =
    "SELECT * FROM followers WHERE userId = ? AND vacationId = ?";
  const rows = await dal.execute(sqlCheck, [
    followers.userId,
    followers.vacationId,
  ]);

  if (rows.length > 0) {
    // The combination already exists, return the existing followers object
    return rows[0];
  } else {
    // The combination does not exist, insert the new followers object
    const sqlInsert = "INSERT INTO followers VALUES(?, ?)";
    await dal.execute(sqlInsert, [followers.userId, followers.vacationId]);
    return followers;
  }
}

async function deleteFollower(followers: FollowersModel): Promise<void> {
  const sql = "DELETE FROM followers WHERE userId = ? AND vacationId = ?";
  const result: OkPacket = await dal.execute(sql, [
    followers.userId,
    followers.vacationId,
  ]);
  if (result.affectedRows === 0)
    throw new ResourceNotFoundError(followers.vacationId);
}

export default {
  getAllVacations,
  deleteVacation,
  addVacation,
  updateVacation,
  addFollowVacation,
  deleteFollower,
};
