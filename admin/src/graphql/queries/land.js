import { gql } from "@apollo/client";

export const GET_LAND_POSTS = gql`
query Lands($filter: LandFilter!, $paging: PaginationArgs, $search: String) {
    lands: getAllLands(filter: $filter, paging: $paging, search: $search) {
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
                type
                user {
                    name
                    phone
                }
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
            code
        }
    }
`

export const GET_LAND_BY_ID = gql`
query Lands($id: String!) {
    land: getLandPostById(id: $id) {
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
                type
                user {
                    name
                    phone
                }
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
            code
        }
    }
`