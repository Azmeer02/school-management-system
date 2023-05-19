/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
// import { ApiModule } from './api/api.module';
import { FooResolver } from './api/resolvers/app.resolver';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: true,
      definitions: {
        path: join(process.cwd(), 'src/graphql.ts'),
      },
    }),
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   host: process.env.PGHOST,
    //   port: parseInt(process.env.PGPORT),
    //   username: process.env.PGUSER,
    //   password: process.env.PGPASSWORD,
    //   database: process.env.PGDATABASE,
    //   entities: [__dirname + '/**/entities/*{.ts,.js}'],
    //   synchronize: true,
    // }),
  ],
  controllers: [],
  providers: [FooResolver],
})
export class AppModule {}
