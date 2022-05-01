import { 
    ApartmentType, 
    Direction, 
    Furniture, 
    LegalDocuments, 
    OwnerType, 
    RealEstateCategory, 
    RealEstateStatus 
} from "../enum/real-estate.enum"

export interface Address {
    projectName?: string
    apartmentNumber?: string
    showApartmentNumber?: boolean
    province: string
    district: string
    ward: string
    street: string
}

export interface Position {
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
        acreage: number
        pricing: {
            total: number
            deposit?: number
        }
    }

    overview: {
        status: RealEstateStatus
        type: ApartmentType
        numberOfBedroom: number
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
}