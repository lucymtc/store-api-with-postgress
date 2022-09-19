import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model', () => {
  it('should have an index method', () => {
    expect(store.index).toBeDefined;
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a update method', () => {
    expect(store.update).toBeDefined();
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();
    expect(result).toEqual([
      {
        id: 1,
        username: 'lucymtc',
        first_name: 'Lucy',
        last_name: 'Tomas',
        password: '123password',
        status: 'active'
      }
    ]);
  });

  it('create method should add a user', async () => {
    const result: User = await store.create({
      username: 'testusername',
      first_name: 'Testname',
      last_name: 'Testlastname',
      password: '123password'
    });

    expect(result).toEqual({
      id: 2,
      username: 'testusername',
      first_name: 'Testname',
      last_name: 'Testlastname',
      password: '123password',
      status: 'active'
    });
  });

  it('show method should return one user by ID', async () => {
    const result = await store.show(2);
    expect(result).toEqual({
      id: 2,
      username: 'testusername',
      first_name: 'Testname',
      last_name: 'Testlastname',
      password: '123password',
      status: 'active'
    });
  });

  it('update method should update a user', async () => {
    const result: User = await store.update(2, {
      username: 'testusername',
      first_name: 'Updatename',
      last_name: 'Updatelastname',
      password: '1234password',
      status: 'inactive'
    });

    expect(result).toEqual({
      id: 2,
      username: 'testusername',
      first_name: 'Updatename',
      last_name: 'Updatelastname',
      password: '1234password',
      status: 'inactive'
    });
  });
});
