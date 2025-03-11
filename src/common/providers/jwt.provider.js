import { convertHumanReadbleTimeToMilliseconds } from "../../lib/utils.js";
import ConfigService from "../classes/config-service.class.js"
import jwt from "jsonwebtoken"
import { UnauthenticatedException } from "../classes/error-definitions.class.js";

export default class JwtProvider
{
    static generateAuthenticationToken ( payload )
    {
        const secretKey = ConfigService.getOrThrow( "jwt_secret_key" );
        const expiresIn = convertHumanReadbleTimeToMilliseconds(
          ConfigService.getOrThrow("jwt_expires_in")
        );

        return jwt.sign( payload, secretKey, { expiresIn });
    }

    static verifyAuthenticationToken ( token )
    {
        const secretKey = ConfigService.getOrThrow( "jwt_secret_key" );
        
        try {
            return jwt.verify( token, secretKey );
        } catch ( error ) {
            throw new UnauthenticatedException( "Invalid or expired JWT token" );
        }
    }
}
