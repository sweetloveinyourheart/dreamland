import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bull';
import { NotificationConsumer } from './notification.consumer';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    UserModule,
    HttpModule,
    BullModule.registerQueue({
      name: "notification-queue"
    })
  ],
  providers: [NotificationService, NotificationConsumer],
  exports: [NotificationService]
})
export class NotificationModule { }
