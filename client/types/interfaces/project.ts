import { ProjectType, ProjectUtilities } from "../enums/project"
import { AddressInterface } from "./realEstate"

export interface ProjectInterface {
    _id?: string
    media: {
        images: string[]
    }
    projectName: string
    address: AddressInterface
    information: {
        purchaseInfo: {
            price?: number
            acreage?: number
        }
        rentInfo: {
            price?: number
            acreage?: number
        }
        startedAt?: string
        handOverYear?: number
        investorName: string
        type: ProjectType
        acreage?: number
        scale?: string
        progressStatus?: string
        status?: string
    }
    utilities: ProjectUtilities[]
    description: string
    investor: {
        logo: string
        name: string
        establishYear: number
        about: string
    }
    progress: {
        image: string
        title: string
    }
    masterPlan: {
        image: string
        title: string
    }[]
    directLink: string
    timeStamp: Date
    actived: boolean
}