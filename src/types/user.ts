export interface UserSignUpData {
  name: string
  email: string
  password: string
  confirmPassword: string
  profilePicture?: string
}

export interface SignAuthPayload {
  accessToken: string
  refreshToken: string
}

export interface User {
  name: string
  email: string
  profilePicture: string
}

export interface SignInData {
  email: string
  password: string
}

export interface SignUpData {
  name: string
  email: string
  password: string
  confirmPassword: string
}
