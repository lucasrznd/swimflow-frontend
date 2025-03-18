export interface UserResponse {
  id: number;
  fullName: string;
  email: string;
  createdAt: Date;
  lastLogin: Date;
  role: string;
  active: boolean;
}
