import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { IDatabaseConfigAttributes } from './interfaces/dbConfig.interface';
import { DEVELOPMENT, PRODUCTION, TEST } from './db.constants';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      let config: IDatabaseConfigAttributes;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = databaseConfig.development;
          break;
        case TEST:
          config = databaseConfig.test;
          break;
        case PRODUCTION:
          config = databaseConfig.production;
          break;
        default:
          config = databaseConfig.development;
      }

      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: config.host,
        port: Number(config.port),
        username: config.username,
        password: config.password,
        database: config.database,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });
      sequelize.addModels([]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
