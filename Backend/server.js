import authRoutes from './routes/authRoutes.js';
import connectDataBase from './db/dataBaseConnection.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import messageroute from './routes/messageRoute.js';
import userRoute from './routes/userRoutes.js';
import { app, server } from './socket/socket.io.js';

dotenv.config();
const Port = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/messages', messageroute);
app.use('/api/users', userRoute);

server.listen(Port, () => {
	connectDataBase();
	console.log(`Server Started at http://localhost:${Port}`);
});
