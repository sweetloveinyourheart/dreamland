import { gql } from "@apollo/client";

export const UPDATE_PAGE_TEMPLATE = gql`
    mutation UpdatePageTemplate($pageName: String!, $data: UpdateTemplateInput!) {
        updatePageTemplate(pageName: $pageName, data: $data) {
            pageName,
            banner
        }
    }
`

export const EDIT_PROJECT = gql`
    mutation EditProject($id: String!, $data: CreateProjectInput, $status: UpdateStatusInput) {
        editProject(id: $id, data: $data, status: $status) {
            projectName
        }
    }
`

export const UPDATE_APARTMENT = gql`
    mutation Update($data: CreateApartmentInput, $postId: String!, $status: UpdatePostStatusInput) {
        apartment: updateApartmentPost(data: $data, postId: $postId, status: $status) {
            title
        }
    }
`

export const UPDATE_HOUSE = gql`
    mutation Update($data: CreateHouseInput, $postId: String!, $status: UpdatePostStatusInput) {
        house: updateHousePost(data: $data, postId: $postId, status: $status) {
            title
        }
    }
`


export const UPDATE_LAND = gql`
    mutation Update($data: CreateLandInput, $postId: String!, $status: UpdatePostStatusInput) {
        land: updateLandPost(data: $data, postId: $postId, status: $status) {
            title
        }
    }
`


export const UPDATE_BUSINESS_PREMISES = gql`
    mutation Update($data: CreateBusinessPremisesInput, $postId: String!, $status: UpdatePostStatusInput) {
        businessPremises: updateBusinessPremisesPost(data: $data, postId: $postId, status: $status) {
            title
        }
    }
`


export const UPDATE_MOTAL = gql`
    mutation Update($data: CreateMotalInput, $postId: String!, $status: UpdatePostStatusInput) {
        motal: updateMotalPost(data: $data, postId: $postId, status: $status) {
            title
        }
    }
`

export const UPDATE_TRANSACTION = gql`
    mutation UpdateTransaction($id: String!, $status: TransactionStatus!) {
        updateTransaction(id: $id, status: $status) {
            _id
        }
    }
`