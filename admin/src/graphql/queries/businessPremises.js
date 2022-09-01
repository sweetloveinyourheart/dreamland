import { gql } from "@apollo/client";

export const GET_BUSINESS_PREMISES_POSTS = gql`
query BusinessPremises($filter: BusinessPremisesFilter!, $paging: PaginationArgs, $search: String) {
        businessPremises: getAllBusinessPremises(filter: $filter, paging: $paging, search: $search) {
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

            internalInformation {
                certificateOfLand
                commission
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
            code
        }
    }
`

export const GET_BUSINESS_PREMISES_BY_ID = gql`
    query BusinessPremises($id: String!) {
        businessPremises: getBusinessPremisesPostById(id: $id) {
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
            code
        }
    }
`