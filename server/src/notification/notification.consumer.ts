import { HttpService } from "@nestjs/axios";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { RealEstate } from "src/real-estate/schemas/parent-classes/general.schema";
import { Device, User } from "src/user/schemas/user.schema";

@Processor('notification-queue')
export class NotificationConsumer {
    constructor(
        private httpService: HttpService
    ) { }

    private postNameCustomize(name: string) {
        if(name.length > 30) {
            return name.slice(0, 30) + "..."
        } 

        return name
    }

    @Process('push-notification-job')
    pushNotificationJob(job: Job<{ post: RealEstate, device: Device }>) {

        // push notification
        const res = this.httpService.post(
            'https://exp.host/--/api/v2/push/send',
            {
                to: job.data.device.expoPushToken,
                sound: 'default',
                title: 'Trạng thái bất động sản 🏣',
                body: `Đã xác nhận giao dịch với "${this.postNameCustomize(job.data.post.title)}"`,
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
    globalPushJob(job: Job<{ post: RealEstate, users: User[] }>) {
        job.data.users.forEach((user) => {
            if (user.device) {
                // push notification
                const res = this.httpService.post(
                    'https://exp.host/--/api/v2/push/send',
                    {
                        to: user.device.expoPushToken,
                        sound: 'default',
                        title: 'Giao dịch thành công 🏣',
                        body: `Chúc mừng bất động sản "${this.postNameCustomize(job.data.post.title)}" đã hoàn tất giao dịch`,
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