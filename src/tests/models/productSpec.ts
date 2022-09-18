import { Product, ProductStore } from '../../models/product';
import { Category, CategoryStore } from '../../models/category';

const store = new ProductStore();

describe('Product Model', () => {
  let categoryId = 0;
  beforeAll(async () => {
    const cStore = new CategoryStore();

    const catResult: Category = await cStore.create({
      name: 'Music',
      slug: 'music',
      description: 'Digital, CD'
    });

    categoryId = catResult.id || 0;
  });

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
    expect(result).toEqual([]);
  });

  it('create method should add a product', async () => {
    const result: Product = await store.create({
      name: 'Greatest hits',
      price: 10,
      category_id: categoryId
    });

    expect(result).toEqual({
      id: 1,
      name: 'Greatest hits',
      price: 10,
      category_id: categoryId
    });
  });

  it('update method should update a product', async () => {
    const result: Product = await store.update(1, {
      name: 'Greatest hits of all times',
      price: 20,
      category_id: categoryId
    });

    expect(result).toEqual({
      id: 1,
      name: 'Greatest hits of all times',
      price: 20,
      category_id: categoryId
    });
  });

  it('delete method should delete a product', async () => {
    const result: Product = await store.delete(1);
    expect(result).toBeUndefined();
  });
});
