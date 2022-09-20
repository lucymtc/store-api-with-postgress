import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';

const tokenSecret = process.env.TOKEN_SECRET as Secret;

/**
 * @description Middleware to verfy JWT toket for authenticated requests.
 *
 * @param {Request}      req
 * @param {Response}     res
 * @param {NextFunction} next
 */
export const verifyJWT = (_req: Request, res: Response, next: NextFunction) => {
  const token = _req.body.token;

  if (!token) {
    res.status(403);
    res.json(`Token is required`);
    return;
  }

  try {
    jwt.verify(token, tokenSecret as Secret);
  } catch (err) {
    res.status(401);
    res.json(`Invalid token ${err}`);
    return;
  }

  next();
};
