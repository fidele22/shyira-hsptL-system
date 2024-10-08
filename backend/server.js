const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Make sure this line is present
const path = require('path');
require('dotenv').config(); // Load environment variables from .env file
const MongoStore = require('connect-mongo');
const session = require('express-session');
const connectDB = require('./config/db');
const departmentRoutes = require('./routes/departmentRoutes')
const serviceRoutes = require('./routes/serviceRoutes')
const positionRoutes =require ('./routes/positionRoutes')
const userRoleRoutes = require ('./routes/userRolesRoute')
const userRoutes = require('./routes/userRoutes');
const loginRoute = require('./routes/loginRoutes');
const userRequest =require('./routes/requsitionRoute');
const userProfileRoutes = require('./routes/userProfileroute')
const forwardedRequestsRouter = require('./routes/requesttodaf');
const stockRoutes = require('./routes/stockRoutes');
const stockItem = require ('./models/stockItems')
const StockHistory = require('./models/stockHistory');
const approvedRoutes= require ('./routes/requestApproved')
const logisticRequestsRoutes = require('./routes/requestOflogisticRoute')
const fuelRequisitionRoute = require('./routes/fuelRequestRoute');
const addCarReasonRoute = require ('./routes/carplaque')
const StockData = require('./models/stockData')



const app = express();
app.use(express.json()); // Or use body-parser's JSON parser
app.use(bodyParser.json()); // If using body-parser

// Allow requests from your Vercel frontend
const allowedOrigins = ['https://shyira-mis-frontend.vercel.app'];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS found'));
    }
  },
};

app.use(cors(corsOptions));

connectDB();

app.use(session({
  secret: 'shyira-mis',
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: 'mongodb+srv://fidelehirwa23:K9Z0AKzw5EHhJ6nH@cluster0.pcjespr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0' }),
  cookie: { secure: false } // Set to true in production with HTTPS
}));

//

// Serve static files from the 'uploads' directory
//app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static(path.join(__dirname, process.env.UPLOAD_PATH || 'uploads')));

app.get('/', (req, res) => {
  res.send('Static file serving test');
});


// Use auth routes
app.use('/api/departments', departmentRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/positions', positionRoutes);
app.use('/api/roles', userRoleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/profile',userProfileRoutes)
app.use('/api', loginRoute);
app.use('/api/approve', approvedRoutes);
app.use('/api/LogisticRequest', logisticRequestsRoutes);
app.use('/api/fuel-requisition', fuelRequisitionRoute);
app.use('/api/forms-data',addCarReasonRoute );


// Routes
app.use('/api/UserRequest', userRequest);


app.use('/api/forwardedrequests', forwardedRequestsRouter);

app.use('/api/stocks', stockRoutes); 

// Endpoint to handle uploaded data
app.post('/api/uploadData', async (req, res) => {
  try {
    const data = req.body;

    // Insert items in bulk
    const savedItems = await stockItem.insertMany(data);

    // Automatically create corresponding stock data for each item
    const stockDatas = savedItems.map(item => ({
      itemId: item._id,
      entry: {
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
        totalAmount: item.totalAmount
      },
      exit: {
        quantity: 0,
        pricePerUnit: 0,
        totalAmount: 0
      },
      balance: {
        quantity: item.quantity,
        pricePerUnit: item.pricePerUnit,
        totalAmount: item.totalAmount
      }
    }));

    await StockData.insertMany(stockDatas);
 // Automatically create corresponding initial stock history for each item
 const stockHistory = savedItems.map(item => ({
  itemId: item._id,
  entry: {
    quantity: item.quantity,
    pricePerUnit: item.pricePerUnit,
    totalAmount: item.totalAmount
  },
  exit: {
    quantity: 0,
    pricePerUnit: 0,
    totalAmount: 0
  },
  balance: {
    quantity: item.quantity,
    pricePerUnit: item.pricePerUnit,
    totalAmount: item.totalAmount
  }
}));

await StockHistory.insertMany(stockHistory);

    res.status(200).send({ success: true });
  } catch (error) {
    console.error(error); // Log the error
    res.status(500).send({ success: false, error: error.message });
  }
});



// Endpoint to get stock history by item ID
app.get('/api/getStockHistory/:itemId', async (req, res) => {
  try {
    const stockHistory = await StockData.find({ itemId: req.params.itemId }).populate('itemId');
    res.status(200).json(stockHistory);
  } catch (error) {
    console.error('Error fetching stock history:', error);
    res.status(500).send({ success: false, error: error.message });
  }
});


// Logout route
app.post('/api/logout', (req, res) => {
  // For JWT, the server does not handle token invalidation; it relies on the client-side to delete tokens.
  res.status(200).json({ message: 'Logged out successfully. Please delete your token on the client side.' });
});




// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Catch-all route to serve the frontend's index.html for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});



 const PORT = process.env.PORT || 5000;
 app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
 });
