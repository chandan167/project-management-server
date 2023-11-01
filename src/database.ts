import { connect, set } from 'mongoose';
import { environment } from './config/env';
import { logger } from './utils/logger';



export const dbConnect = () =>{
	if(environment.isDev || environment.isTest) set('debug', true);
	connect(environment.MONGO_URI).then(() => logger.info('Database connected'))
		.catch(error => logger.error(error));
};