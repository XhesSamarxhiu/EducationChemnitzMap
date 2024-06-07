import express from "express";
import mongoose from 'mongoose';
import schoolRoutes from './routes/schoolRoute.js';
import kindergardenRoutes from './routes/kindergardenRoute.js';
import socialChildProjectRoutes from './routes/socialChildProjectRoute.js'; 
import socialTeenProjectRoutes from './routes/socialTeenProjectRoute.js';
import userRoutes from './routes/userRoute.js';
import cors from 'cors';

const app = express();

//Middleware for handling CORS Policy
app.use(cors({ origin: 'http://localhost:5173',
methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization']}));

//Middleware for parsing request body
app.use(express.json());

// Import Schools, Kindergarden, Social Child Project, Teen Projects routes
app.use('/schools', schoolRoutes);
app.use('/kindergardens', kindergardenRoutes);
app.use('/socialChildProjects', socialChildProjectRoutes);
app.use('/socialTeenProjects', socialTeenProjectRoutes);

// Import User route
app.use('/users', userRoutes);


//Database connection 
mongoose.connect('mongodb+srv://samarxhiuxhesika:Xhesika1999.@cluster0.vxfzavg.mongodb.net/ChemnitzEducation',)
.then(() => console.log('MongoDB connected'))
.catch((err) => console.log(err));

// Server running
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});