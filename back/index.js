require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const sequelize = require("./database/database");
const resumRouter = require("./routes/v1/resumeRoutes");
const userRouter = require("./routes/v1/userRoutes");
const errorMiddleware = require("./middlewares/error-middleware");

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1", resumRouter);
app.use("/api/v1", userRouter);

app.use(errorMiddleware);

const start = () => {
  sequelize.sync().then(() => {
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  });
};

start();
