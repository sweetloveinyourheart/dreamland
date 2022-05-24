import { gql } from "@apollo/client";
import { ApartmentInterface } from "../../types/interfaces/apartment";
import { HouseInterface } from "../../types/interfaces/house";
import { LandInterface } from "../../types/interfaces/land";

export const GET_TOP_PROJECTS_QUERY = gql`
    query projects {
        getProjects(paging: { limit: 4 }) {
            _id
            projectName
            media {
                images
            }
            address {
                province
                district
            }
            information {
                purchaseInfo
            }
            directLink
        }
    }
`

export const GET_TOP_POSTS_QUERY = gql`
    query {
        sellingApartments: getApartments(filter: { category: MuaBan }, paging: { limit: 2 }) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
                project {
                    projectName
                }
            }
            
            overview {
                numberOfBedrooms
            }

            timeStamp
            category
            directLink
        }

        rentingApartments: getApartments(filter: { category: ChoThue }, paging: { limit: 2 }) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
                project {
                    projectName
                }
            }
            
            overview {
                numberOfBedrooms
            }

            timeStamp
            category
            directLink
        }

        sellingHouses: getHouses(filter: { category: MuaBan }, paging: { limit: 2 }) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }
            
            overview {
                numberOfBedrooms
            }

            timeStamp
            category
            directLink
        }

        rentingHouses: getHouses(filter: { category: ChoThue }, paging: { limit: 2 }) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }
            
            overview {
                numberOfBedrooms
            }

            timeStamp
            category
            directLink
        }

        sellingLands: getLands(filter: { category: MuaBan }, paging: { limit: 1 }) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }

            timeStamp
            category
            directLink
        }

        rentingLands: getLands(filter: { category: ChoThue }, paging: { limit: 1 }) {
            __typename
            title
            media {
                images
            }
            detail {
                acreage {
                    totalAcreage
                }
                pricing {
                    total
                }
                address {
                    province
                }
            }

            timeStamp
            category
            directLink
        }

    }
`

export interface TopPostsResult {
    sellingApartments: (ApartmentInterface & { __typename: string })[]
    sellingHouses: (HouseInterface & { __typename: string })[]
    sellingLands: (LandInterface & { __typename: string })[]
    rentingApartments: (ApartmentInterface & { __typename: string })[]
    rentingHouses: (HouseInterface & { __typename: string })[]
    rentingLands: (LandInterface & { __typename: string })[]
}