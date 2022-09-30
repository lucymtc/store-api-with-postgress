import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined;
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'Think and grow rich',
        price: 10,
        short_description: 'Test short description',
        category_id: 1
      }
    ]);
  });

  it('create method should add a product', async () => {
    const result: Product = await store.create({
      name: 'Breaking the habit of being yourself',
      price: 10,
      short_description: 'Test short description',
      category_id: 1
    });

    expect(result).toEqual({
      id: 2,
      name: 'Breaking the habit of being yourself',
      price: 10,
      short_description: 'Test short description',
      category_id: 1
    });
  });

  it('show method should return one user by ID', async () => {
    const result = await store.show(2);
    expect(result).toEqual({
      id: 2,
      name: 'Breaking the habit of being yourself',
      price: 10,
      short_description: 'Test short description',
      category_id: 1
    });
  });

  it('update method should update a product', async () => {
    const result: Product = await store.update(2, {
      name: 'Breaking the habit of being yourself, Joe Dispenza',
      price: 20,
      short_description: 'Test short description',
      category_id: 1
    });

    expect(result).toEqual({
      id: 2,
      name: 'Breaking the habit of being yourself, Joe Dispenza',
      price: 20,
      short_description: 'Test short description',
      category_id: 1
    });
  });

  it('delete method should delete a product', async () => {
    const result = await store.delete(2);
    expect(result).toBeUndefined();
  });
});
