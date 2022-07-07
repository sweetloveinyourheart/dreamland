import { useQuery } from "@apollo/client";
import { Divider, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import RSList from "components/rsList";
import { GET_PENDING_POST } from "graphql/queries/user";
import { useCallback, useState } from "react";
import MainCard from "ui-component/cards/MainCard";

function PostManager() {
    const [category, setCategory] = useState("MuaBan")
    const [selectedPost, setSelectedPost] = useState(null)

    const { data } = useQuery(GET_PENDING_POST, {
        variables: {
            category: category
        }
    })

    const onSelectPost = useCallback((post) => {
        setSelectedPost(post)
    }, [selectedPost])

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
            <Box marginY={2}>
                <RSList data={data?.apartments ?? []} selectPost={onSelectPost} type="can-ho-chung-cu" />
                <RSList data={data?.houses ?? []} selectPost={onSelectPost} type="nha-o" />
                <RSList data={data?.lands ?? []} selectPost={onSelectPost} type="dat" />
                <RSList data={data?.businessPremises ?? []} selectPost={onSelectPost} type="van-phong-mat-bang" />
                <RSList data={data?.motals ?? []} selectPost={onSelectPost} type="phong-tro" />
            </Box>
        </MainCard>
    );
}

export default PostManager;