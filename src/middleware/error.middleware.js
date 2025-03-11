import ConfigService from "../common/classes/config-service.class.js";
import { ValidationException } from "../common/classes/error-definitions.class.js";

export default function globalErrorHandler ( err, req, res, next )
{
  if (err instanceof ValidationException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  const statusCode = err.statusCode ? err.statusCode : 500;

  return res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: ConfigService.getOrThrow("node_env") !== "production" ? err.stack : undefined
  });
}
