const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/taskRoutes');
const authRoutes = require('./routes/authRoutes');
const requestRoute = require('./routes/request')
const oauth = require('./routes/oauth')

dotenv.config();
const app = express();

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
  }));

app.use(express.json());
app.options('*', cors());
app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error(err));

// Routes

app.use('/oauth' , oauth);
app.use('/request' , requestRoute);
app.use('/api/tasks', taskRoutes);
app.use('/api/auth', authRoutes);
app.get('/' ,(req , res)=>{
    
    res.send("Hello world Backend is runing");
} )

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
