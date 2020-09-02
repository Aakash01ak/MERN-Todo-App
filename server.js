const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')
// const logger = require('morgan')
const app = express();

// app.use(logger('dev'));
dotenv.config();

app.use(cors())
app.use(express.json());

//DB Connected
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true }, 
     () => console.log("Connected to DB"));

// Middlewares     
app.use("/api/todos", require("./routes/todos"))
app.use("/api/user", require("./routes/auth"))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`)
})
