import USERARR from '../db.js';
import bcrypt from 'bcrypt';
import User from '../models/user.model.js';

export const index = async (req, res) => {
  const users = await User.find();
  res.render('users/index', {
    name: "List",
    userArr: users
  });
};

export const show = async (req, res) => {
  let id = req.params.id;
  let userDetail = await User.findById(id);

  res.render('users/show', {
    user: userDetail
  });
};

export const search = async (req, res) => {
  let filteredData = await User.find({
    name:{
      "$regex": req.query.q,
      "$options": "i"
    }
  });

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

export const create = async (req, res) => {
  let avatarPath = req.file.path.split('/').slice(1).join('/');
  let newUser = {
    ...req.body,
    password: bcrypt.hashSync(req.body.password, 10),
    avatar: avatarPath
  };

  await User.create(newUser);
  res.redirect('/users');
};
