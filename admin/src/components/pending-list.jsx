import { useMutation } from "@apollo/client";
import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, TextField, Typography } from "@mui/material";
import { DELETE_APARTMENT, DELETE_BUSINESS_PREMISES, DELETE_HOUSE, DELETE_LAND, DELETE_MOTAL } from "graphql/mutations/remove";
import { UPDATE_APARTMENT, UPDATE_BUSINESS_PREMISES, UPDATE_HOUSE, UPDATE_LAND, UPDATE_MOTAL } from "graphql/mutations/update";
import { moneyConverter } from "helpers/money";
import { useEffect, useState } from "react";
import Notification from "ui-component/notifications/notification";

const PendingItem = ({ data, selectPost, onSetActived, onDelete }) => {
    const [code, setCode] = useState("")

    const onAccept = () => {
        onSetActived(data, code)
    }

    return (
        <Grid md={6} lg={4} xl={3} item>
            <Card variant="outlined">
                <Box onClick={() => selectPost(data)} sx={{ cursor: 'pointer' }}>
                    <CardMedia
                        component="img"
                        height="240"
                        image={data.media.images[0]}
                        alt="image"
                    />
                    <CardContent sx={{ padding: "12px 24px 0px 24px" }}>
                        <Typography gutterBottom variant="h4" component="div">
                            {data.title}
                        </Typography>
                        <Typography color="#f93707" variant="h5">
                            {moneyConverter(data.detail.pricing.total)}
                        </Typography>
                    </CardContent>

                </Box>
                <Box>
                    <CardContent sx={{ padding: "12px 24px" }}>
                        <TextField
                            placeholder="Mã bất động sản"
                            required
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                    </CardContent>
                </Box>
                <CardActions sx={{ padding: "12px 24px" }}>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => onAccept()}
                        disabled={code.length === 0}
                    >
                        Duyệt
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="error" onClick={() => onDelete(data)}>
                        Từ chối
                    </Button>
                </CardActions>
            </Card>

        </Grid>
    )
}

const PendingList = ({ type, data, selectPost, goBack }) => {
    const [modal, setModal] = useState({
        message: '',
        active: false,
        success: false
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

    const setActived = (post, code) => {
        if (type === "can-ho-chung-cu") {
            updateApartment({
                variables: {
                    postId: post._id,
                    status: {
                        postStatus: 'Available'
                    },
                    code
                }
            })
        }

        if (type === "nha-o") {
            updateHouse({
                variables: {
                    postId: post._id,
                    status: {
                        postStatus: 'Available'
                    },
                    code
                }
            })
        }

        if (type === "dat") {
            updateLand({
                variables: {
                    postId: post._id,
                    status: {
                        postStatus: 'Available'
                    },
                    code
                }
            })
        }

        if (type === "van-phong-mat-bang") {
            updateBusinessPremises({
                variables: {
                    postId: post._id,
                    status: {
                        postStatus: 'Available'
                    },
                    code
                }
            })
        }

        if (type === "phong-tro") {
            updateMotal({
                variables: {
                    postId: post._id,
                    status: {
                        postStatus: 'Available'
                    },
                    code
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

    const onCloseModal = () => {
        if (modal.success) {
            goBack()
        }

        setModal({
            message: '',
            active: false,
            success: false
        })
    }

    useEffect(() => {
        if (updateApartmentData || updateHouseData || updateLandData || updateBusinessPremisesData || updateMotalData) {
            setModal({
                message: "Duyệt thành công !",
                active: true,
                success: true
            })
        }

        if (updateApartmentErr || updateHouseErr || updateLandErr || updateBusinessPremisesErr || updateMotalErr) {
            setModal({
                message: "Duyệt thất bại !",
                active: true,
                success: false
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
                message: "Đã từ chối bài đăng !",
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
                return <PendingItem data={elm} key={ind} selectPost={selectPost} onSetActived={setActived} onDelete={deletePost} />
            })
        }

        return result
    }

    return (
        <>
            <Grid container spacing={2}>
                {renderData()}
            </Grid>
            <Notification active={modal.active} message={modal.message} handleClose={() => onCloseModal()} />
        </>
    );
}

export default PendingList;