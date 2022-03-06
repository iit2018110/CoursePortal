const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./utils/database/config')
const db = require('./utils/database/db');

const app = express();

app.use(bodyParser.json());
app.use(cors({origin: 'http://localhost:4200'}))

sequelize.sync()
.then(()=> {
    console.log("Database connected successfully!!")
})
.catch((err)=>{
    console.log("Unable to connect database", err);
})

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("server is listening on ", PORT);
})