import { Grid, Pagination, Typography } from "@mui/material";
import { Box } from "@mui/system";
import SubCard from "ui-component/cards/SubCard";

const ITEMS_PER_PAGE = 20

const UserList = ({ count, handlePageClick, userList }) => {

    const onPageClick = (page) => {
        const newCursor = page * ITEMS_PER_PAGE - ITEMS_PER_PAGE
        handlePageClick(newCursor)
    }

    const showUsers = () => {
        let result;
        if (userList) {
            result = userList.map((user, index) => {
                return (
                    <Grid lg={12} key={index} marginBottom={2}>
                        <Grid container spacing={2}>
                            <Grid item lg={3}>
                                <Typography fontSize={16} paddingX={2} sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
                                    {user.roles.find(role => role === "Manager")
                                        && (
                                            <Box component="span" marginRight={1} sx={{ padding: '4px 12px', background: "#ffb41f", borderRadius: 8 }}>Quản lý</Box>
                                        )
                                    }
                                    {user.name}
                                </Typography>
                            </Grid>
                            <Grid item lg={2}>
                                <Typography fontSize={16} paddingX={2}>
                                    {user.phone}
                                </Typography>
                            </Grid>
                            <Grid item lg={4}>
                                <Typography fontSize={16} paddingX={2}>
                                    {user.address ?? "___"}
                                </Typography>
                            </Grid>
                            <Grid item lg={2}>
                                <Typography fontSize={16} paddingX={2}>
                                    {user.birthday ? user.birthday.slice(0, user.birthday.indexOf("T")) : "___"}
                                </Typography>
                            </Grid>
                            <Grid item lg={1}>
                                <Typography fontSize={16} paddingX={2}>
                                    {user.sex ?? "____"}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            })
        }
        return result
    }

    return (
        <SubCard title="Danh sách tài khoản">
            <Grid container spacing={2}>
                <Grid lg={12} marginBottom={2}>
                    <Grid container spacing={2} marginTop={1}>
                        <Grid item lg={3}>
                            <Typography fontSize={16} fontWeight="bold" paddingX={2}>
                                Tên người dùng
                            </Typography>
                        </Grid>
                        <Grid item lg={2}>
                            <Typography fontSize={16} fontWeight="bold" paddingX={2}>
                                Số điện thoại
                            </Typography>
                        </Grid>
                        <Grid item lg={4}>
                            <Typography fontSize={16} fontWeight="bold" paddingX={2}>
                                Địa chỉ
                            </Typography>
                        </Grid>
                        <Grid item lg={2}>
                            <Typography fontSize={16} fontWeight="bold" paddingX={2}>
                                Ngày sinh
                            </Typography>
                        </Grid>
                        <Grid item lg={1}>
                            <Typography fontSize={16} fontWeight="bold" paddingX={2}>
                                Giới tính
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
                {showUsers()}
            </Grid>
            <Box display={"flex"} justifyContent="center" mt={4}>
                    <Pagination
                        count={count / ITEMS_PER_PAGE}
                        color="primary"
                        onChange={(e, page) => onPageClick(page)}
                    />
                </Box>
        </SubCard>
    );
}

export default UserList;