export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ApiResponse<T = null> {
  success: boolean;
  message: string;
  data?: T;
}
