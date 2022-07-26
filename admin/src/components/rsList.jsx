import { useMutation } from "@apollo/client";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { UPDATE_APARTMENT, UPDATE_BUSINESS_PREMISES, UPDATE_HOUSE, UPDATE_LAND, UPDATE_MOTAL } from "graphql/mutations/update";
import { moneyConverter } from "helpers/money";
import { useEffect, useState } from "react";
import Notification from "ui-component/notifications/notification";
import { DELETE_APARTMENT, DELETE_BUSINESS_PREMISES, DELETE_HOUSE, DELETE_LAND, DELETE_MOTAL } from "graphql/mutations/remove";

const Item = ({ data, selectPost, onSetOutStanding, onSetActived, viewPost, onDelete }) => {
    return (
        <Grid md={6} lg={4} xl={3} item>
            <Card variant="outlined">
                <Box onClick={() => viewPost(data)} sx={{ cursor: 'pointer' }}>
                    <CardMedia
                        component="img"
                        height="240"
                        image={data.media.images[0]}
                        alt="image"
                    />
                    <CardContent sx={{ padding: "12px 24px" }}>
                        <Typography gutterBottom variant="h4" component="div">
                            {data.title}
                        </Typography>
                        <Typography color="#f93707" variant="h5">
                            {moneyConverter(data.detail.pricing.total)}
                        </Typography>
                    </CardContent>
                </Box>
                <CardActions sx={{ padding: "12px 24px" }}>
                    <Grid container spacing={1}>
                        {(data.postStatus === 'Available' || data.postStatus === "Disable")
                            && (
                                <Grid item md={6}>
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() => onSetOutStanding(data)}
                                        fullWidth
                                    >
                                        {data.outstanding ? "Gỡ nổi bật" : "Đặt nổi bật"}
                                    </Button>
                                </Grid>
                            )
                        }
                        <Grid item md={6}>
                            <Button variant="contained" color="success" onClick={() => selectPost(data)} fullWidth>
                                Chỉnh sửa
                            </Button>
                        </Grid>

                        {(data.postStatus === 'Available' || data.postStatus === "Disable")
                            && (
                                <Grid item md={6}>
                                    <Button variant="contained" color="error" onClick={() => { onSetActived(data) }} fullWidth>
                                        {data.postStatus === 'Available' ? "Vô hiệu" : "Kích hoạt"}
                                    </Button>
                                </Grid>
                            )
                        }

                        {(data.postStatus === 'Available' || data.postStatus === "Disable")
                            && (
                                <Grid item md={6}>
                                    <Button variant="contained" color="secondary" onClick={() => onDelete(data)} fullWidth>
                                        Xoá bỏ
                                    </Button>
                                </Grid>
                            )
                        }
                    </Grid>
                </CardActions>
            </Card>

        </Grid>
    )
}

