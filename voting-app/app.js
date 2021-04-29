const express = require('express');
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose');

const app = express();
//DB Configuration
const db = require('./config/keys').MongoURI;
//Connect to MongoDB
mongoose.connect(db, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => console.log("Connected to db"))
.catch( err => console.log(err));
//EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

//Body Parser
app.use(express.urlencoded({extended: false}));

//Routes
app.use('/',require('./routes/index'));
app.use('/users',require('./routes/users'));
app.use('/vote',require('./routes/vote'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on ${PORT}`));