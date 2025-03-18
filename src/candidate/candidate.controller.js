import { ValidationException } from "../common/classes/error-definitions.class.js";
import { asyncWrapper } from "../lib/utils.js";
import * as candidateService from "./candidate.service.js";
import { CreatCanditateRequest } from "./candidate.request.js";
import validator from "../common/providers/validator.provider.js";

export const registerCandidate = asyncWrapper( async ( req, res ) =>
{
  const { errors, value } = validator.validate(CreatCanditateRequest, req.body);

  if (errors)
    throw new ValidationException(
      "The request  failed with the  following errors",
      errors
    );

  const candidate = await candidateService.createNewCandidateProfile(value);

  return res.status(201).json({
    success: true,
    message: "Candidate profile created successfully",
    data: { candidate }, // Return the created candidate profile
  });
});
