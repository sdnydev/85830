function isErrorWithMessage(error) {
  return typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string';
}
function toErrorWithMessage(maybeError) {
  if (isErrorWithMessage(maybeError)) return maybeError;
  try {
    return new Error(JSON.stringify(maybeError));
  } catch (error) {
    return new Error(String(maybeError));
  }
}
export function getErrorMessage(error) {
  return toErrorWithMessage(error).message;
}
//# sourceMappingURL=get-error-message.util.js.map
