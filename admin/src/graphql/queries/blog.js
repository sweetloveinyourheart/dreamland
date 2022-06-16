import { gql } from "@apollo/client";

export const GET_BLOGS = gql`
    query {
        blogs: getBlogs {
            _id
            title
            image
            content
        }
    }
`