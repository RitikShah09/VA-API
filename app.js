const express = require("express");
const app = express();

// app.use(express.static("client/build"));


require("dotenv").config({ path: "./.env" });

// Db Connection

require("./models/database").connectDatabase();
const cors = require("cors");
app.use(
  cors({
    origin: "https://vaidikanushthanam.com",
    credentials: true,
  })
);
app.use(express.json());

// Logger

const logger = require("morgan");
const ErrorHandler = require("./utils/errorHandler");
const { generatedErrors } = require("./middlewares/errors");

app.use(logger("tiny"));

app.use(express.urlencoded({ extended: false }));

// Session And Cookie

const session = require("express-session");
const cookieParser = require("cookie-parser");
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);

app.use(cookieParser());

// Express File Upload

const fileUpload = require("express-fileupload");
app.use(fileUpload());

app.use("/", require("./routes/indexRoutes"));
app.use("/pujari", require("./routes/pujariRoutes"));
app.use("/admin", require("./routes/adminRoutes"));
app.use("/order", require("./routes/orderRoutes"));
app.use("/puja", require("./routes/pujaRoutes"));
app.use("/category", require("./routes/categoryRoutes"));


// Error Handling
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`Requested URL Not Found}`, 404));
});

app.use(generatedErrors);

app.listen(
  process.env.PORT,
  console.log(`Server Is Running  On PORT ${process.env.PORT}`)
);
