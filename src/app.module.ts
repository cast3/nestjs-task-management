import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'task_management',
      autoLoadEntities: true,

      synchronize: false,
      migrationsRun: true,
      migrations: [__dirname + '/migration/**/*{.js,.ts}'],
      migrationsTransactionMode: 'all',
    }),
  ],
})
export class AppModule {}
