require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const userRouter = require("./routes/user-routes");
const blogRouter = require('./routes/blog-routes');

const app = express()
app.use(express.json())

app.use('/api/user', userRouter)
app.use('/api/blog', blogRouter)




const port = process.env.PORT || 3000;

// connect to database
mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Database connection is ready.....");
}).catch(err => console.log(err))

// app listen
app.listen(port, () => console.log(`Server is running on port ${port}...`))