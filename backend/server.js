const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const connectDB = require('./config/db');
const path = require('path')
const departmentRoutes = require('./routes/departmentRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const positionRoutes =require ('./routes/positionRoutes')
const userRoutes = require('./routes/userRoutes');
const loginRoute = require('./routes/loginRoutes');
const itemroutes = require('./routes/itemroutes');
const logisticRequestRoutes =require('./routes/requsitionRoute');
const forwardedRequestsRouter = require('./routes/requesttodaf');
const stockRoutes = require('./routes/stockRoutes');
//const signatureRoute =require('./routes/signatureRoute')

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
app.use('/api/departments', departmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/users', userRoutes);
app.use('/api', loginRoute);
app.use('/api/items',itemroutes)


app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Routes
app.use('/api/logisticrequests', logisticRequestRoutes);


app.use('/api/forwardedrequests', forwardedRequestsRouter);

app.use('/api/stocks', stockRoutes); 

//app.use('/api/users', signatureRoute)




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
