import { gql } from "@apollo/client";

export const REMOVE_BLOG = gql`
    mutation RemoveBlog($blogId: String!) {
        removeBlog(blogId: $blogId) {
            title
        }
    }
`

export const DELETE_APARTMENT = gql`
    mutation delete($postId: String!) {
        apartment: deleteApartmentPost(postId: $postId) {
            title
        }
    }
`

export const DELETE_HOUSE = gql`
    mutation delete($postId: String!) {
        house: deleteHousePost(postId: $postId) {
            title
        }
    }
`


export const DELETE_LAND = gql`
    mutation delete($postId: String!) {
        land: deleteLandPost(postId: $postId) {
            title
        }
    }
`


export const DELETE_BUSINESS_PREMISES = gql`
    mutation delete($postId: String!) {
        businessPremises: deleteBusinessPremisesPost(postId: $postId) {
            title
        }
    }
`


export const DELETE_MOTAL = gql`
    mutation delete($postId: String!) {
        motal: deleteMotalPost(postId: $postId) {
            title
        }
    }
`

export const DELETE_PROJECT = gql`
    mutation delete($id: String!) {
        project: removeProject(id: $id) {
            title
        }
    }
`

export const DELETE_PROJECT_PRODUCT = gql`
    mutation delete($id: String!) {
        product: removeProjectProduct(id: $id) {
            code
        }
    }
`