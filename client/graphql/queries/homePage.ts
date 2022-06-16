import { gql } from "@apollo/client";
import { ApartmentInterface } from "../../types/interfaces/apartment";
import { BusinessPremisesInterface } from "../../types/interfaces/businessPremises";
import { HouseInterface } from "../../types/interfaces/house";
import { LandInterface } from "../../types/interfaces/land";
import { MotalInterface } from "../../types/interfaces/motal";

export const GET_TOP_PROJECTS_QUERY = gql`
    query projects {
        projects: getOutstandingProjects(paging: { limit: 4 }) {
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

export const GET_STATS = gql`
    query {
        sellingPosts: realEstateStats(category: MuaBan) {
            apartments
            houses
            lands
            businessPremises
        }
            
        rentingPosts: realEstateStats(category: ChoThue) {
            apartments
            houses
            lands
            businessPremises
            motals
        }
        
        projects: projectStats {
            projects
        }
    }
`

export interface GetStatsData {
    sellingPosts: {
        apartments: number
        houses: number
        lands: number
        businessPremises: number
    }

    rentingPosts: {
        apartments: number
        houses: number
        lands: number
        businessPremises: number
    }

    projects: {
        projects: number
    }
}

export const GET_OUTSTANDING_POSTS = gql`
    query {
        posts: getOutstandingPosts {
            apartments {
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
            houses {
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
            lands {
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
                
                timeStamp
                category
                directLink
            }
            businessPremises {
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

                timeStamp
                category
                directLink
            }
            motals {
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
    }
`
export interface GetOutstandingPostData {
    posts: OutstandingPost
}

export interface OutstandingPost {
    apartments: (ApartmentInterface & { __typename: string })[],
    houses: (HouseInterface & { __typename: string })[],
    lands: (LandInterface & { __typename: string })[],
    businessPremises: (BusinessPremisesInterface & { __typename: string })[],
    motals: (MotalInterface & { __typename: string })[]
}