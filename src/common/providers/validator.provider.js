export default class Validator {
  static validate(schema, request) {
    const errors = {};
    const { error, value } = schema.validate( request, { abortEarly: false } );

    if (error) {
      error.details.forEach((detail) => {
        errors[detail.path[0]] = detail.message;
      });
    }

    return {
      value,
      errors: Object.values(errors).length > 0 ? errors : null,
    };
  }
}
