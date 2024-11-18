const express = require('express');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const dotenv = require('dotenv');
const cors = require('cors')

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors())

app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

module.exports = app;
