import { gql } from "@apollo/client";

export const GET_REAL_ESTATE_STATS = gql`
    query {
        sellingPosts: realEstateStats(category: MuaBan) {
            apartments
            houses
            lands
            businessPremises
            motals
        }
        
        rentingPosts: realEstateStats(category: ChoThue) {
            apartments
            houses
            lands
            businessPremises
            motals
        }
    }
`

export const GET_PROJECT_STATS = gql`
    query {
        projectStats {
            projects
        }
    }
`