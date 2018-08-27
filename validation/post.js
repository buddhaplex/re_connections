const Validator = require("validator");
const isEmpty = require("./is_empty");

module.exports = function validatePostInput(data) {
  let errors = {};

  data.text = !isEmpty(data.text) ? data.text : "";

  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Your post must be between 10 and 300 characters.";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "You need to enter a comment for your post!";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
