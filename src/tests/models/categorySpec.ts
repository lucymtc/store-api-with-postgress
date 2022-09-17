import { Category, CategoryStore } from '../../models/category';

const store = new CategoryStore();

describe('Category Model', () => {
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

  it('create method should add a category', async () => {
    const result: Category = await store.create({
      name: 'Music',
      slug: 'music',
      description: 'Digital, CD, Vinyls '
    });
    expect(result).toEqual({
      id: 1,
      name: 'Music',
      slug: 'music',
      description: 'Digital, CD, Vinyls '
    });
  });
});
