# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
### <u>Categories</u>
#### List Categories
##### Definition
GET `/categories`
<small>Returns a list of categories</small>

#### Create a Category
##### Definition
POST `/categories`
<small>Creates a new category, authentication toket required</small>

##### Arguments
| Argument       | Description                         |
| -------------- | ----------------------------------- |
| name           |  Name of the category               |
| slug           |  Slug of the category               |
| description    |  Cateogry description               |

#### Retrieve a Category
##### Definition
GET `/categories/:id`
<small>Returns one category record by the given ID</small>

##### Arguments
| Argument       | Description              |
| -------------- | ------------------------ |
| id             |  The Category ID         |

#### Update a Category
##### Definition
PUT `/categories/:id`
<small>Updates a category with the given ID, authentication toket required</small>

##### Arguments
| Argument       | Description                         |
| -------------- | ----------------------------------- |
| id             |  The Category ID                    |
| name           |  Name of the category               |
| slug           |  Slug of the category               |
| description    |  Cateogry description               |

#### Delete a Category
##### Definition
DELETE `/categories/:id`
<small>Deletes a category with the given ID, authentication toket required</small>

##### Arguments
| Argument       | Description              |
| -------------- | ------------------------ |
| id             |  The Category ID        |
### <u>Products</u>
#### List Products
##### Definition
GET `/products`
<small>Returns a list of products</small>

#### Create a Product
##### Definition
POST `/products`
<small>Creates a new product, authentication toket required</small>

##### Arguments
| Argument       | Description                         |
| -------------- | ----------------------------------- |
| name           |  Name of the product                |
| price          |  Price of the product               |
| category_id    |  Cateogry ID the product belongs to |

#### Retrieve a Product
##### Definition
GET `/products/:id`
<small>Returns one product record by the given ID</small>

##### Arguments
| Argument       | Description              |
| -------------- | ------------------------ |
| id             |  The Product's ID        |

#### Update a product
##### Definition
PUT `/products/:id`
<small>Updates a product with the given ID, authentication toket required</small>

##### Arguments
| Argument       | Description                         |
| -------------- | ----------------------------------- |
| id             |  The Product's ID                   |
| name           |  Name of the product                |
| price          |  Price of the product               |
| category_id    |  Cateogry ID the product belongs to |

### <u>Users</u>

#### Initial app setup with user
##### Definition
POST `/users/inituser`
<small>Creates a new user without authentication requirement in order to init the app and test, endpoint only for non production environments.</small>

##### Arguments
| Argument       | Description              |
| -------------- | ------------------------ |
| username       |  Username of the user    |
| first_name     |  First Name of the user  |
| last_name      |  Last Name of the user   |
| password       |  Password of the user    |
#### List Users
##### Definition
GET `/users`
<small>Returns a list of users, authentication toket required</small>

#### Create a User
##### Definition
POST `/users`
<small>Creates a new user, authentication toket required</small>

##### Arguments
| Argument       | Description              |
| -------------- | ------------------------ |
| username       |  Username of the user    |
| first_name     |  First Name of the user  |
| last_name      |  Last Name of the user   |
| password       |  Password of the user    |
#### Retrieve a User
##### Definition
GET `/users/:id`
<small>Returns one user record by the given ID, authentication toket required</small>

##### Arguments
| Argument       | Description              |
| -------------- | ------------------------ |
| id             |  The User's ID         |

#### Update a User
##### Definition
PUT `/users/:id`
<small>Updates a user with the given ID, authentication toket required</small>

##### Arguments
| Argument       | Description              |
| -------------- | ------------------------ |
| id             |  The User's ID           |
| username       |  Username of the user    |
| first_name     |  First Name of the user  |
| last_name      |  Last Name of the user   |
| password       |  Password of the user    |

#### Authenticates a User
##### Definition
PUT `/users/authenticate`
<small>Authenticates a user</small>

##### Arguments
| Argument       | Description              |
| -------------- | ------------------------ |
| username       |  Username of the user    |
| password       |  Password of the user    |

### <u>Orders</u>

#### List Orders
##### Definition
GET `/orders`
<small>Returns a list of orders, authentication toket required</small>

##### Arguments
| Argument       | Description                                         |
| -------------- | --------------------------------------------------- |
| status         | The status of the order<br>One of: active, complete |
| user           | The user ID                                         |

#### Retrieve an Order
##### Definition
GET `/orders/:id`
<small>Returns one order record by the given ID, authentication toket required</small>

##### Arguments
| Argument       | Description              |
| -------------- | ------------------------ |
| id             |  The Orders's ID         |

#### Update an Order
##### Definition
PUT `/orders/:id`
<small>Updates an order with the given ID, authentication toket required</small>

##### Arguments
| Argument       | Description                                       |
| -------------- | ------------------------------------------------- |
| id             |  The Order's ID                                   |
| status         |  Status of ther order<br>One of: active, complete |

#### Add product to order
##### Definition
POST `/orders/:order_id/products/:product_id`
<small>Adds a product to an order, authentication toket required</small>

##### Arguments
| Argument       | Description                                       |
| -------------- | ------------------------------------------------- |
| order_id       |  The Order's ID                                   |
| product_id     |  The Products's ID                                |
| quantity       |  Quantity Number                                  |

#### Update product in order
##### Definition
PUT `/orders/:order_id/products/:product_id`
<small>Updates a product in an order, authentication toket required</small>

##### Arguments
| Argument       | Description                                       |
| -------------- | ------------------------------------------------- |
| order_id       |  The Order's ID                                   |
| product_id     |  The Products's ID                                |
| quantity       |  Quantity Number                                  |


#### Delete product in order
##### Definition
DELETE `/orders/:order_id/products/:product_id`
<small>Deletes a product from an order, authentication toket required</small>

##### Arguments
| Argument       | Description                                       |
| -------------- | ------------------------------------------------- |
| order_id       |  The Order's ID                                   |
| product_id     |  The Products's ID                                |

#### Retrieve products list in an order
##### Definition
GET `/orders/:order_id/products`
<small>Get all products added to an order, authentication toket required</small>

##### Arguments
| Argument       | Description                                       |
| -------------- | ------------------------------------------------- |
| order_id       |  The Order's ID                                   |

## Data Shapes
#### Products
- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- price `INTEGER`
- category_id `INTEGER REFERENCES category(id)`

#### Categories
- id `SERIAL PRIMARY KEY`
- name `VARCHAR`
- slug `VARCHAR`
- description `TEXT`

#### Users
- id `SERIAL PRIMARY KEY`
- username `VARCHAR`
- first_name `VARCHAR`
- last_name `VARCHAR`
- password `VARCHAR`
- status `ENUM ('active', 'inactive')`

#### Orders
- id `SERIAL PRIMARY KEY`
- user_id `INTEGER REFERENCES users(id)`
- status `ENUM ('active', 'complete', 'cancel')`

#### Orders_Products
- order_id `INTEGER REFERENCES orders(id)`
- product_id `INTEGER REFERENCES products(id)`
- quantity `INTEGER`

