const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const sequelize = require('./utils/database/config')
const db = require('./utils/database/db');

const elective = require('./routes/elective');
const project  = require('./routes/project');
const admin = require('./routes/admin');
const core = require('./routes/core');
const jwt_route = require('./routes/token');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/elective', elective);
app.use('/project', project);
app.use('/admin', admin);
app.use('/core', core);
app.use('/jwt', jwt_route);

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