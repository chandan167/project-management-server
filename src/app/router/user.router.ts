import { Router } from 'express';
import { asyncResolver, groupRoute } from '../../utils/helper';
import { authController } from '../controller/user/auth.controller';
import { Validate } from '../../utils/validate';
import { authValidation } from '../validation/user/auth.validation';
import { authMiddleware } from '../middleware/user/auth.middleware';

export const userRoutes = Router();


userRoutes.use('/user/auth', groupRoute(router => {

	router.post('/sign-up',
		Validate.body(authValidation.signUpSchema),
		asyncResolver(authController.signUpHandler)
	);

	router.post('/sign-in',
		Validate.body(authValidation.signInSchema),
		asyncResolver(authController.signInHandler)
	);

	router.get('/profile',
		authMiddleware.checkUserLogin(),
		asyncResolver(authController.profileHandler)
	);

	router.put('/profile',
		authMiddleware.checkUserLogin(),
		Validate.body(authValidation.updateProfileSchema),
		asyncResolver(authController.updateProfileHandler)
	);
    
}));