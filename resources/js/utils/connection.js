export const isAValidationError = (response) => {
    return response.status === 422 && !response.data.type;
}