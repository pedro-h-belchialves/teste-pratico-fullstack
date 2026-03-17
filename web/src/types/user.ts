export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export interface LoginResponse {
  access_token: string;
  account_id: string;
  user?: User;
}

export interface UpdateUserPayload {
  name?: string;
  email?: string;
}