const RSList = ({ type, data, selectPost, viewPost }) => {
    const [modal, setModal] = useState({
        message: '',
        active: false
    })

    const [updateApartment, { data: updateApartmentData, error: updateApartmentErr }] = useMutation(UPDATE_APARTMENT)
    const [updateHouse, { data: updateHouseData, error: updateHouseErr }] = useMutation(UPDATE_HOUSE)
    const [updateLand, { data: updateLandData, error: updateLandErr }] = useMutation(UPDATE_LAND)
    const [updateBusinessPremises, { data: updateBusinessPremisesData, error: updateBusinessPremisesErr }] = useMutation(UPDATE_BUSINESS_PREMISES)
    const [updateMotal, { data: updateMotalData, error: updateMotalErr }] = useMutation(UPDATE_MOTAL)

    const [deleteApartment, { data: deleteApartmentData, error: deleteApartmentErr }] = useMutation(DELETE_APARTMENT)
    const [deleteHouse, { data: deleteHouseData, error: deleteHouseErr }] = useMutation(DELETE_HOUSE)
    const [deleteLand, { data: deleteLandData, error: deleteLandErr }] = useMutation(DELETE_LAND)
    const [deleteBusinessPremises, { data: deleteBusinessPremisesData, error: deleteBusinessPremisesErr }] = useMutation(DELETE_BUSINESS_PREMISES)
    const [deleteMotal, { data: deleteMotalData, error: deleteMotalErr }] = useMutation(DELETE_MOTAL)

    const setOutStanding = (post) => {
        if (type === "can-ho-chung-cu") {
            updateApartment({
                variables: {
                    postId: post._id,
                    status: {
                        outstanding: !post.outstanding
                    }
                }
            })
        }

        if (type === "nha-o") {
            updateHouse({
                variables: {
                    postId: post._id,
                    status: {
                        outstanding: !post.outstanding
                    }
                }
            })
        }

        if (type === "dat") {
            updateLand({
                variables: {
                    postId: post._id,
                    status: {
                        outstanding: !post.outstanding
                    }
                }
            })
        }

        if (type === "van-phong-mat-bang") {
            updateBusinessPremises({
                variables: {
                    postId: post._id,
                    status: {
                        outstanding: !post.outstanding
                    }
                }
            })
        }

        if (type === "phong-tro") {
            updateMotal({
                variables: {
                    postId: post._id,
                    status: {
                        outstanding: !post.outstanding
                    }
                }
            })
        }
    }

    const setActived = (post) => {
        if (type === "can-ho-chung-cu") {
            updateApartment({
                variables: {
                    postId: post._id,
                    status: {
                        postStatus: post.postStatus === 'Available' ? 'Disable' : 'Available',
                        ...(post.outstanding && { outstanding: false })
                    }
                }
            })
        }

        if (type === "nha-o") {
            updateHouse({
                variables: {
                    postId: post._id,
                    status: {
                        postStatus: post.postStatus === 'Available' ? 'Disable' : 'Available',
                        ...(post.outstanding && { outstanding: false })
                    }
                }
            })
        }

        if (type === "dat") {
            updateLand({
                variables: {
                    postId: post._id,
                    status: {
                        postStatus: post.postStatus === 'Available' ? 'Disable' : 'Available',
                        ...(post.outstanding && { outstanding: false })
                    }
                }
            })
        }

        if (type === "van-phong-mat-bang") {
            updateBusinessPremises({
                variables: {
                    postId: post._id,
                    status: {
                        postStatus: post.postStatus === 'Available' ? 'Disable' : 'Available',
                        ...(post.outstanding && { outstanding: false })
                    }
                }
            })
        }

        if (type === "phong-tro") {
            updateMotal({
                variables: {
                    postId: post._id,
                    status: {
                        postStatus: post.postStatus === 'Available' ? 'Disable' : 'Available',
                        ...(post.outstanding && { outstanding: false })
                    }
                }
            })
        }
    }

    const deletePost = (post) => {
        if (type === "can-ho-chung-cu") {
            deleteApartment({
                variables: {
                    postId: post._id
                }
            })
        }

        if (type === "nha-o") {
            deleteHouse({
                variables: {
                    postId: post._id
                }
            })
        }

        if (type === "dat") {
            deleteLand({
                variables: {
                    postId: post._id
                }
            })
        }

        if (type === "van-phong-mat-bang") {
            deleteBusinessPremises({
                variables: {
                    postId: post._id
                }
            })
        }

        if (type === "phong-tro") {
            deleteMotal({
                variables: {
                    postId: post._id
                }
            })
        }
    }

    useEffect(() => {
        if (updateApartmentData || updateHouseData || updateLandData || updateBusinessPremisesData || updateMotalData) {
            setModal({
                message: "Cập nhật thông tin thành công !",
                active: true
            })
        }

        if (updateApartmentErr || updateHouseErr || updateLandErr || updateBusinessPremisesErr || updateMotalErr) {
            setModal({
                message: "Cập nhật thông tin thất bại !",
                active: true
            })
        }
    }, [
        updateApartmentData,
        updateApartmentErr,
        updateHouseData,
        updateHouseErr,
        updateLandData,
        updateLandErr,
        updateBusinessPremisesData,
        updateBusinessPremisesErr,
        updateMotalData,
        updateMotalErr
    ])

    useEffect(() => {
        if (deleteApartmentData || deleteHouseData || deleteLandData || deleteBusinessPremisesData || deleteMotalData) {
            setModal({
                message: "Đã xoá bài đăng !",
                active: true,
                success: true
            })
        }

        if (deleteApartmentErr || deleteHouseErr || deleteLandErr || deleteBusinessPremisesErr || deleteMotalErr) {
            setModal({
                message: "Có lỗi xảy ra, vui lòng refresh trang và thử lại !",
                active: true,
                success: false
            })
        }
    }, [
        deleteApartmentData,
        deleteApartmentErr,
        deleteHouseData,
        deleteHouseErr,
        deleteLandData,
        deleteLandErr,
        deleteBusinessPremisesData,
        deleteBusinessPremisesErr,
        deleteMotalData,
        deleteMotalErr
    ])


    const renderData = () => {
        let result
        if (data) {
            result = data.map((elm, ind) => {
                return <Item data={elm} key={ind} selectPost={selectPost} onSetActived={setActived} onSetOutStanding={setOutStanding} viewPost={viewPost} onDelete={deletePost}/>
            })
        }

        return result
    }

    return (
        <>
            <Grid container spacing={2}>
                {renderData()}
            </Grid>
            <Notification active={modal.active} message={modal.message} handleClose={() => setModal(s => ({ ...s, active: false }))} />
        </>
    );
}

export default RSList;