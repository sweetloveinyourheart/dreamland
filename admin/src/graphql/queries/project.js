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
            googleMapsLink
            virtual3DLink
            outstanding
            actived
        }
    }
`

export const GET_PROJECT_PRODUCT = gql`
    query Product($project: String!) {
        products: getProjectProducts(project: $project) {
            _id
            code
            totalAcreage
            quantity
            price
            usedAcreage
            description
            status
        }
    }
`