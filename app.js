const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const authRoutes = require('./routes/auth');

const app = express();

// Configura sesión
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));

// Inicializa Passport
app.use(passport.initialize());
app.use(passport.session());

// Conectar a la base de datos
mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true });

// Configura Passport
require('./config/passport')(passport);

// Rutas de autenticación
app.use('/auth', authRoutes);

// Página de inicio de sesión
app.get('/login', (req, res) => {
  res.render('login');
});

// Página de registro
app.get('/register', (req, res) => {
  res.render('register');
});

// Página de productos
app.get('/products', (req, res) => {
  res.render('products', { user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
