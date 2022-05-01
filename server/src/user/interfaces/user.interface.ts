import { Sex, UserRole } from "../enum/user.enum"

export interface UserInterface {
    phone: string
    email?: string
    password: string
    name: {
        firstName: string
        lastName: string
        fullName: string
    }
    avatar?: string
    birthday?: Date
    sex?: Sex
    address: string
    createdAt: Date
    roles: UserRole[]
    actived: boolean
}