var mongoose = require('mongoose');
const dotenv = require('dotenv'); dotenv.config();
mongoose.connect(process.env.LOCAL_URL);