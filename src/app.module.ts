import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigType } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql'
import { TypeOrmModule } from '@nestjs/typeorm'
import authConfig from './auth/config/auth.config'
import databaseConfig from './config/database.config'
import { ReceiptsModule } from './receipts/receipts.module'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, authConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (dbConfig: ConfigType<typeof databaseConfig>) => ({
        type: dbConfig.type,
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.db,
        entities: [],
        /* TODO this updates DB tables when model changes. It's advised to use
            migrations in production instead */
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [databaseConfig.KEY],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
    }),
    ReceiptsModule,
    AuthModule,
    UsersModule,
  ],
})
export class AppModule {}
