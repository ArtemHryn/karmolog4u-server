const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { errorHandler } = require("./helpers/apiHelpers");
const swagger = require("./helpers/swagger");
const cookieParser = require("cookie-parser");

// routers
const authRouter = require("./routes/api/authRouter");
const userRouter = require("./routes/api/userRouter");
const educationRouter = require("./routes/api/educationRoute");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(cookieParser());
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// custom APIs
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/education", educationRouter);

// swagger doc
app.use("/api-docs", swagger);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use(errorHandler);

module.exports = app;
