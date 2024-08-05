const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const session = require('express-session');
const connectDB = require('./config/db');
const departmentRoutes = require('./routes/departmentRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const positionRoutes =require ('./routes/positionRoutes')
const userRoutes = require('./routes/userRoutes');
const loginRoute = require('./routes/loginRoutes');
const itemroutes = require('./routes/itemroutes');
const logisticRequestRoutes =require('./routes/requsitionRoute');
const forwardedRequestsRouter = require('./routes/requesttodaf');
const stockRoutes = require('./routes/stockRoutes');
const DataModel = require ('./models/dataschema')
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

//
// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.get('/', (req, res) => {
  res.send('Static file serving test');
});


// Use auth routes
app.use('/api/departments', departmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/users', userRoutes);
app.use('/api', loginRoute);
app.use('/api/items',itemroutes)




// Routes
app.use('/api/logisticrequests', logisticRequestRoutes);


app.use('/api/forwardedrequests', forwardedRequestsRouter);

app.use('/api/stocks', stockRoutes); 


// Endpoint to handle uploaded data
app.post('/api/uploadData', async (req, res) => {
  try {
    const data = req.body;
    await DataModel.insertMany(data);
    res.status(200).send({ success: true });
  } catch (error) {
    console.error(error);  // Log the error
    res.status(500).send({ success: false, error: error.message });
  }
});

app.get('/api/getData', async (req, res) => {
  try {
    const data = await DataModel.find({});
    res.status(200).send(data);
  } catch (error) {
    console.error(error);  // Log the error
    res.status(500).send({ success: false, error: error.message });
  }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
