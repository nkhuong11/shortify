const express = require('express');
const MongoClient = require('mongodb').MongoClient;
// const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const authenticateRoutes = require('./routes/authenticate');
const servicesRoutes = require('./routes/servicesRoutes');

mongoose.connect(keys.mongoURI, { 
    useCreateIndex: true,
    useNewUrlParser: true 
  }).then(
    () => {console.log('Database is connected!') },
    err => { console.log('Cannot connect to the database: '+ err)}
);

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ROUTES
app.use('/api/user', authenticateRoutes)
app.use('/api/services/', servicesRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
});