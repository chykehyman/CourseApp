/**
 * @function validateCourseTimeLength
 *
 * @param {any} value
 *
 * @returns {boolean}
 */
const validateCourseTimeLength = (value) => {
  const regExFormat = /^([0-9]{1,3}:[0-5][0-9]{1})$/;
  return regExFormat.test(value);
};

const validateCharLength = (value, minLength, name, errors) => {
  if (name !== 'id' && value.length < minLength) {
    errors[name] = `${name} requires at least ${minLength} characters`;
  }
};

/**
 * @function validateFormData
 *
 * @param {object} formData
 *
 * @returns {object}
 */
export const validateFormData = (formData) => {
  const minLength = 3;
  const errors = {};

  const isCourseForm = Object.keys(formData).includes('authorId');

  Object.entries(formData).forEach(([name, value]) => {
    value = value.trim();
    if (isCourseForm) {
      if (name === 'authorId' && value === '') {
        errors[name] = 'author is required';
      }

      const namesToSkip = ['id', 'watchHref', 'authorId', 'length'];

      if (!namesToSkip.includes(name)) {
        validateCharLength(value, minLength, name, errors);
      }
      if (name === 'length') {
        if (!validateCourseTimeLength(value)) {
          errors[name] = 'Invalid length format e.g 5:59';
        }
      }
    } else {
      validateCharLength(value, minLength, name, errors);
    }
  });

  return { errors, isValid: Object.keys(errors).length === 0 };
};
