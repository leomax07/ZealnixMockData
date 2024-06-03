export interface LoginTypes {
  email: string;
  password: string;
}

export interface LoginPayload {
  credentials: LoginTypes;
  rememberMe: boolean;
}

export interface AuthInitialStateTypes {
  loading: boolean;
  error: string;
  isLoggedIn: boolean;
  currentUser: any;
  token: string;
}
