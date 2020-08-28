const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

//DB Connected
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true , useUnifiedTopology: true }, 
     () => console.log("Connected to DB"));

// Middlewares     
app.use("/api/todos", require("./routes/todos"))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Started at port ${PORT}`)
})
