const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const keys = require('./config/keys');

const authenticateRoutes = require('./routes/authenticate');
const servicesRoutes = require('./routes/servicesRoutes');
const redirectMiddleware = require('./middlewares/redirectMiddleware');
const authorizeMiddleware = require('./middlewares/authorizeMiddleware');

mongoose.connect(keys.mongoURI, { 
    useCreateIndex: true,
    useNewUrlParser: true 
  }).then(
    () => {console.log('Database is connected!') },
    err => { console.log('Cannot connect to the database: '+ err)}
);

const app = express();


app.use(cors());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(authorizeMiddleware);

// ROUTES
app.use('/', redirectMiddleware);
app.use('/api/user', authenticateRoutes);
app.use('/api/services/', servicesRoutes);

if(process.env.NODE_ENV === 'production') {
  const path = require('path');
  //Express will server up production assets like main.js, main.css file
  app.use(express.static(path.join(__dirname, 'client/build')));
  //Express will server index.html file if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname+'/client/build/index.html'));
  });
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`)
});