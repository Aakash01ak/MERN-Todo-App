const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();

const app = express();

app.use(cors())
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
