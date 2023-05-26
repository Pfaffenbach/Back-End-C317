const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

require("../port/func_api")(app);
require("../port/user_api")(app);

module.exports = app;
