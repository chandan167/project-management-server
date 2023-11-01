import { config } from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

config();

export const environment = cleanEnv(process.env, {
	NODE_ENV: str({ default: 'development', choices: ['development', 'production', 'test', 'staging'] }),
	PORT: num({ default: 5000 }),
	APP_NAME: str({ default: 'Project Management' }),
	LOG_DIR: str({default: 'logs'}),
	MONGO_URI: str(),
	PASSWORD_SALT: num({default: 10}),
	JWT_AUTH_TOKEN_EXPIRY_TIME: str({default: '10d'}),
	JWT_REFRESH_TOKEN_EXPIRY_TIME: str({default: '100d'}),
});

