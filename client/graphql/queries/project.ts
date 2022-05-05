import { gql } from '@apollo/client'

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
                purchaseInfo {
                    acreage
                }
            }
            directLink
        }
    }
`

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
            utilities
            information {
                purchaseInfo {
                    price
                    acreage
                }
                rentInfo {
                    price
                    acreage
                }
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