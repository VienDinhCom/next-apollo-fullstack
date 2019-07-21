import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET } = process.env;

export function createToken(uid: string) {
  return jwt.sign({ uid }, JWT_SECRET, { expiresIn: '30d' });
}

export function getUser(token: string) {
  try {
    if (token) {
      const { uid }: any = jwt.verify(token, JWT_SECRET);

      return { uid };
    }

    return null;
  } catch (error) {
    return null;
  }
}
