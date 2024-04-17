import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const connectDataBase = async () => {
	try {
		await mongoose.connect(process.env.MongoDbUrl);
		console.log('Connected To DataBase');
	} catch (error) {
		console.log(error);
		throw new Error('Data Base Connection Failed');
	}
};

export default connectDataBase;
