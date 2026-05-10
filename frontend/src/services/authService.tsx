import { fetchData } from "../interceptors/fetchData";
import type { ILoginResponse } from "../models/ILoginResponse";
import type { IUser } from "../models/IUser";

export const register = async (
  nickname: string,
  email: string,
  password: string,
  name?: string,
  surname?: string,
  address?: string
): Promise<{ message: string }> => {
  return await fetchData({
    url: "/auth/register",
    method: "POST",
    body: { nickname, email, password, name, surname, address },
  });
};

export const login = async (
  nickname: string,
  password: string
): Promise<ILoginResponse> => {
  const LOGIN_URL = "/auth/login";
  return await fetchData({
    url: LOGIN_URL,
    method: "POST",
    body: { nickname, password },
  });
};

export const getMe = async (): Promise<IUser> => {
  const ME_URL = "/me";
  return await fetchData({
    url: ME_URL,
    method: "GET",
  });
};