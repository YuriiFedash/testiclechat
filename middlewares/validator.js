const validators = require("../validators/router/index");

module.exports = function (validator) {
  if (!validators.hasOwnProperty(validator)) {
    throw new Error(`'${validator}' validator does not exist`);
  }
  return async function (req, res, next) {
    try {
      const validated = await validators[validator].validateAsync(req.body, {
        stripUnknown: true,
      });
      req.body = validated;
      next();
    } catch (err) {
      next(err);
    }
  };
};
