import { gql } from "@apollo/client";

export const GET_MOTAL_POSTS = gql`
    query Motals($filter: MotalFilter!, $paging: PaginationArgs, $search: String) {
        motals: getAllMotals(filter: $filter, paging: $paging, search: $search) {
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
                type
                user {
                    name
                    phone
                }
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
    }
`

export const GET_MOTAL_BY_ID = gql`
    query Motals($id: String!) {
        motal: getMotalPostById(id: $id) {
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
                type
                user {
                    name
                    phone
                }
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
    }
`