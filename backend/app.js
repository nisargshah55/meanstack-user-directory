let express = require('express'),
  path = require('path'),
  mongoose = require('mongoose'),
  cors = require('cors'),
  bodyParser = require('body-parser'),
  dataBaseConfig = require('./database/db'),
  createError = require('http-errors');
  session = require('express-session'),
  MongoDBStore = require('connect-mongodb-session')(session)

// Connecting mongoDB
mongoose.Promise = global.Promise;
mongoose.connect(dataBaseConfig.db, {
  useNewUrlParser: true
}).then(() => {
    console.log('Database connected sucessfully ')
  },
  error => {
    console.log('Could not connected to database : ' + error)
  }
)

let store = new MongoDBStore({
  uri: "mongodb://localhost:27017/user_directory",
  collection: 'login_session'
});

// Set up express js port
const userRoute = require('./routes/user.route');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cors());
app.use(express.static(path.join(__dirname, 'dist/meanstack-user-directory')));
app.use('/', express.static(path.join(__dirname, 'dist/meanstack-user-directory')));
app.use(
  session({
      secret: 'test_sess_secret_key',
      resave: true,
      saveUninitialized: true,
      store: store
  })
);
app.use('/api', userRoute);

store.on('error', function(req, res) {
  console.log("error");
});

// Create port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log('Connected to port ' + port)
})

// Find 404 and hand over to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});