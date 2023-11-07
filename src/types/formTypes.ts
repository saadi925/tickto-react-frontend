
export type LoginData = {
    username : string
    password : string
}
export type SignUpData = {
  username : string
  password : string
  email : string
  role : string
}
export interface IUser {
  user: {
    id: string;
    username: string;
    email: string;
    role: string;
    verified : boolean
    created_at : Date
    updated_at : Date
  };
}