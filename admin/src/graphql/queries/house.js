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
                numberOfBedrooms
                numberOfBathrooms
                furniture
                numberOfFloors
            }
            virtual3DLink
            outstanding
            actived
    }
}
`