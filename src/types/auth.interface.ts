export interface IFormDataLogin {
  username: string;
  password: string;
}

export interface IFormDataRegister {
  username: string;
  password: string;
  email: string;
  name: string;
  phone?: string;
  confirmPassword?: string;
  checkCondition?: boolean;
}
