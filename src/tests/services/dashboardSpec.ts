import { DashboardQueries } from '../../services/dashboard';

const store = new DashboardQueries();

describe('Dashboard Service', () => {
  it('should have an users with orders method', () => {
    expect(store.usersWithOrders).toBeDefined;
  });

  it('get users with orders method should return a list of users with orders', async () => {
    const result = await store.usersWithOrders();
    expect(result).toEqual([
      {
        id: 1,
        first_name: 'Lucy',
        last_name: 'Tomas'
      }
    ]);
  });

  it('should add product and quantity to a specific order', async () => {
    const result = await store.addProductToOrder(1, 1, 3);
    expect(result).toEqual({ order_id: 1, product_id: 1, quantity: 3 });
  });

  it('get list of products for a given order ID', async () => {
    const result = await store.productsInOrder(1);
    expect(result).toEqual([
      { id: 1, name: 'Think and grow rich', price: 10, quantity: 3 }
    ]);
  });

  it('should update the product quantity from a specific order', async () => {
    const result = await store.updateProductIdOrder(1, 1, 2);
    expect(result).toEqual({ order_id: 1, product_id: 1, quantity: 2 });
  });

  it('should delete the product from a specific order', async () => {
    const result = await store.deleteProductFromOrder(1, 1);
    expect(result).toBeUndefined();
  });
});
