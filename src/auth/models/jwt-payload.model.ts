export interface JwtPayload {
  userId: string;
}

export interface AuthResponse {
  name: string;
  email: string;
  accessToken: string;
}
