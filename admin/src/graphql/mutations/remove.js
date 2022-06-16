import { gql } from "@apollo/client";

export const REMOVE_BLOG = gql`
    mutation RemoveBlog($blogId: String!) {
        removeBlog(blogId: $blogId) {
            title
        }
    }
`