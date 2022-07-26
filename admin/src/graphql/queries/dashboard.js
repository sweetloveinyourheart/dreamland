import { gql } from "@apollo/client";

export const GET_REAL_ESTATE_STATS = gql`
    query Stats($time: StatsTime) {
        sellingPosts: realEstateStats(category: MuaBan, time: $time) {
            apartments
            houses
            lands
            businessPremises
            motals
        }
        
        rentingPosts: realEstateStats(category: ChoThue, time: $time) {
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