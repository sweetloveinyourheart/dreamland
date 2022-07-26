import { InjectQueue } from '@nestjs/bull';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Queue } from 'bull';
import { RealEstate } from 'src/real-estate/schemas/parent-classes/general.schema';
import { Device } from 'src/user/schemas/user.schema';
import { UserService } from 'src/user/user.service';

@Injectable()
export class NotificationService {
    constructor(
        @InjectQueue('notification-queue') private queue: Queue,
        private userService: UserService
    ) { }

    async pushNotification(post: RealEstate, device: Device): Promise<{ success: boolean }> {
        try {
            await this.queue.add('push-notification-job', { post, device });

            return {
                success: true
            }
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async globalPush(post: RealEstate) {
        try {
            const users = await this.userService.getUsers()
            await this.queue.add('global-push-job', { post, users });

            return {
                success: true
            }
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
