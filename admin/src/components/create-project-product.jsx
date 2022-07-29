import { useMutation, useQuery } from "@apollo/client";
import { Button, CircularProgress, Grid, MenuItem, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { CREATE_PROJECT_PRODUCT } from "graphql/mutations/create";
import { GET_ALL_PROJECT_POSTS } from "graphql/queries/project";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import SubCard from "ui-component/cards/SubCard";
import Notification from "ui-component/notifications/notification";

export const ProjectSelector = ({ value, setValue }) => {
    const [projects, setProjects] = useState([])

    const { data: projectsData, error: projectsErr } = useQuery(GET_ALL_PROJECT_POSTS, {
        notifyOnNetworkStatusChange: true
    })

    useEffect(() => {
        if (projectsData) {
            setProjects(projectsData.projects)
        }
    }, [projectsData, projectsErr])

    return (
        <TextField
            select
            fullWidth
            label="Dự án"
            variant="outlined"
            onChange={e => setValue(e.target.value)}
            value={value}
            defaultValue=""
        >
            {projects.map((option, index) => (
                <MenuItem key={index} value={option._id} >
                    {option.projectName}
                </MenuItem>
            ))}
        </TextField>
    )
}

const CreateProjectProduct = () => {
    const [modal, setModal] = useState({
        message: '',
        active: false
    })

    const [formData, setFormData] = useState({
        project: '',
        code: '',
        totalAcreage: 0,
        quantity: 0,
        price: 0,
        usedAcreage: 0,
        description: ''
    })

    const [create, { data, loading, error }] = useMutation(CREATE_PROJECT_PRODUCT)

    useEffect(() => {
        if (data && !error) {
            setFormData({
                project: '',
                code: '',
                totalAcreage: 0,
                quantity: 0,
                price: 0,
                usedAcreage: 0,
                description: ''
            })
            setModal({
                message: "Thêm sản phẩm dự án thành công !",
                active: true,
                success: true
            })
        }

        if (error) {
            setModal({
                message: "Thêm sản phẩm dự án thất bại !",
                active: true,
                success: false
            })
        }
    }, [data, error])

    const onSelectProduct = useCallback((value) => {
        setFormData(s => ({
            ...s,
            project: value
        }))
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (formData.project && formData.project.length > 0) {
            create({
                variables: {
                    data: formData
                }
            })
        }
    }

    return (
        <SubCard title="Thêm sản phẩm dự án">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item lg={6}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={12}>
                                <ProjectSelector value={formData.project} setValue={onSelectProduct} />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Mã sản phẩm"
                                    variant="outlined"
                                    value={formData.code}
                                    onChange={e => setFormData(s => ({ ...s, code: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Diện tích"
                                    type={"number"}
                                    required
                                    variant="outlined"
                                    value={formData.totalAcreage}
                                    onChange={e => setFormData(s => ({ ...s, totalAcreage: Number(e.target.value) }))}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Thổ cư"
                                    type={"number"}
                                    variant="outlined"
                                    value={formData.usedAcreage}
                                    onChange={e => setFormData(s => ({ ...s, usedAcreage: Number(e.target.value) }))}
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Số thửa"
                                    type={"number"}
                                    variant="outlined"
                                    value={formData.quantity}
                                    onChange={e => setFormData(s => ({ ...s, quantity: Number(e.target.value) }))}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Giá bán"
                                    variant="outlined"
                                    type={"number"}
                                    value={formData.price}
                                    onChange={e => setFormData(s => ({ ...s, price: Number(e.target.value) }))}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Ghi chú"
                                    variant="outlined"
                                    value={formData.description}
                                    onChange={e => setFormData(s => ({ ...s, description: e.target.value }))}
                                />
                            </Grid>
                        </Grid>
                        <Box sx={{ m: "24px 4px", position: 'relative' }}>
                            <Button variant="contained" type="submit" fullWidth disabled={loading}>Thêm sản phẩm mới</Button>
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
                        </Box>
                    </Grid>
                    <Grid item lg={6}>
                    </Grid>
                </Grid>
            </form>
            <Notification active={modal.active} message={modal.message} handleClose={() => setModal(s => ({ ...s, active: false }))} />
        </SubCard>
    );
}

export default CreateProjectProduct;