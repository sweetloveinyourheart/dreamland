import { useMutation } from "@apollo/client";
import { Button, Card, CardActions, CardContent, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import { DELETE_PROJECT } from "graphql/mutations/remove";
import { EDIT_PROJECT } from "graphql/mutations/update";
import { useEffect, useState } from "react";
import Notification from "ui-component/notifications/notification";
import { moneyConverter } from '../helpers/money'

function ProjectList({ data, selectProject }) {
    const [modal, setModal] = useState({
        message: '',
        active: false
    })
    const [update, { data: updateData, error: updateErr, loading }] = useMutation(EDIT_PROJECT)
    const [remove, { data: removeData, error: removeErr }] = useMutation(DELETE_PROJECT)

    useEffect(() => {
        if (updateData && !updateErr) {
            setModal({
                message: "Thao tác thành công !",
                active: true
            })
        }

        if (updateErr) {
            setModal({
                message: "Thao tác thất bại !",
                active: true
            })
        }

    }, [updateData, updateErr])

    useEffect(() => {
        if (removeData && !removeErr) {
            setModal({
                message: "Thao tác thành công !",
                active: true
            })
        }

        if (removeErr) {
            setModal({
                message: "Thao tác thất bại !",
                active: true
            })
        }

    }, [removeData, removeErr])

    const setOutstandingProject = (id, status) => {
        update({
            variables: {
                id,
                status: {
                    outstanding: status
                }
            }
        })
    }

    const setActiveProject = (id, status) => {
        update({
            variables: {
                id,
                status: {
                    actived: status
                }
            }
        })
    }

    const removeProject = (id) => {
        remove({
            variables: {
                id
            }
        })
    }

    const renderProject = () => {
        let result;

        if (data) {
            result = data.map((elm, index) => {
                return (
                    <Grid xl={4} item key={index}>
                        <Card variant="outlined">
                            <CardMedia
                                component="img"
                                height="240"
                                image={elm.media.images[0]}
                                alt="green iguana"
                            />
                            <CardContent sx={{ padding: "12px 24px" }}>
                                <Typography gutterBottom variant="h4" component="div">
                                    {elm.projectName}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Giá mua bán từ {moneyConverter(elm.information?.purchaseInfo)}
                                </Typography>
                            </CardContent>
                            <CardActions sx={{ padding: "12px 24px" }}>
                                <Grid container spacing={1}>
                                    <Grid item md={6}>
                                        <Button
                                            variant="contained"
                                            color="warning"
                                            onClick={() => setOutstandingProject(elm._id, !elm.outstanding)}
                                            disabled={loading}
                                            fullWidth
                                        >
                                            {elm.outstanding ? "Gỡ nổi bật" : "Đánh dấu nổi bật"}
                                        </Button>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            fullWidth
                                            onClick={() => selectProject(elm)}
                                        >
                                            Chỉnh sửa
                                        </Button>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            fullWidth
                                            onClick={() => setActiveProject(elm._id, !elm.actived)}
                                            disabled={loading}
                                        >
                                            {elm.actived ? "Ẩn dự án" : "Kích hoạt"}
                                        </Button>
                                    </Grid>
                                    <Grid item md={6}>
                                        <Button
                                            variant="contained"
                                            color="secondary"
                                            fullWidth
                                            onClick={() => removeProject(elm._id)}
                                            disabled={loading}
                                        >
                                            Xoá dự án
                                        </Button>
                                    </Grid>
                                    {loading && (
                                        <CircularProgress
                                            size={24}
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                marginTop: '-12px',
                                                marginLeft: '-12px',
                                            }}
                                        />
                                    )}
                                </Grid>





                            </CardActions>
                        </Card>
                        <Notification active={modal.active} message={modal.message} handleClose={() => setModal(s => ({ ...s, active: !s.active }))} />
                    </Grid>
                )
            })
        }
        return result
    }

    return (
        <>
            <Grid container spacing={2}>
                {renderProject()}
            </Grid>
        </>
    );
}

export default ProjectList;