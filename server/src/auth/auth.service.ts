import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { Login } from './models/auth.model';
import { User } from 'src/user/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from 'src/user/enum/user.enum';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async validateUser(phone: string, pass: string): Promise<any> {
        const user = await this.userService.findOne(phone);
        if (!user) return null

        const passwordChecking = await bcrypt.compare(pass, user.password)

        if (passwordChecking) {
            return user;
        }
        return null;
    }

    async login(user: User & { _id: string }): Promise<Login> {
        try {
            const jwtPayload = {
                phone: user.phone,
                sub: user._id,
                roles: user.roles
            }

            return {
                accessToken: await this.jwtService.sign(jwtPayload, { expiresIn: "1h" }),
                refreshToken:  await this.jwtService.sign(jwtPayload, { expiresIn: "7d", secret: process.env.REFRESH_TOKEN_SECRET })
            }
        } catch (error) {
            throw new UnauthorizedException()
        }
    }

    async adminLogin(user: User & { _id: string }): Promise<Login> {
        try {
            if(!user.roles.includes(UserRole.Admin))
                throw new Error('Forbidden resource !')

            const jwtPayload = {
                phone: user.phone,
                sub: user._id,
                roles: user.roles
            }

            return {
                accessToken: await this.jwtService.sign(jwtPayload, { expiresIn: "1h" }),
                refreshToken: ""
            }
        } catch (error) {
            throw new UnauthorizedException()
        }
    }

}
