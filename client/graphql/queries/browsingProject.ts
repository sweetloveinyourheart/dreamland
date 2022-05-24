import { gql } from "@apollo/client";
import { ProjectInterface } from "../../types/interfaces/project";
import { AddressFilter, PaginationFilter } from "../../types/interfaces/realEstate";

export const GET_ALL_PROJECT_POSTS = gql`
    query projects($filter: ProjectFilter, $paging: PaginationArgs) {
        getProjects(filter: $filter, paging: $paging) {
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

export interface GetAllProjectsVars {
    filter?: {
        address?: AddressFilter
        price?: {
            min?: number
            max?: number
        }
        handOverYear?: number
    }
    paging?: PaginationFilter
}

export interface GetAllProjectsData {
    getProjects: ProjectInterface[]
}