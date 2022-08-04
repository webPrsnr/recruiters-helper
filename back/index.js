require("dotenv").config();
const express = require("express");
const sequelize = require("./database/database");
const cors = require("cors");
const resumRouter = require("./routes/v1/resumeRoutes");

const PORT = 5000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1", resumRouter);

const start = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("DB is running");
    app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`));
  } catch {
    console.log(e);
  }
};

start();
