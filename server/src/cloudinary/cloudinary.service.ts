import { Injectable } from '@nestjs/common';
import { v2 } from 'cloudinary';

@Injectable()
export class CloudinaryService {
    async removeFile(url: string) {
        try {
            const getPublicId = (imageURL) => {
                let splitted = imageURL.split("/");
                const fileName = splitted.pop().split(".")[0]
                const folderName = splitted.pop()
                return folderName + "/" + fileName
            }
            const publicId = getPublicId(url)

            await v2.uploader.destroy(publicId)
            return;
        } catch (error) {
            return;
        }
    }
}