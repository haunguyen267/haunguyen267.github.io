import USERARR from '../db.js';

export const requireLogin = (req, res, next) => {
  let userId = req.signedCookies.user_id;
  let currentUser = USERARR.find((user) => user.id == userId);

  if(!userId || !currentUser) {
    res.redirect('/auth/login');
    return;
  }

  res.locals.currentUser = currentUser;

  next();
};
