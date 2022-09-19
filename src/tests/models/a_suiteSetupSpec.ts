import { Category, CategoryStore } from '../../models/category';
import { Product, ProductStore } from '../../models/product';
import { User, UserStore } from '../../models/user';
import { Order, OrderStore } from '../../models/order';

const pStore = new ProductStore();
const cStore = new CategoryStore();
const uStore = new UserStore();
const oStore = new OrderStore();

describe('Suite to setup shared setup ', () => {
  let categoryId = 0;
  let productId = 0;
  let userId = 0;
  let orderId = 0;

  beforeAll(async () => {
    const category: Category = await cStore.create({
      name: 'Books',
      slug: 'books',
      description: 'Kindle, Paper &s Audio Books'
    });

    categoryId = category.id || 0;

    const user: User = await uStore.create({
      username: 'lucymtc',
      first_name: 'Lucy',
      last_name: 'Tomas',
      password: '123password'
    });

    userId = user.id || 0;

    const product: Product = await pStore.create({
      name: 'Think and grow rich',
      price: 10,
      category_id: category.id
    });

    productId = product.id || 0;

    const order: Order = await oStore.create({
      user_id: user.id,
      status: 'active'
    });

    orderId = order.id || 0;
  });

  it('should have the expected ids for the shared data', () => {
    expect(categoryId).toEqual(1);
    expect(userId).toEqual(1);
    expect(productId).toEqual(1);
    expect(orderId).toEqual(1);
  });
});
