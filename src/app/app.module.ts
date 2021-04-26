import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Order } from '../order/entities/order.entity';
import { Auth } from '../auth/entities/auth.entity';
import { UserModule } from '../user/user.module';
import { AuthModule } from '../auth/auth.module';
import { SnakeNamingStrategy } from "typeorm-naming-strategies";
import {Spec} from "../spec/entities/spec.entity";
import {Product} from "../product/entities/product.entity";
import {ProductModule} from "../product/product.module";
import {SpecModule} from "../spec/spec.module";
import {ProductImages} from "../product/entities/productImages.entity";

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [User, Auth, Order, Product, Spec, ProductImages],
      synchronize: true,
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    UserModule,
    AuthModule,
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
