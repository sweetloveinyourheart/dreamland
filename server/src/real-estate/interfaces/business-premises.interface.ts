import {
    BusinessPremisesType,
    Direction,
    Furniture,
    LegalDocuments,
    OwnerType,
    RealEstateCategory
} from "../enum/real-estate.enum"
import { Address, Position } from "./apartment.interface"

export interface BusinessPremisesInterface {
    title: string
    description: string
    category: RealEstateCategory

    media: {
        images: string[]
        videos: string[]
    }

    detail: {
        position: Position
        address: Address
        acreage: {
            totalAcreage: number
        }
        pricing: {
            total: number
            deposit?: number
        }
    }

    overview: {
        type: BusinessPremisesType
        doorDirection?: Direction
        legalDocuments?: LegalDocuments
        furniture?: Furniture
    }

    owner: {
        type: OwnerType
        user: any
    }

    timeStamp: Date
    actived: boolean
}