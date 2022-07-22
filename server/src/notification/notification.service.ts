import { HttpService } from '@nestjs/axios';
import { InjectQueue } from '@nestjs/bull';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Queue } from 'bull';
import { Device } from 'src/user/schemas/user.schema';

@Injectable()
export class NotificationService {
    constructor(
        @InjectQueue('notification-queue') private queue: Queue
    ) { }

    async pushNotification(device: Device): Promise<{ success: boolean }> {
        try {
            await this.queue.add('push-notification-job', device);

            return {
                success: true
            }
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
