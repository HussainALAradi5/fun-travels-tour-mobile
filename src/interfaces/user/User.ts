export interface User {
  id: number;
  userName: string;
  name: string;
  email: string;
  mobileNumber: string;
  age?: number;
  userType: string;
  profileImageUrl?: string | null;
  active: boolean;
}
