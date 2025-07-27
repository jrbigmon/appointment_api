import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5433', 10),
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || 'postgres',
          database: process.env.DB_NAME || 'appointment_db',
          synchronize: process.env.NODE_ENV === 'local',
          migrationsRun: process.env.NODE_ENV !== 'production',
          entities: [__dirname + '/../**/*.model{.ts,.js}'],
          migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
          ssl: false,
          logging: false,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
