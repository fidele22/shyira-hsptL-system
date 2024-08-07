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
const userRequest =require('./routes/requsitionRoute');
const forwardedRequestsRouter = require('./routes/requesttodaf');
const stockRoutes = require('./routes/stockRoutes');
const DataModel = require ('./models/stockItems')
const approvedRoutes= require ('./routes/requestApproved')
const logisticRequestsRoutes = require('./routes/requestOflogisticRoute')
const StockData = require('./models/stockData')

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
app.use('/api/approve', approvedRoutes);
app.use('/api/LogisticRequest', logisticRequestsRoutes);



// Routes
app.use('/api/UserRequest', userRequest);


app.use('/api/forwardedrequests', forwardedRequestsRouter);

app.use('/api/stocks', stockRoutes); 


// Endpoint to handle uploaded data
app.post('/api/uploadData', async (req, res) => {
  try {
    const data = req.body;

    // Insert items in bulk
    const savedItems = await DataModel.insertMany(data);

    // Automatically create corresponding stock history for each item
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

    res.status(200).send({ success: true });
  } catch (error) {
    console.error(error); // Log the error
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
// Endpoint to update stock history entry by ID
//app.put('/api/updateStockHistory/:id', async (req, res) => {
//  try {
//    const updatedEntry = await StockData.findByIdAndUpdate(req.params.id, req.body, { new: true });
//    res.status(200).json(updatedEntry);
//  } catch (error) {
//    console.error('Error updating stock history:', error);
//    res.status(500).send({ success: false, error: error.message });
//  }
//});
//
//
//
//
//app.put('/api/updateStock/:id', async (req, res) => {
//  try {
//    const updatedStock = await StockItem.findByIdAndUpdate(req.params.id, req.body, { new: true });
//    res.json(updatedStock);
//  } catch (error) {
//    res.status(500).send(error);
//  }
//});
//

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
