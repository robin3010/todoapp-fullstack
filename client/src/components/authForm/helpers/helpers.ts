export const checkUsernameValid = (userName: string) => {
  const userNamePattern
      = /^[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){2,18}[a-zA-Z0-9]$/g
  return userNamePattern.test(userName)
}
