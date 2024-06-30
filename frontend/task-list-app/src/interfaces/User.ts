export interface User {
  id: number; // Add this line
  username: string;
  email: string;
  passwordHash: string;
  profilePictureFileName?: string; // Optional if not required by backend
}
