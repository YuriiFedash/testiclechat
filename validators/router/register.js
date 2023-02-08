import Joi from "joi";

export default Joi.object({
  login: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  nickname: Joi.string().min(3).max(49).alphanum(),
});

// Joi.object().validateAsync
