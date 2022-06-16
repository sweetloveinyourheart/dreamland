import { gql } from "@apollo/client";


export const GET_ALL_PROJECT_POSTS = gql`
    query projects {
        projects: getAllProjects {
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
            }
            directLink
            outstanding
            actived
        }
    }
`