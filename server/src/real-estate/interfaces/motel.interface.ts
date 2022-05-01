import {
    Furniture,
    OwnerType,
} from "../enum/real-estate.enum"

interface MotelAddress {
    houseNumber?: string
    showHouseNumber?: boolean
    province: string
    district: string
    ward: string
    street: string
}

export interface MotelInterface {
    title: string
    description: string
    media: {
        images: string[]
        videos: string[]
    }

    detail: {
        address: MotelAddress
        acreage: {
            totalAcreage: number
        }
        pricing: {
            total: number
            deposit?: number
        }
    }

    overview: {
        furniture?: Furniture
    }

    owner: {
        type: OwnerType
        user: any
    }

    timeStamp: Date
    actived: boolean
}