const express = require("express");
const cors = require("cors");

const controllers = require("./controllers");
const middlewares = require("./middlewares");
const { PORT } = require("./config");

const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// Controllers
controllers(app);

app.listen(PORT, console.log(`Running on port ${PORT}`));
