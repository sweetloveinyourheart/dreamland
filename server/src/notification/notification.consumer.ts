import { HttpService } from "@nestjs/axios";
import { Process, Processor } from "@nestjs/bull";
import { Job } from "bull";
import { Device } from "src/user/schemas/user.schema";
 
@Processor('notification-queue')
export class NotificationConsumer {
    constructor(
        private httpService: HttpService
    ) { }
 
    @Process('push-notification-job')
    readOperationJob(job:Job<Device>){ 

        // push notification
        const res = this.httpService.post(
            'https://exp.host/--/api/v2/push/send',
            {
                to: job.data.expoPushToken,
                sound: 'default',
                title: 'Thông báo bất động sản 🏣',
                body: 'Bàn giao bất động sản thành công, cảm ơn bạn đã đồng hành cùng Điền Khôi Land !',
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
}