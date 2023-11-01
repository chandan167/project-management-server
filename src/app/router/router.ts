import { Router } from 'express';
import { groupRoute } from '../../utils/helper';
import { userRoutes } from './user.router';


export const router = Router();

router.use('/api/v1', groupRoute(router =>{
	router.use(userRoutes);
}));