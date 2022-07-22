import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { Model } from "mongoose"
import { CreateUserInput } from './dto/create-user.input';
import * as bcrypt from 'bcrypt';
import { FindUserInput } from './dto/find-user.input';
import { Profile } from './models/user.model';
import { UserPayload } from 'src/auth/decorators/user.decorator';
import { UpdateDevice } from './dto/update-user.input';

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

    async findById(id: string): Promise<User | undefined> {
        return this.userModel.findById(id)
    }

    async getUsers(paging: FindUserInput): Promise<User[]> {
        try {
            const result = await this.userModel
                .find({ actived: true, roles: { $not: { $in: ["admin"] } } })
                .select({ password: 0 })
                .skip(paging.cursor)
                .limit(paging.limit)
                .sort({ createdAt: -1 })

            return result
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async getProfile(user: UserPayload): Promise<Profile> {
        try {
            return await this.userModel.findById(user.userId)
        } catch (error) {
            throw new NotFoundException()
        }
    }

    async updateDevice(id: string, device: UpdateDevice) {
        try {
            await this.userModel.findByIdAndUpdate(id, { device })
        } catch (error) {
            return;
        }
    }
}   
