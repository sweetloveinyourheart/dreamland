import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from "mongoose"
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    @InjectModel(User.name) private userModel: Model<UserDocument>

    async createUser(user: CreateUserInput): Promise<User> {
        try {
            const salt = await bcrypt.genSalt()
            const hashed = await bcrypt.hash(user.password, salt)

            const newUser = await this.userModel.create({
                ...user,
                password: hashed,
                createdAt: new Date()
            })
            return await newUser.save()
        } catch (error) {
            throw new BadRequestException()
        }
    }

    async findOne(phone: string): Promise<User | undefined> {
        return this.userModel.findOne({ phone });
    }

}
