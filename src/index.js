const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/products');
const cors = require('cors');
var multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 9000;

// middleware
app.use(express.json());
app.use(cors());
app.use('/api', router);


// routes
app.get('/', (req, res) => {
    res.send('Welcome to my API');
});


// mongodb connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch(err => {
        console.error(err);
    });

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto: ${PORT}`);
})