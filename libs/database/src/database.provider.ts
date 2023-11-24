import { Sequelize } from 'sequelize-typescript';
import { databaseConfig } from './database.config';
import { IDatabaseConfigAttributes } from './interfaces/dbConfig.interface';
import { DEVELOPMENT, PRODUCTION, TEST } from './db.constants';
import { User } from 'apps/auth/src/user/entities/user.entity';
import { Task } from 'apps/task/src/entities/task.entity';

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
        host: 'postgres',
        port: 5432,
        username: 'postgres',
        password: 'pass',
        database: 'task_management',
        // dialectOptions: {
        //   ssl: {
        //     require: false,
        //     rejectUnauthorized: false,
        //   },
        // },
      });
      sequelize.addModels([User, Task]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
