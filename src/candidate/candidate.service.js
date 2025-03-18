import Profile from "../models/profile.model.js";
import * as userService from "../user/user.service.js";

export const createNewCandidateProfile = async (payload) => {
  //1. Update the role of the user
  await userService.updateUserRole(payload.studentId, "Candidate");

  const user = await userService.getUserByIdentifier(payload.studentId);

  if (!user) throw new NotFoundException("No record exists for the user");

  //2. Create a profile record for the user
  const newProfile = await Profile.create({ ...payload, userId: user.id });

  //3. Return the updated user and profile
  return newProfile;
};
