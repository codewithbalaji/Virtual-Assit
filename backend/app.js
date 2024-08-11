const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
