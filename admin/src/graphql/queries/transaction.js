import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
query Transaction($paging: PaginationArgs, $status: TransactionStatus!) {
    transactions: getAllTransaction(status: $status, paging: $paging) {
            _id
            item {
                itemId
                itemType
            }
            user {
                phone
                name
            }
            status
            createdAt
        }
    }
`