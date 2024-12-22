import cookieParser from 'cookie-parser';
config();
import express from 'express';
import { config } from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import errorMiddleware from './middlewares/error.middleware.js';
import path from 'path'
const app = express();

// Middlewares
// Built-In
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Third-Party
//additional settings

const _dirname = path.resolve()
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://lms-production-ready-3.onrender.com'); // Allow requests from http://localhost:5174
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});
app.use(
  cors({
    origin: "https://lms-production-ready-3.onrender.com",
    credentials: true,
  })
);


app.use(express.static(path.join(_dirname, '/client/dist')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
})
app.use(morgan('dev'));
app.use(cookieParser());

// Server Status Check Route
app.get('/ping', (_req, res) => {
  res.send('Pong');
});

// Import all routes
import userRoutes from './routes/user.routes.js';
import courseRoutes from './routes/course.routes.js';
import paymentRoutes from './routes/payment.routes.js';
import miscRoutes from './routes/miscellaneous.routes.js';

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1', miscRoutes);

// Default catch all route - 404
app.all('*', (_req, res) => {
  res.status(404).send('OOPS!!! 404 Page Not Found');
});

// Custom error handling middleware
app.use(errorMiddleware);

export default app;
