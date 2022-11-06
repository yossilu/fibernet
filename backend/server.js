const path = require('path');
const express = require('express');
const { errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const connectDB = require('./config/db');
const corsOptions = require('./config/corsOptions');
const port = process.env.PORT || 5000;
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

connectDB();

const app = express();


// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json 
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

app.use('/api/auth', require('./routes/userRoutes'));
app.use('/api/task', require('./routes/taskRoutes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));