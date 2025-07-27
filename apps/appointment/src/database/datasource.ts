import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5433', 10),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'appointment_db',
  entities: [__dirname + '/../**/*.model{.ts,.js}'],
  synchronize: process.env.NODE_ENV === 'local',
  logging: false,
  migrationsRun: process.env.NODE_ENV !== 'production',
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  ssl: false,
});
