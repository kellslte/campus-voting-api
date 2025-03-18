import Joi from "joi";
import { studentGovernmentPositions } from "../models/profile.model.js";

export const CreatCanditateRequest = Joi.object( {
  studentId: Joi.string().required(),
  firstName: Joi.string().required(),
  middleName: Joi.string().required(),
  lastName: Joi.string().required(),
  phoneNumber: Joi.string().required(),
  photo: Joi.string().required(),
  manifesto: Joi.string().required(),
  position: Joi.string().valid(...studentGovernmentPositions).required(),
});
