import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import categoriesRoutes from './handlers/categories';
import userRoutes from './handlers/users';
import productsRoutes from './handlers/products';
import ordersRoutes from './handlers/orders';

const app: express.Application = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

categoriesRoutes(app);
userRoutes(app);
productsRoutes(app);
ordersRoutes(app);

app.get('/', function (req: Request, res: Response) {
  res.send('Check Requirements.md for the api endpoint details.');
});

app.listen(PORT, function () {
  console.log(`starting app on: http://localhost:${PORT}`);
});

export default app;
