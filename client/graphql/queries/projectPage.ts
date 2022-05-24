import { gql } from '@apollo/client'
import { ApartmentInterface } from '../../types/interfaces/apartment'
import { HouseInterface } from '../../types/interfaces/house'
import { LandInterface } from '../../types/interfaces/land'

export const GET_PROJECT_BY_DIRECT_LINK = gql`
    query project($link: String!) {
        getProjectByDirectLink(directLink: $link) {
            _id
            projectName
            description
            media {
                images
            }
            address {
                province
                district
                ward
                street
                houseNumber
                showHouseNumber
            }
            masterPlan {
                image
                title
            }
            utilities {
                image
                title
            }
            information {
                purchaseInfo
                rentInfo
                acreage
                progressStatus
                handOverYear
                type
            }
            investor {
                about
                name
                logo
            }
            directLink
        }
    }
`

export interface getProjectByDirectLinkVars {
    link: string
}

export const GET_RELATIVE_POSTS_BY_PROJECT = gql`
    query Posts($projectId: String!){
        sellingApartments: getApartments(filter: { category: MuaBan, project: $projectId }, paging: { limit: 2 }) {
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

        rentingApartments: getApartments(filter: { category: ChoThue, project: $projectId }, paging: { limit: 2 }) {
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

        sellingHouses: getHouses(filter: { category: MuaBan, project: $projectId }, paging: { limit: 2 }) {
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

        rentingHouses: getHouses(filter: { category: ChoThue, project: $projectId }, paging: { limit: 2 }) {
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

        sellingLands: getLands(filter: { category: MuaBan, project: $projectId }, paging: { limit: 1 }) {
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

        rentingLands: getLands(filter: { category: ChoThue, project: $projectId }, paging: { limit: 1 }) {
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

export interface RelativePostsByProjectResult {
    sellingApartments: (ApartmentInterface & { __typename: string })[]
    sellingHouses: (HouseInterface & { __typename: string })[]
    sellingLands: (LandInterface & { __typename: string })[]
    rentingApartments: (ApartmentInterface & { __typename: string })[]
    rentingHouses: (HouseInterface & { __typename: string })[]
    rentingLands: (LandInterface & { __typename: string })[]
}

export interface RelativePostsByProjectVars {
    projectId: string
}