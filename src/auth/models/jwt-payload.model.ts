export interface JwtPayload {
  userId: string;
}

export interface AuthResponse {
  name: string;
  accessToken: string;
  email: string;
}
