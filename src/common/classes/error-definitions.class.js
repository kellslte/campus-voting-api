export class NotFoundException extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

export class ValidationException extends Error {
  constructor(message, error) {
    super(message);
      this.errors = error;
      this.statusCode = 422;
  }
}

export class BadRequestException extends Error
{
    constructor( message )
    {
        super( message );
        this.statusCode = 400;
    }
}

export class ConflictException extends Error
{
    constructor( message )
    {
        super( message );
        this.statusCode = 409;
    }
}

export class TooManyRequestException extends Error
{
    constructor(message){
        super( message );
        this.statusCode = 429;
    }
}

export class UnauthorizedException extends Error
{
    constructor(message){
        super( message );
        this.statusCode = 403;  
    }
}

export class UnauthenticatedException extends Error
{
    constructor( message )
    {
        super( message );
        this.statusCode = 401;
    }
}