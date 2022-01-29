export interface ServerError {
  message: string;
  errorId: string;
  fingerprint: string;
  timestamp: string;
}

export interface AjaxError extends Error {
  url: string;
  status: number;
  statusText: string;
  serverError?: ServerError;
}

export interface BaseUser {
  username: string;
  email: string;
}

export interface NewUser extends BaseUser {
  password: string;
}

export interface User extends BaseUser {
  id: number;
}

export interface UserDetail extends User {
  password: string;
}

export interface Credentials {
  username: string;
  password: string;
}

export interface InitialPayload {
  currentUser?: User;
  hasUsers: boolean;
  startTime: number;
  averagePingTime: number;
}

export interface LoginPayload {
  success: boolean;
  user?: User;
}

export interface PingPayload {
  ping: 1;
}

export interface StartTime {
  startTime: number;
}
