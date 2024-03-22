export const isAValidationError = (response) => {
  if (!response) {
    return false;
  }
  return response.status === 422 && !response.data.type;
};
