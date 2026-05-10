import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const EMAIL_REGEX =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userRepository = AppDataSource.getRepository(User);

export const register = async (req: Request, res: Response) => {
  const { nickname, email, password, name, surname, address } = req.body;

  if (!nickname || !email || !password) {
    return res
      .status(400)
      .json({ message: "Nickname, email y contraseña son obligatorios" });
  }

  if (nickname.length < 3 || nickname.length > 50) {
    return res
      .status(400)
      .json({ message: "El nickname debe tener entre 3 y 50 caracteres" });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res
      .status(400)
      .json({ message: "El email no tiene un formato válido" });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ message: "La contraseña debe tener al menos 8 caracteres" });
  }

  const existing = await userRepository.findOne({
    where: [{ nickname }, { email }],
  });

  if (existing) {
    const field = existing.nickname === nickname ? "nickname" : "email";
    return res.status(409).json({ message: `El ${field} ya está en uso` });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = userRepository.create({
    nickname,
    email,
    password: passwordHash,
    name: name || null,
    surname: surname || null,
    address: address || null,
  });
  await userRepository.save(user);

  return res.status(201).json({ message: "Usuario creado correctamente" });
};

export const login = async (req: Request, res: Response) => {
  const { nickname, password } = req.body;

  if (!nickname || !password) {
    return res.status(400).json({ message: "Faltan credenciales" });
  }

  const user = await userRepository.findOne({ where: { nickname } });

  if (!user) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return res.status(401).json({ message: "Credenciales incorrectas" });
  }

  const token = jwt.sign(
    { id: user.id, nickname: user.nickname },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" },
  );

  return res.json({ token });
};

export const me = async (req: Request, res: Response) => {
  const userId = (req as any).userId;

  const user = await userRepository.findOne({ where: { id: userId } });

  if (!user) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  return res.json({
    nickname: user.nickname,
    name: user.name,
    surname: user.surname,
    address: user.address,
    email: user.email,
  });
};
