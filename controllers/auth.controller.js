import USERARR from '../db.js';
import bcrypt from 'bcrypt';

export const login = (req, res, next) => {
  res.render('auth/login');
};

export const postLogin = (req, res, next) => {
  let email = req.body.email;
  let password = req.body.password;
  let errors = [];

  if(!email) {
    errors.push('Enter email');
  }

  if(!password) {
    errors.push('Enter password');
  }

  let userFind = USERARR.find((user) => user.email == email);
  if(email && password) {
    if(!userFind || !bcrypt.compareSync(password, userFind.password)) {
      errors.push('Email or password is incorrect');
    }
  }

  if(errors.length) {
    res.render('auth/login', {
      errors: errors,
      values: req.body
    });

    return;
  }

  res.cookie('user_id', userFind.id, {
    signed: true
  });
  res.redirect('/users');
};
