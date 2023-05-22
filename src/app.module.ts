import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ReceiptsModule } from './receipts/receipts.module'

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    TypeOrmModule.forRoot({
      // TODO move to Config
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'yoru',
      entities: [],
      /* TODO this updates DB tables when model changes. It's advised to use
          migrations in production instead */
      synchronize: true,
      autoLoadEntities: true,
    }),
    ReceiptsModule,
  ],
})
export class AppModule {}
