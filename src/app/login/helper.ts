import validator from 'validator';
export const validateForm = ({ username = '', password = '' }) => {
  // console.log(username, password, !validator.isLength(password, { min: 6 }));
    const validationErrors: string[] = [];

    if (validator.isEmpty(username)) {
      validationErrors.push('Username is required.');
    }

    if (validator.isEmpty(password)) {
      validationErrors.push('Password is required.');
    }

    if(!validator.isLength(password, { min: 6 })) {
      validationErrors.push('Password should be at least 6 characters long.');
    }
    return validationErrors;
  };