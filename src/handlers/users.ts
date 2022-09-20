import express, { Request, Response } from 'express';
import { User, UserStore } from '../models/user';
import jwt, { Secret } from 'jsonwebtoken';
import { verifyJWT } from '../middleware/jwttoken';

const tokenSecret = process.env.TOKEN_SECRET as Secret;

const store = new UserStore();

/**
 * List all users endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const index = async (_req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Show one user endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const show = async (_req: Request, res: Response) => {
  try {
    const user = await store.show(_req.params.id as unknown as number);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Create user endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const create = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    first_name: _req.body.first_name,
    last_name: _req.body.last_name,
    password: _req.body.password
  };

  try {
    const newUser = await store.create(user);
    const token = jwt.sign({ user: newUser }, tokenSecret as Secret);
    res.json(token);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Update user endpoint
 *
 * @param _req Request
 * @param res  Response
 */
const update = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    first_name: _req.body.first_name,
    last_name: _req.body.last_name,
    password: _req.body.password,
    status: _req.body.status
  };

  const id = _req.params.id as unknown as number;

  try {
    const updatedUser = await store.update(id, user);
    res.json(updatedUser);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

/**
 * Autheticates a user, sends back the JWT token as the response.
 *
 * @param _req Request
 * @param res  Response
 */
const authenticate = async (_req: Request, res: Response) => {
  try {
    const user = await store.authenticate(
      _req.body.username,
      _req.body.password
    );
    if (user) {
      const token = jwt.sign({ user }, tokenSecret as Secret);
      res.json(token);
      return;
    }

    res.status(401);
    res.json('Invalid username or password');
  } catch (error) {
    res.status(401);
    res.json({ error });
  }
};

/**
 * As a first step we need an administrator user to setup the app data and test.
 * This is just a test route to facilitate the initial setup.
 *
 * @param _req Request
 * @param res  Response
 */
const inituser = async (_req: Request, res: Response) => {
  const user: User = {
    username: _req.body.username,
    first_name: _req.body.first_name,
    last_name: _req.body.last_name,
    password: _req.body.password
  };

  try {
    const newUser = await store.create(user);
    res.json(`User created: ${newUser}`);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', verifyJWT, index);
  app.get('/users/:id', verifyJWT, show);
  app.put('/users/:id', verifyJWT, update);
  app.post('/users', verifyJWT, create);
  app.post('/users/authenticate', authenticate);

  if (process.env.ENV !== 'production') {
    app.post('/inituser', inituser);
  }
};

export default userRoutes;
