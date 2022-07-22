import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { NotificationConsumer } from './notification.consumer';

@Module({
  imports: [
    HttpModule, 
    BullModule.registerQueue({ name: "notification-queue" })
  ],
  providers: [NotificationService, NotificationConsumer]
})
export class NotificationModule {}
