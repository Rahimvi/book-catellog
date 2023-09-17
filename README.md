Application Routes:
User
api/v1/auth/signup (POST)
api/v1/users (GET)
api/v1/users/b0b353b6-488c-4494-84b9-fff937fd2a7b (Single GET) Include an id that is saved in your database
api/v1/users/b0b353b6-488c-4494-84b9-fff937fd2a7b (PATCH)
api/v1/users/b0b353b6-488c-4494-84b9-fff937fd2a7b (DELETE) Include an id that is saved in your database
api/v1/profile (GET)
Category
api/v1/categories/create-category (POST)
api/v1/categories (GET)
api/v1/categories/ed03b06e-a2e7-4d89-9d8e-702db8a48b37 (Single GET) Include an id that is saved in your database
api/v1/categories/ed03b06e-a2e7-4d89-9d8e-702db8a48b37 (PATCH)
api/v1/categories/ed03b06e-a2e7-4d89-9d8e-702db8a48b37 (DELETE) Include an id that is saved in your database
Books
api/v1/books/create-book (POST)
api/v1/books (GET)
api/v1/books/?categoryId/:id (GET)
api/v1/books/:id (GET)
api/v1/books/:id (PATCH)
api/v1/books/:id (DELETE)
Orders
api/v1/orders/create-order (POST)
api/v1/orders (GET)
api/v1/orders/:orderId (GET)
