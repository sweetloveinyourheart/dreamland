import { gql } from "@apollo/client";

export const GET_REAL_ESTATE_PAGING_DATA = gql`
    query Paging($category: RealEstateCategory!){
        stats: realEstateStats(category: $category) {
            apartments
            houses
            lands
            businessPremises
            motals
        }
    }
`

export interface RealEstatePaging {
    apartments: number
    houses: number
    lands: number
    businessPremises: number
    motals: number
}

export interface RealEstatePagingData {
    stats: RealEstatePaging
}

export interface RealEstatePagingVars {
    category: string
}

export const PROJECT_STATS = gql`
    query {
        projectStats {
            projects
        }
    }
`
export interface ProjectStatsData {
    projectStats: {
        projects: number
    }
}