const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/connectDB');
const postRouter = require('./router/post.route')
//? Middleware
app.use(bodyParser.json({limit: '30mb', extended: true}));
app.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
app.use(cors());

//? Routes
app.use('/post', postRouter);


// Start server
app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running at http://localhost:${PORT}`);
});
