import dotenv from 'dotenv';
dotenv.config();

const port = 3000;
import express from 'express';
import multer  from 'multer';
import csrf from 'csurf';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/users.routes.js';
import productRoutes from './routes/products.routes.js';
import cartRoutes from './routes/cart.routes.js';
import productApiRoutes from './api/routes/products.routes.js';
import * as authMiddleware from './middlewares/auth.middlewares.js';
import * as sessionMiddleware from './middlewares/sessions.middlewares.js';

const app = express();
mongoose.connect(process.env.MONGOOES_ENDPOINT,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connected");
});
const upload = multer({ dest: './public/uploads/' });
const csrfProtection = csrf({ cookie: true });

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/products', productApiRoutes);
app.use(express.static('public'));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(sessionMiddleware.createSession);
app.use('/auth', authRoutes);
app.use('/users',
  upload.single('avatar'),
  csrfProtection,
  authMiddleware.requireLogin,
  userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);

app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
