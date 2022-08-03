import { useQuery } from "@apollo/client";
import { Button, Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import PendingList from "components/pending-list";
import PostDetail from "components/post";
import UpdateRSPost from "components/update-post";
import { GET_PENDING_POST } from "graphql/queries/user";
import { useCallback, useState } from "react";
import MainCard from "ui-component/cards/MainCard";

function PostManager() {
    const [category, setCategory] = useState("MuaBan")
    const [selectedPost, setSelectedPost] = useState(null)
    const [selectedPostType, setSelectedPostType] = useState(null)

    const [menu, setMenu] = useState(0)

    const { data, refetch } = useQuery(GET_PENDING_POST, {
        variables: {
            category: category
        },
        fetchPolicy: 'no-cache'
    })

    const onGoBack = useCallback(() => {
        setSelectedPost(undefined)
        setMenu(0)
        refetch()
    }, [setSelectedPost, menu])

    const onSelectPost = useCallback((post, type) => {
        setSelectedPost(post)
        setSelectedPostType(type)
        setMenu(2)
    }, [selectedPost, menu])

    const onViewPost = useCallback((post) => {
        setSelectedPost(post)
        setMenu(1)
    }, [selectedPost, menu])

    const renderMenu = () => {
        switch (menu) {
            case 1:
                return <PostDetail post={selectedPost} />

            case 2:
                return <UpdateRSPost type={selectedPostType} post={selectedPost} goBack={onGoBack} />

            default:
                return (
                    <Box>
                        <Box marginY={4}>
                            <PendingList data={data?.apartments ?? []} selectPost={onSelectPost} viewPost={onViewPost} type="can-ho-chung-cu" goBack={onGoBack} />

                        </Box>
                        <Box marginY={4}>
                            <PendingList data={data?.houses ?? []} selectPost={onSelectPost} viewPost={onViewPost} type="nha-o" goBack={onGoBack} />

                        </Box>
                        <Box marginY={4}>
                            <PendingList data={data?.lands ?? []} selectPost={onSelectPost} viewPost={onViewPost} type="dat" goBack={onGoBack} />

                        </Box>
                        <Box marginY={4}>
                            <PendingList data={data?.businessPremises ?? []} selectPost={onSelectPost} viewPost={onViewPost} type="van-phong-mat-bang" goBack={onGoBack} />

                        </Box>
                        <Box marginY={4}>
                            <PendingList data={data?.motals ?? []} selectPost={onSelectPost} viewPost={onViewPost} type="phong-tro" goBack={onGoBack} />
                        </Box>
                    </Box>
                )
        }
    }

    return (
        <MainCard>
            <Grid container spacing={1}>
                <Grid xl={3} item>
                    <Typography variant="h3" sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                        {"Danh sách duyệt bất động sản"}
                    </Typography>
                </Grid>
                <Grid xl={6} item>
                    <Box display={"flex"} justifyContent="center">
                        {menu !== 0 && <Button variant="contained" onClick={() => setMenu(0)}>Quay lại</Button>}
                    </Box>
                </Grid>
                <Grid xl={3} item>
                    <Box display={"flex"} justifyContent="flex-end">
                        <TextField
                            id="outlined-select-currency"
                            select
                            label="Select"
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                        >
                            <MenuItem value={"MuaBan"}>
                                {"Mua Bán"}
                            </MenuItem>
                            <MenuItem value={"ChoThue"}>
                                {"Cho Thuê"}
                            </MenuItem>
                        </TextField>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ margin: 2 }} />
            {renderMenu()}
        </MainCard>
    );
}

export default PostManager;