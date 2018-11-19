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

  Object.entries(formData).forEach(([name, value]) => {
    value = value.trim();
    if (name === 'authorId' && value === '') {
      errors[name] = 'author is required';
    }

    const namesToSkip = ['id', 'watchHref', 'authorId', 'length'];

    if (!namesToSkip.includes(name)) {
      if (value.length < minLength) {
        errors[name] = `${name} requires at least ${minLength} characters`;
      }
    }
    if (name === 'length') {
      if (!validateCourseTimeLength(value)) {
        errors[name] = 'Invalid length format e.g 5:59';
      }
    }
  });

  return { errors, isValid: Object.keys(errors).length === 0 };
};
