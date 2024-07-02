export interface User {
  id: number;
  username: string;
  email: string;
  passwordHash: string;
  profilePictureFileName?: string;
}
