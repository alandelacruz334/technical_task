export type IUser = {
  id: number;
  nickname: string;
  password: string;
  name: string | null;
  surname: string | null;
  address: string | null;
  email: string;
  createdAt: Date;
};
