import {
    Direction,
    LandType,
    LegalDocuments,
    OwnerType,
    RealEstateCategory
} from "../enum/real-estate.enum"

interface LandAddress {
    projectName?: string
    houseNumber?: string
    showHouseNumber?: boolean
    province: string
    district: string
    ward: string
    street: string
}

interface LandPosition {
    blockName?:  string
    code?: {
        value: string
        showCode?: boolean
    }
}

export interface LandInterface {
    title: string
    description: string
    category: RealEstateCategory

    media: {
        images: string[]
        videos: string[]
    }

    detail: {
        position: LandPosition
        address: LandAddress
        acreage: {
            totalAcreage: number
            height?: number
            width?: number
        }
        pricing: {
            total: number
            deposit?: number
        }
    }

    overview: {
        type: LandType
        landDirection?: Direction
        legalDocuments?: LegalDocuments
        frontispiece?: boolean
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