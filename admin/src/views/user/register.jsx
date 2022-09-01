import { Box, Divider, Grid, Tab, Tabs, Typography, } from "@mui/material";
import { useState } from "react";
import MainCard from "ui-component/cards/MainCard";
import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import { GET_USERS } from "graphql/queries/user";
import UserList from "components/user-list";
import CreateUser from "components/create-user";
import UpdateUser from "components/update-user";

function Account() {
    const [menu, setMenu] = useState(1)
    const [items, setItems] = useState([])

    const [paging, setPaging] = useState({
        cursor: 0,
        limit: 20
    })
    const [userCount, setUserCount] = useState(20)

    const { data: usersData, refetch } = useQuery(GET_USERS, {
        variables: {
            paging
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: 'no-cache'
    })

    useEffect(() => {
        if (usersData) {
            setItems(usersData.list.users)
            setUserCount(usersData.list.count > 20 ? usersData.list.count : 20)
        }
    }, [usersData])

    const showMorePost = (page) => {
        setPaging(s => ({ ...s, cursor: page }))
        refetch({
            paging: { cursor: page }
        })
    }

    const renderMenu = () => {
        switch (menu) {
            case 0:
                return (
                    <UserList
                        count={userCount}
                        userList={items}
                        handlePageClick={showMorePost}
                    />
                )

            case 1:
                return <CreateUser />

            case 2:
                return <UpdateUser />

            default:
                return (
                    <UserList
                        count={userCount}
                        userList={items}
                        handlePageClick={showMorePost}
                    />
                )
        }
    }

    return (
        <MainCard>
            <Grid container spacing={1}>
                <Grid xl={6} item>
                    <Typography variant="h3" sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                        Tài khoản người dùng
                    </Typography>
                </Grid>
                <Grid xl={6} item>
                    <Box display={"flex"} justifyContent="flex-end">
                        <Box display={"flex"} justifyContent="flex-end">
                            <Tabs value={menu} onChange={(e, value) => setMenu(value)}>
                                <Tab label="Danh sách" id={`tab-1`} />
                                <Tab label="Thêm mới" id={`tab-2`} />
                                <Tab label="Chỉnh sửa" id={`tab-3`} />
                            </Tabs>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ margin: 2 }} />
            {renderMenu()}
        </MainCard>
    );
}

export default Account;