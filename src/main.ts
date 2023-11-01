import { application } from './application';
import { environment } from './config/env';
import { dbConnect } from './database';
import { logger } from './utils/logger';

const port = environment.PORT;
const node_env = environment.NODE_ENV;

application.listen(port, () => {
	dbConnect();
	logger.info('=================================');
	logger.info(`======= ENV: ${node_env} ========`);
	logger.info(`🚀 App listening on the port ${port}`);
	logger.info('=================================');
});