import { gql } from "@apollo/client";

export const GET_PAGE_TEMPLATE = gql`
    query Template($pageName: String!) {
        template: getTemplate(pageName: $pageName) {
            pageName
            banner {
                imgUrl
                directLink
            }
        }
    }
`

export const GET_BLOGS = gql`
    query {
        blogs: getBlogs {
            _id
            title
            image
            content
            link
            timeStamp
        }
    }
`