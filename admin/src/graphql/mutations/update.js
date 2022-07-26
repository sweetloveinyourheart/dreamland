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
    mutation Update($data: CreateApartmentInput, $postId: String!, $status: UpdatePostStatusInput, $code: String) {
        apartment: updateApartmentPost(data: $data, postId: $postId, status: $status, code: $code) {
            title
        }
    }
`

export const UPDATE_HOUSE = gql`
    mutation Update($data: CreateHouseInput, $postId: String!, $status: UpdatePostStatusInput, $code: String) {
        house: updateHousePost(data: $data, postId: $postId, status: $status, code: $code) {
            title
        }
    }
`


export const UPDATE_LAND = gql`
    mutation Update($data: CreateLandInput, $postId: String!, $status: UpdatePostStatusInput, $code: String) {
        land: updateLandPost(data: $data, postId: $postId, status: $status, code: $code) {
            title
        }
    }
`


export const UPDATE_BUSINESS_PREMISES = gql`
    mutation Update($data: CreateBusinessPremisesInput, $postId: String!, $status: UpdatePostStatusInput, $code: String) {
        businessPremises: updateBusinessPremisesPost(data: $data, postId: $postId, status: $status, code: $code) {
            title
        }
    }
`


export const UPDATE_MOTAL = gql`
    mutation Update($data: CreateMotalInput, $postId: String!, $status: UpdatePostStatusInput, $code: String) {
        motal: updateMotalPost(data: $data, postId: $postId, status: $status, code: $code) {
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