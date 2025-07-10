import jwt from 'jsonwebtoken';

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET not defined');
  return secret;
};

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    getJwtSecret(),
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || '7d') as jwt.SignOptions['expiresIn'],
    }
  );
};

export const verifyToken = (token: string): { userId: string } => {
  return jwt.verify(token, getJwtSecret()) as { userId: string };
};
