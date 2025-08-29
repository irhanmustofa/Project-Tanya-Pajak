class Validator {
  constructor(data, validationRules) {
    this.result = this.run(data, validationRules);
  }

  run(data, validationRules) {
    let errMessage = [];

    for (const [key, value] of Object.entries(data)) {
      const rules = validationRules[key];
      const input = value;

      if (rules === undefined) continue;

      const rulesArray = rules.split("|");

      const isEmpty = (val) =>
        val === undefined ||
        val === null ||
        (typeof val === "string" && val.trim() === "");

      if (isEmpty(value) && !rulesArray.includes("required")) continue;

      for (const rule of rulesArray) {
        const [ruleName, ruleValue] = rule.split(":");

        switch (ruleName) {
          case "required":
            if (isEmpty(value) || !Validator.validateRequired(input)) {
              errMessage.push(`${key} is required`);
            }
            break;
          case "email":
            if (!Validator.validateEmail(input)) {
              errMessage.push(`${key} is invalid email`);
            }
            break;
          case "string":
            if (!Validator.validateString(input)) {
              errMessage.push(`Input ${key} is invalid string`);
            }
            break;
          case "number":
            if (!Validator.validateNumber(input)) {
              errMessage.push(`Input ${key} is invalid number`);
            }
            break;
          case "max":
            if (!Validator.validateMax(input, ruleValue)) {
              errMessage.push(`Max of ${key} is ${ruleValue}`);
            }
            break;
          case "min":
            if (!Validator.validateMin(input, ruleValue)) {
              errMessage.push(`Min of ${key} is ${ruleValue}`);
            }
            break;
          case "password":
            if (!Validator.validatePassword(input)) {
              errMessage.push(
                `${key} must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character`
              );
            }
            break;
          case "unique":
            if (!Validator.checkUnique(input, ruleValue)) {
              errMessage.push(`${key} already exists in ${ruleValue}`);
            }
            break;
          default:
            break;
        }
      }
    }

    return errMessage.length > 0
      ? {
        success: false,
        error: errMessage,
      }
      : {
        success: true,
        error: [],
      };
  }

  getResult() {
    return this.result;
  }

  getErrors() {
    return this.result.error;
  }

  static validateRequired(value) {
    return (
      value !== undefined && value !== null && value.toString().trim() !== ""
    );
  }

  static validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  static validateString(string) {
    return typeof string === "string";
  }

  static validateNumber(number) {
    return /^-?\d+$/.test(String(number));
  }

  static validateMax(input, length) {
    const isNumber = this.validateNumber(input);
    return isNumber
      ? Number(input) <= Number(length)
      : String(input).length <= Number(length);
  }

  static validateMin(input, length) {
    const isNumber = this.validateNumber(input);
    return isNumber
      ? Number(input) >= Number(length)
      : String(input).length >= Number(length);
  }

  static validatePassword(password) {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^_+])[A-Za-z\d@$!%*?&#^_+]{8,}$/;
    return re.test(password);
  }

  static checkUnique(input, collection) {
    return true;
  }
}

export default Validator;
