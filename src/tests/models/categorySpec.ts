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

  it('index method should return a list of categories', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        name: 'Books',
        slug: 'books',
        description: 'Kindle, Paper &s Audio Books'
      }
    ]);
  });

  it('create method should add a category', async () => {
    const result: Category = await store.create({
      name: 'Music',
      slug: 'music',
      description: 'Digital, CD'
    });
    expect(result).toEqual({
      id: 2,
      name: 'Music',
      slug: 'music',
      description: 'Digital, CD'
    });
  });

  it('update method should update a category', async () => {
    const result: Category = await store.update(2, {
      name: 'Music',
      slug: 'music',
      description: 'Digital, CD, Vinyls'
    });
    expect(result).toEqual({
      id: 2,
      name: 'Music',
      slug: 'music',
      description: 'Digital, CD, Vinyls'
    });
  });

  it('delete method should delete a category', async () => {
    const result = await store.delete(2);
    expect(result).toBeUndefined();
  });
});
