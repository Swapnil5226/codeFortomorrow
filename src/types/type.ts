export class User {
  id: bigint;
  first_name: string;
  last_name?: string;
  email: string;
  password: string;
  mobile_number?: string;
  session_id?: string | null;
}

export class Login {
  email: string;
  password: string;
}

export class UserRes {
  success: boolean;
  status: number;
  msg: string;
  data?: User;
  // info?: UserEdit;
  // body?: Login;
  tokenInfo?: string;
  info?: any;
  updatesession?: any;
}
