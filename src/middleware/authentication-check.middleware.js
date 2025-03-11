import { UnauthenticatedException } from "../common/classes/error-definitions.class.js";
import JwtProvider from "../common/providers/jwt.provider.js";

export default function checkAuthenticatedUserOrFail(req, res, next) {
  try {
    // 1. Fetch the token from the request cookies
    const token = req.cookies["token"];

    //. If the token is not passed in the cookies throw an error
    if (!token) throw new UnauthenticatedException("Invalid or missing token");

    //2. Verify the token against the secret key and set the payload on thge request
    req.user = JwtProvider.verifyAuthenticationToken(token);
    next();
  } catch (error) {
    next(error);
  }
}
