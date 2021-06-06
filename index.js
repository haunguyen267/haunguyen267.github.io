const port = 3000;
import express from 'express';
import userRoutes from './routes/users.routes.js';
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
app.use('/users', userRoutes);
app.use(express.static('public'));

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
