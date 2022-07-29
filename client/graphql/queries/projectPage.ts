import { gql } from '@apollo/client'
import { ProjectProduct } from '../../types/interfaces/project'

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
            }
            directLink
            virtual3DLink
        }
    }
`

export interface getProjectByDirectLinkVars {
    link: string
}

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
export interface GetProjectProductData {
    products: ProjectProduct[]
}

export interface GetProjectProductVars {
    project: string
}