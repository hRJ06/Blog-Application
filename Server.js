const express = require('express');
const app = express();

/* Alternative of Body Parser / Middleware */
app.use(express.json());

require('dotenv').config();
const PORT = process.env.PORT || 4000;

/* Import Routes */
const blog = require('./routes/blog');

/* Mount Routes */
app.use("/api/v1",blog);

/* Connect with Database */
const connectWithdB = require('./config/database');
connectWithdB();

/* Start the server */
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})

/* Default Route */
app.get('/', (req, res) => {
    res.send('<h1>This is the Home Page</h1>')
})