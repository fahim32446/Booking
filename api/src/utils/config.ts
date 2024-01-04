// dotenv.config({ path: path.resolve(__dirname, '../../.env') });

interface Config {
  DB_PASS: string;
  DB_USER: string;
  DB_PORT: string;
  DB_HOST: string;

  JWT_SECRET: string;
  SERVER_PORT: string;
}

const config: Config = {
  DB_PASS: process.env.DB_PASS || '',
  DB_USER: process.env.DB_USER || '',
  DB_PORT: process.env.DB_PORT || '',
  DB_HOST: process.env.DB_HOST || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  SERVER_PORT: process.env.SERVER_PORT || '5000',
};

export default config;
