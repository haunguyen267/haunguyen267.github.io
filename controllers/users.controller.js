let userArr = [
  {id: 1, name: 'Hau', age: 20},
  {id: 2, name: 'Hau 2', age: 30},
  {id: 3, name: 'Khoa', age: 26}
]

export const index = (req, res) => {
  res.render('users/index', {
    name: "List",
    userArr: userArr
  });
};

export const show = (req, res) => {
  let id = parseInt(req.params.id);
  let userDetail = userArr.find(user => user.id == id);

  res.render('users/show', {
    user: userDetail
  });
};

export const search = (req, res) => {
  let filteredData = userArr
    .filter((user) => user.name.toLowerCase().includes(req.query.q));

  res.render('users/index', {
    name: "Search Results:",
    keyword: req.query.q,
    userArr: filteredData
  })
};

export const newUser = (req, res) => {
  res.render('users/new');
};

export const create = (req, res) => {
  let newUser = {id: Math.floor(Math.random() * 10) + 3, ...req.body};
  userArr.push(newUser);
  res.redirect('/users');
};
