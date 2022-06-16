import { gql } from "@apollo/client"

export const GET_BLOG_BY_LINK = gql`
    query Blog($link: String!) {
        blog: getBlogByLink(link: $link) {
            _id
            title
            image
            content
            link
        }
    }
`