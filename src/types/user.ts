export interface UserSignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  profilePicture?: string;
}

export interface SignAuthPayload {
  accessToken: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  profilePicture: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface SignUpData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
