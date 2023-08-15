const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const path = require('path'); // Import the 'path' module

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://127.0.0.1:27017/loginform', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const UserSchema = new mongoose.Schema({
  userId: String,
  password: String,
});


const customerSchema = new mongoose.Schema({
  customerId: Number,
  name: String,
  age: Number,
  dob: String,
  address: String,
  typeOfBusiness: String,
  dateOfRegistered: String,
  mobileNum: Number,
  accountType: String,
  accountNum: Number,
  accountBalance: Number,
  fdLink: String,
  totalBalance: String,
  nomination: String,
  transactions: [{
    date: String,
    description: String,
    ref: Number,
    withdrawals: Number,
    deposits: Number,
    balance: Number
  }]
});

const User = mongoose.model('User', UserSchema);
const customerDetails = mongoose.model("customerDetails", customerSchema);

const firstCustomer = new customerDetails({
  customerId: 4444,
  name: "Suganthan S",
  age: 19,
  dob: "11/07/2004",
  address: "Chennai, 600119",
  typeOfBusiness: "Transport Business",
  dateOfRegistered: "11/11/2011",
  mobileNum: 9486507050,
  accountType: "Saving Account",
  accountBalance: 50000,
  fdLink: "SB-578483787",
  totalBalance: 1000000,
  nomination: "Vithya S",
  transactions: [{
    date: "11/07/2023",
    description: "Purchase",
    ref: 2345634,
    withdrawals: 200,
    balance: 500
  },{
    date: "13/07/2023",
    description: "For Friend",
    ref: 2345635,
    withdrawals: 300,
    balance: 200
  }]
});
// firstCustomer.save();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

app.post('/login', async (req, res) => {
  const userId = req.body.userId;
  const password = req.body.password;
  try {
    console.log(`Searching for user with userId: ${userId} and password: ${password}`);
    const user = await User.findOne({ userId, password });
    console.log(`Found user:`, user);
    if (user) {
      res.sendFile(path.join(__dirname, 'public/customerId.html'));
    } else {
      res.sendFile(path.join(__dirname, 'public/invalidCredentials.html'));
    }
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

app.post("/customerId", async (req, res) => {
  const customerId = req.body.customerId;
  try {
    console.log(`Searching for user with customerId: ${customerId}`);
    const user = await customerDetails.findOne({ customerId });
    console.log(`Found user:`, user);
    if (user) {
      // res.sendFile(path.join(__dirname, 'public/customerId.html'));
      res.render('dashboard.ejs', { user });
    } else {
      res.sendFile(path.join(__dirname, 'public/invalidCredentials.html'));
    }
  } catch (error) {
    res.send("server error");
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
