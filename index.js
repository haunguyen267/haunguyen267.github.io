import dotenv from 'dotenv';
dotenv.config();

const port = 3000;
import express from 'express';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import * as authMiddleware from './middlewares/auth.middlewares.js';
// import { Low, JSONFile } from 'lowdb';
// const adapter = new JSONFile('db.json');
// const db = new Low(adapter);
// await db.read();
// db.data = { users: [] };
// const { users } = db.data;
// console.log(users);

const app = express();
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use('/auth', authRoutes);
app.use('/users', authMiddleware.requireLogin, userRoutes);

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
