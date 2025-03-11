import { UnauthorizedException } from "../common/classes/error-definitions.class.js";

export default function authorizeUserAction(...roles) {
  return function (req, res, next) {
    try {
      const user = req.user;
      if (!user || !roles.includes(user.role))
        throw new UnauthorizedException(
          "You are authorized to perform this action"
        );

      next();
    } catch (error) {
      next(error);
    }
  };
}
