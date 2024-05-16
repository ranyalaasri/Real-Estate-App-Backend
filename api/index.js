//packs
const express = require("express");
const server = express();
require("dotenv").config();
const { default: mongoose } = require("mongoose");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const cors = require("cors");
const {getLogin} = require ("./controllers/auth.Controllers")
//necessary functions import

const { limiter } = require("./middlewares/rateLimit");

//use of packs
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
var corsOptions = {
  origin: true,
  credentials: true,
};
server.use(cors(corsOptions));

server.post("/users/auth/login", (req, res) => {
  getLogin()
  console.log('entered');
})

server.options("/users/auth/login", cors());

// Helmet middleware for securing HTTP headers
server.use(helmet());

// Compression middleware to compress responses
server.use(compression());

// Apply rate limiter to all requests
server.use(limiter);

//

//importing routes
const AuthRoute = require("./routes/auth.Routes");
const UserRoute = require("./routes/user.Routes");
const ReviewRoute = require("./routes/Review.Routes");
const ListingRoute = require("./routes/listing.Routes");
const bookingRoute = require("./routes/booking.Routes");
const AgencyRoute = require("./routes/Agency.Routes");

//using routes
server.use("/users/auth", AuthRoute);
server.use("/users", UserRoute);
server.use("/reviews", ReviewRoute);
server.use("/listings", ListingRoute);
server.use("/booking", bookingRoute);
// server.use('/agency', AgencyRoute)

// Import the database connection function and execute it
const { connection } = require("./config/database");
// const { getLogin } = require("./controllers/auth.Controllers");
const database = connection();

// Connect to the MongoDB database
database.connectToMongo();

//listening on chosen port
const port = process.env.PORT;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
