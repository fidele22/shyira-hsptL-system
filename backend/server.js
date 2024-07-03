const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const loginRoute = require('./routes/loginRoutes');
const itemroutes = require('./routes/itemroutes')

const app = express();
app.use(bodyParser.json());
app.use(cors());

connectDB();

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Use auth routes

app.use('/api/users', userRoutes);
app.use('/api', loginRoute);
app.use('/api/items',itemroutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
