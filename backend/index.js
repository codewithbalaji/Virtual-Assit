
const express = require("express");
const app = express();
const bodyParse = require('body-parser')
const cors = require('cors')
const AuthRouter = require("./Routes/AuthRouter")
const ProductRouter = require("./Routes/ProductRouter")
const AiRouter = require("./Routes/AiRouter")


require("dotenv").config();
require('./Models/db');
const PORT = process.env.PORT || 8080;


app.use(bodyParse.json());
app.use(cors());
app.use('/auth', AuthRouter);
app.use('/products',ProductRouter);
app.use('/ask',AiRouter);






app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
