import { useMutation } from "@apollo/client";
import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { UPDATE_APARTMENT, UPDATE_BUSINESS_PREMISES, UPDATE_HOUSE, UPDATE_LAND, UPDATE_MOTAL } from "graphql/mutations/update";
import { moneyConverter } from "helpers/money";
import { useEffect, useState } from "react";
import Notification from "ui-component/notifications/notification";

const Item = ({ data, selectPost, onSetOutStanding, onSetActived }) => {
    return (
        <Grid md={6} lg={4} xl={3} item>
            <Card variant="outlined">
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
                <CardActions sx={{ padding: "12px 24px" }}>
                    <Button
                        variant="contained"
                        color="warning"
                        onClick={() => onSetOutStanding(data)}
                    >
                        {data.outstanding ? "Gỡ nổi bật" : "Đặt nổi bật"}
                    </Button>
                    <Button variant="contained" color="success" onClick={() => selectPost(data)}>
                        Chỉnh sửa
                    </Button>
                    &nbsp;
                    <Button variant="contained" color="error" onClick={() => onSetActived(data)}>
                        {data.actived ? "Tạm Ẩn" : "Kích hoạt"}
                    </Button>
                </CardActions>
            </Card>

        </Grid>
    )
}

const RSList = ({ type, data, selectPost }) => {
    const [modal, setModal] = useState({
        message: '',
        active: false
    })

    const [updateApartment, { data: updateApartmentData, error: updateApartmentErr }] = useMutation(UPDATE_APARTMENT)
    const [updateHouse, { data: updateHouseData, error: updateHouseErr }] = useMutation(UPDATE_HOUSE)
    const [updateLand, { data: updateLandData, error: updateLandErr }] = useMutation(UPDATE_LAND)
    const [updateBusinessPremises, { data: updateBusinessPremisesData, error: updateBusinessPremisesErr }] = useMutation(UPDATE_BUSINESS_PREMISES)
    const [updateMotal, { data: updateMotalData, error: updateMotalErr }] = useMutation(UPDATE_MOTAL)

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
                        actived: !post.actived
                    }
                }
            })
        }

        if (type === "nha-o") {
            updateHouse({
                variables: {
                    postId: post._id,
                    status: {
                        actived: !post.actived
                    }
                }
            })
        }

        if (type === "dat") {
            updateLand({
                variables: {
                    postId: post._id,
                    status: {
                        actived: !post.actived
                    }
                }
            })
        }

        if (type === "van-phong-mat-bang") {
            updateBusinessPremises({
                variables: {
                    postId: post._id,
                    status: {
                        actived: !post.actived
                    }
                }
            })
        }

        if (type === "phong-tro") {
            updateMotal({
                variables: {
                    postId: post._id,
                    status: {
                        actived: !post.actived
                    }
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

    const renderData = () => {
        let result
        if (data) {
            result = data.map((elm, ind) => {
                return <Item data={elm} key={ind} selectPost={selectPost} onSetActived={setActived} onSetOutStanding={setOutStanding} />
            })
        }

        return result
    }

    return (
        <>
            <Grid container spacing={2}>
                {renderData()}
            </Grid>
            <Notification active={modal.active} message={modal.message} handleClose={() => setModal(s => ({...s, active: false}))}/>
        </>
    );
}

export default RSList;