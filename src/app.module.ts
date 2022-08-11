import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from './common/common.module';

@Module({
  imports: [ItemsModule, ConfigModule.forRoot(), CommonModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
