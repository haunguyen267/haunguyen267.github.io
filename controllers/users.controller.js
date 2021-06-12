import USERARR from '../db.js';
import bcrypt from 'bcrypt';

export const index = (req, res) => {
  res.render('users/index', {
    name: "List",
    userArr: USERARR
  });
};

export const show = (req, res) => {
  let id = parseInt(req.params.id);
  let userDetail = USERARR.find(user => user.id == id);

  res.render('users/show', {
    user: userDetail
  });
};

export const search = (req, res) => {
  let filteredData = USERARR
    .filter((user) => user.name.toLowerCase().includes(req.query.q));

  res.render('users/index', {
    name: "Search Results:",
    keyword: req.query.q,
    userArr: filteredData
  })
};

export const newUser = (req, res) => {
  res.render('users/new', {
    csrfToken: req.csrfToken()
  });
};

export const create = (req, res) => {
  let avatarPath = req.file.path.split('/').slice(1).join('/');
  let newUser = {
    id: Math.floor(Math.random() * 10) + 3,
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 10),
    avatar: avatarPath
  };

  USERARR.push(newUser);
  res.redirect('/users');
};
