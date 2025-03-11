import { config } from "dotenv";
import { NotFoundException } from "./error-definitions.class.js";

export default class ConfigService
{
    static get ( key )
    {
        config();
        return process.env[key.toUpperCase()];
    }

    static getOrThrow ( key )
    {
        const value = this.get( key );

        if ( !value ) throw new NotFoundException(
          `Missing require environmental variable ${key}`
        );

        return value;
    }
}