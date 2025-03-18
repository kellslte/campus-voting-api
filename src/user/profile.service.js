import { NotFoundException } from "../common/classes/error-definitions.class.js";
import Profile from "../models/profile.model.js";
import * as userService from "./user.service.js";

export const createNewCandidateProfile = async (payload) => {
  //1. Fetch the user details
  const user = await userService.getUserByIdentifier(payload.studentId);
    if ( !user ) throw new NotFoundException( "No record exists for the user" );

  
  //2. Create a new profile
  const newProfile = await Profile.create({ ...payload, userId: user.id });

  return newProfile;
};


