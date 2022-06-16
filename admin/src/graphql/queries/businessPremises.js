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
                furniture
            }
            virtual3DLink
            actived
            outstanding
    }
}
`