const allRoles = {
  user: ['getProducts', 'getProduct'],
  admin: [
    'getUsers',
    'importProducts',
    'createProduct',
    'getProduct',
    'getProducts',
    'updateProduct',
    'deleteProduct',
    'manageUsers',
  ],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
