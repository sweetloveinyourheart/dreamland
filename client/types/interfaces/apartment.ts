import { 
    ApartmentType, 
    Direction, 
    Furniture, 
    LegalDocuments, 
    OwnerType, 
    RealEstateCategory, 
    RealEstateStatus 
} from "../enums/realEstate"
import { ProjectInterface } from "./project"
import { RealEstateFilter } from "./realEstate"

interface Address {
    projectName?: string
    houseNumber?: string
    showHouseNumber?: boolean
    province: string
    district: string
    ward: string
    street: string
}

interface Position {
    block?: string
    floorNumber?: string
    code?: {
        value: string
        showCode?: boolean
    }
}

export interface ApartmentInterface {
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
        project?: ProjectInterface
    }

    overview: {
        status: RealEstateStatus
        type: ApartmentType
        numberOfBedrooms: number
        numberOfBathrooms?: number
        balconyDirection?: Direction
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
    directLink: string
    index: number
}

export type ApartmentFilter = RealEstateFilter & {
    type?: ApartmentType
    numberOfBedrooms?: number
    doorDirection?: Direction
    balconyDirection?: Direction
    legalDocuments?: LegalDocuments
    furniture?: Furniture
    project?: string
}