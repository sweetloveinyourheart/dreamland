import { gql } from "@apollo/client";

export const GET_USERS = gql`
    query ($paging: FindUserInput!) {
        users: getUsers(paging: $paging) {
            phone
            name
            address
            birthday
            sex
            createdAt
            roles
        }
    }
`

export const GET_PENDING_POST = gql`
    query ($category: RealEstateCategory!) {
        motals: getAllMotals(filter: { category: $category }, pending: true) {
            _id
            title
            description
            category
            media {
                images
                videos
            }
            detail {
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                    showHouseNumber
                }
                pricing {
                    total
                    deposit
                }
                acreage {
                    totalAcreage
                }
            }
            owner {
                name
                phone
            }
            overview {
                doorDirection
                legalDocuments
                furniture
                numberOfFloors
            }
            virtual3DLink
            googleMapsLink
            outstanding
            postStatus
        }

        lands: getAllLands(filter: { category: $category }, pending: true) {
            _id
            title
            description
            category
            media {
                images
                videos
            }
            detail {
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                    showHouseNumber
                }
                pricing {
                    total
                    deposit
                }
                acreage {
                    totalAcreage
                    width
                    height
                }
            }
            owner {
                name
                phone
            }
            overview {
                doorDirection
                legalDocuments
                type
                carAlley
              	noHau
              	frontispiece
            }
            outstanding
            virtual3DLink
            googleMapsLink
            postStatus
        }

        houses: getAllHouses(filter: { category: $category }, pending: true) {
            _id
            title
            description
            category
            media {
                images
                videos
            }
            detail {
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                    showHouseNumber
                }
                pricing {
                    total
                    deposit
                }
                acreage {
                    totalAcreage
                }
            }
            owner {
                name
                phone
            }
            overview {
                doorDirection
                legalDocuments
                type
                numberOfBedrooms
                numberOfBathrooms
                furniture
                numberOfFloors
            }
            virtual3DLink
            googleMapsLink
            outstanding
            postStatus
        }

        businessPremises: getAllBusinessPremises(filter: { category: $category }, pending: true) {
            _id
            title
            description
            category
            media {
                images
                videos
            }
            detail {
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                    showHouseNumber
                }
                pricing {
                    total
                }
                acreage {
                    totalAcreage
                }
            }
            owner {
                name
                phone
            }
            overview {
                doorDirection
                legalDocuments
                type
                furniture
            }
            virtual3DLink
            googleMapsLink
            postStatus
            outstanding
        }

        apartments: getAllApartments(filter: { category: $category }, pending: true) {
            _id
            title
            description
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                    deposit
                }
                position {
                    code {
                        value
                    }
                    blockName
                    floorNumber
                }
                address {
                    province
                    district
                    ward
                    street
                    houseNumber
                }
            }
            
            owner {
                type
                user {
                    phone
                    name
                }
            }
        
            overview {
                doorDirection
                legalDocuments
                type
                status
                numberOfBathrooms
                furniture
                balconyDirection
                numberOfBedrooms
            }

            category
            virtual3DLink
            googleMapsLink
            outstanding
            postStatus
        }
    }
`