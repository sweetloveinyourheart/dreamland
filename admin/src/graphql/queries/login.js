import { gql } from "@apollo/client";

export const LOGIN = gql`
    query($account: LoginInput!) {
        admin(account: $account) {
            accessToken
            refreshToken
        }
    }
`