import {
    Direction,
    Furniture,
    HouseType,
    LegalDocuments,
    OwnerType,
    RealEstateCategory
} from "../enum/real-estate.enum"

interface HouseAddress {
    projectName?: string
    houseNumber?: string
    showHouseNumber?: boolean
    province: string
    district: string
    ward: string
    street: string
}

interface HousePosition {
    blockName?:  string
    code?: {
        value: string
        showCode?: boolean
    }
}

export interface HouseInterface {
    title: string
    description: string
    category: RealEstateCategory

    media: {
        images: string[]
        videos: string[]
    }

    detail: {
        position: HousePosition
        address: HouseAddress
        acreage: {
            totalAcreage: number
            usedAcreage?: number
            height?: number
            width?: number
        }
        pricing: {
            total: number
            deposit?: number
        }
    }

    overview: {
        type: HouseType
        numberOfBedroom: number
        numberOfBathrooms?: number
        numberOfFloors?: number
        doorDirection?: Direction
        legalDocuments?: LegalDocuments
        furniture?: Furniture
        carAlley?: boolean
        noHau?: boolean
    }

    owner: {
        type: OwnerType
        user: any
    }

    timeStamp: Date
    actived: boolean
}