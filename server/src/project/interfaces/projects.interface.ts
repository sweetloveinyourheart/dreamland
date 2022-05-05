import { ProjectType, ProjectUtilities } from "../enum/pj.enum"

export interface AddressInterface {
    apartmentNumber?: string
    showApartmentNumber?: boolean
    province: string
    district: string
    ward: string
    street: string
}

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
            purchaseInfo: {
                price?: number
                acreage?: number
            }
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
    }
    directLink: string
    timeStamp: Date
    actived: boolean
}