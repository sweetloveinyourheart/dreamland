import { HttpService } from "@nestjs/axios";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { RealEstate } from "src/real-estate/schemas/parent-classes/general.schema";
import { Device, User } from "src/user/schemas/user.schema";
import { PushData } from "./classes/notification.class";

@Processor('notification-queue')
export class NotificationConsumer {
    constructor(
        private httpService: HttpService
    ) { }

    

    @Process('push-notification-job')
    pushNotificationJob(job: Job<{ data: PushData, device: Device }>) {

        // push notification
        const res = this.httpService.post(
            'https://exp.host/--/api/v2/push/send',
            {
                to: job.data.device.expoPushToken,
                sound: 'default',
                title: job.data.data.title,
                body: job.data.data.body,
            },
            {
                headers: {
                    'content-type': 'application/json',
                    'host': 'exp.host',
                    'accept': 'application/json',
                    'accept-encoding': 'gzip, deflate'
                }
            }
        )
        res.subscribe()
    }

    @Process('global-push-job')
    globalPushJob(job: Job<{ data: PushData, users: User[] }>) {
        job.data.users.forEach((user) => {
            if (user.device) {
                // push notification
                const res = this.httpService.post(
                    'https://exp.host/--/api/v2/push/send',
                    {
                        to: user.device.expoPushToken,
                        sound: 'default',
                        title: job.data.data.title,
                        body: job.data.data.body,
                    },
                    {
                        headers: {
                            'content-type': 'application/json',
                            'host': 'exp.host',
                            'accept': 'application/json',
                            'accept-encoding': 'gzip, deflate'
                        }
                    }
                )
                res.subscribe()
            }
        })
    }
}