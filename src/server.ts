import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import categoriesRoutes from './handlers/categories';
import userRoutes from './handlers/users';

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

categoriesRoutes(app);
userRoutes(app);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log(`starting app on: http://localhost:${PORT}`);
});
