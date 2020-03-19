export interface AuthStateInterface {
  isLoading: boolean,
  formIsValid: boolean,
  formIsTouched: boolean,
  touchedFields: string[],
  password: string,
  email: string,
  passwordIsValid: boolean,
  emailIsValid: boolean,
  isSignedUp: boolean,
  [key: string]: string | boolean | string[]
}

export interface AuthProps {
  authenticate: (email: string, password: string) => void
}