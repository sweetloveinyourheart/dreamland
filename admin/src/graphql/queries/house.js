import { gql } from "@apollo/client";

export const GET_HOUSE_POSTS = gql`
query Houses($filter: HouseFilter!, $paging: PaginationArgs, $search: String) {
        houses: getAllHouses(filter: $filter, paging: $paging, search: $search) {
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
                    usedAcreage
                }
            }
            owner {
                name
                phone
            }

            internalInformation {
                certificateOfLand
                commission
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
            code
        }
    }
`

export const GET_HOUSE_BY_ID = gql`
    query House($id: String!) {
        house: getHousePostById(id: $id) {
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
            code
        }
    }
`