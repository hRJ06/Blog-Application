const mongoose = require('mongoose');
require('dotenv').config();

const connectWithdB = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log('Connected to database'))
    .catch((err) => {
        console.log('Error connecting to database');
        console.log(err);
        process.exit(1);
    });
}
module.exports = connectWithdB;