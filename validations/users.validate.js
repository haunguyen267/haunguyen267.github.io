export const createUser = (req, res, next) => {
  let errors = [];

  if(!req.body.name) {
    errors.push('Name is required');
  }

  if(!req.body.age) {
    errors.push('Age is required');
  }

  if(errors.length) {
    res.render('users/new', {
      errors: errors,
      values: req.body
    });

    return;
  }

  next();
};
