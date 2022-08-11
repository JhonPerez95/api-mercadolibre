import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [ItemsController],
  imports: [CommonModule],
  providers: [ItemsService],
})
export class ItemsModule {}
