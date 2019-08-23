import jwt from 'jsonwebtoken';
import * as env from './env.util';

const JWT_SECRET = env.get('JWT_SECRET');

export function createToken(uid: string): string {
  return jwt.sign({ uid }, JWT_SECRET, { expiresIn: '30d' });
}

export function getUserID(token: string): { id: string } {
  try {
    const { uid }: any = jwt.verify(token, JWT_SECRET);

    return uid;
  } catch (error) {
    return null;
  }
}
