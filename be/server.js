const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = require("./app");
dotenv.config({ path: "./config.env" });
mongoose.connect(process.env.DB).then(() => console.log("Connect successfull"));
const port = process.env.PORT || 3000;
const server = app.listen(port, () =>
  console.log("App is listening at port 3000")
);
