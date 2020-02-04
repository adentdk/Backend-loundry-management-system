'use strict'

exports.required = ({fieldName, value}, error) => {
  if (!!value) {
    return;
  } else {
    error.push({
      field: fieldName,
      message: `The ${fieldName} is required `
    });
  }
};