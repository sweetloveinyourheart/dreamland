import { gql } from "@apollo/client";

export const GET_APARTMENT_POSTS = gql`
query Apartments($filter: ApartmentFilter!, $paging: PaginationArgs, $search: String) {
    apartments: getAllApartments(filter: $filter, paging: $paging, search: $search) {
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
        code
    }
}
`

export const GET_APARTMENT_BY_ID = gql`
query Apartment($id: String!) {
    apartment: getApartmentPostById(id: $id) {
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
        code
    }
}
`