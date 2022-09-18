import { Order, OrderStore } from '../../models/order';

const store = new OrderStore();

describe('Order Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined;
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();
    expect(result).toEqual([]);
  });

  it('create method should add a order', async () => {
    const result: Order = await store.create({
      user_id: 1,
      status: 'active'
    });

    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'active'
    });
  });

  it('update method should update a order', async () => {
    const result: Order = await store.update(1, {
      user_id: 1,
      status: 'complete'
    });

    expect(result).toEqual({
      id: 1,
      user_id: 1,
      status: 'complete'
    });
  });
});
