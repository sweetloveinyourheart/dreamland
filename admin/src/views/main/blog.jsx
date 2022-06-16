import { Box, Button, ButtonGroup, Card, CardActions, CardContent, CardMedia, CircularProgress, Divider, Grid, Modal, Tab, Tabs, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import ReactImageUploading from "react-images-uploading";
import MainCard from "ui-component/cards/MainCard";
import SubCard from "ui-component/cards/SubCard";
import { CloudName } from 'constants/cloudinary';
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_BLOG } from "../../graphql/mutations/create"
import axios from "axios";
import Notification from "ui-component/notifications/notification";
import { GET_BLOGS } from "graphql/queries/blog";
import { REMOVE_BLOG } from "graphql/mutations/remove";

function BlogManagement() {
    const [blogs, setBlogs] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        content: ""
    })
    const [menu, setMenu] = useState(0)
    const [images, setImages] = useState([]);
    const [isUploading, setIsUploading] = useState(false)
    const [modal, setModal] = useState({
        message: '',
        active: false
    })

    const { data: blogsData, error: blogsError } = useQuery(GET_BLOGS)
    const [create, { data, error }] = useMutation(CREATE_BLOG)
    const [remove, { data: removeData, error: removeErr }] = useMutation(REMOVE_BLOG)

    useEffect(() => {
        if (blogsData && !blogsError) {
            setBlogs(blogsData.blogs)
        }
    }, [blogsData, blogsError])

    useEffect(() => {
        if (data && !error) {
            setIsUploading(false)
            setModal({
                active: true,
                message: "Tạo bài viết mới thành công"
            })
        }

        if (error) {
            setIsUploading(false)
            setModal({
                active: true,
                message: "Tạo bài viết mới thất bại, vui lòng thử lại"
            })
        }
    }, [data, error])

    useEffect(() => {
        if(removeData && !removeErr) {
            setModal({
                active: true,
                message: "Đã gỡ bài viết"
            })
        }
    }, [removeData, removeErr])

    const onChange = (imageList) => {
        // data for submit
        setImages(imageList);
    };

    const onUploadImage = async () => {
        try {
            if (images.length === 0) return null

            let formData = new FormData()

            const presets = Promise.all(images.map(async image => {
                formData.append("file", image.file)
                formData.append("upload_preset", "main-uploader")
                const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${CloudName}/image/upload`, formData)
                return data?.secure_url
            }))

            return presets
        } catch (error) {
            return null
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setIsUploading(true)
        const presets = await onUploadImage()
        if (presets && presets.length === 1) {
            const dto = {
                ...formData,
                image: presets[0]
            }
            create({
                variables: {
                    data: dto
                }
            })
        }

    }

    const onRemoveBlog = (blogId, index) => {
        let items = [...blogs]
        items.splice(index, 1)
        setBlogs(items)
        remove({
            variables: {
                blogId
            }
        })
    }

    const renderBlogs = () => {
        return blogs.map((elm, index) => {
            return (
                <Grid item xl={3} key={index}>
                    <Card sx={{ maxWidth: 345, border: "1px solid #dcdcdc" }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            height="240"
                            image={elm.image}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {elm.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {elm.content.slice(0, elm.content.length >= 150 ? 150 : elm.content.length - 2)} ........
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" onClick={() => onRemoveBlog(elm._id, index)}>Gỡ bỏ bài viết</Button>
                        </CardActions>
                    </Card>
                </Grid>
            )
        })
    }

    return (
        <MainCard>
            <Grid container spacing={1}>
                <Grid xl={6} item>
                    <Typography variant="h3" sx={{ display: "flex", alignItems: "center", height: "100%" }}>
                        Banner giới thiệu
                    </Typography>
                </Grid>
                <Grid xl={6} item>
                    <Box display={"flex"} justifyContent="flex-end">
                        <Box display={"flex"} justifyContent="flex-end">
                            <Tabs value={menu} onChange={(e, value) => setMenu(value)}>
                                <Tab label="Danh sách" id={`tab-1`} />
                                <Tab label="Thêm mới" id={`tab-2`} />
                            </Tabs>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
            <Divider sx={{ margin: 2 }} />
            {menu === 0
                ? (
                    <SubCard title="Danh sách bài viết">
                        <Grid container spacing={2}>
                            {renderBlogs()}
                        </Grid>
                    </SubCard>
                )
                : (
                    <SubCard title="Thêm bài viết mới">
                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} lg={6}>
                                    <TextField
                                        fullWidth
                                        label="Tiêu đề bài đăng"
                                        required
                                        variant="outlined"
                                        value={formData.title}
                                        onChange={e => setFormData(s => ({ ...s, title: e.target.value }))}

                                    />
                                    <TextField
                                        fullWidth
                                        multiline
                                        minRows={24}
                                        label="Nội dung bài đăng"
                                        required
                                        margin="normal"
                                        variant="outlined"
                                        value={formData.content}
                                        onChange={e => setFormData(s => ({ ...s, content: e.target.value }))}

                                    />
                                </Grid>
                                <Grid item xs={12} lg={6}>
                                    <ReactImageUploading
                                        value={images}
                                        onChange={onChange}
                                        maxNumber={1}
                                        dataURLKey="data_url"
                                    >
                                        {({
                                            imageList,
                                            onImageUpload,
                                            onImageRemoveAll,
                                            onImageUpdate,
                                            onImageRemove,
                                            isDragging,
                                            dragProps,
                                        }) => (
                                            // write your building UI
                                            <div className="upload__image-wrapper">
                                                <ButtonGroup sx={{ display: "flex", justifyContent: "center" }} fullWidth>
                                                    <Button
                                                        style={isDragging ? { color: 'red' } : undefined}
                                                        onClick={onImageUpload}
                                                        {...dragProps}
                                                        variant="contained"
                                                        color="secondary"
                                                    >
                                                        Thêm hình ảnh bài đăng
                                                    </Button>
                                                    &nbsp;
                                                    <Button
                                                        variant="contained"
                                                        color="error"
                                                        onClick={onImageRemoveAll}
                                                    >
                                                        Reset lựa chọn
                                                    </Button>
                                                </ButtonGroup>
                                                <Grid marginTop={2} container spacing={1}>
                                                    {imageList.map((image, index) => (
                                                        <Grid item xs={12} lg={12} key={index}>
                                                            <div className="image-item" style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
                                                                <img src={image['data_url']} alt="" width="100%" />
                                                                <Box sx={{ display: "flex", justifyContent: "center", marginTop: 1 }} fullWidth>
                                                                    <Button variant="outlined" onClick={() => onImageUpdate(index)}>Sửa đổi</Button>
                                                                    <Button variant="outlined" onClick={() => onImageRemove(index)}>Loại bỏ</Button>
                                                                </Box >
                                                            </div>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </div>
                                        )}
                                    </ReactImageUploading>
                                </Grid>
                                <Grid item xs={12} lg={12}>
                                    <SubCard>
                                        <Grid justifyContent="flex-end" container>
                                            <Button variant="contained" color="error" disabled={isUploading} sx={{ margin: "0px 20px" }}>Reset nội dung</Button>
                                            <Box sx={{ m: "0px 4px", position: 'relative' }}>
                                                <Button variant="contained" type="submit" disabled={isUploading}>Thêm bài đăng mới</Button>
                                                {isUploading && (
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
                                    </SubCard>
                                </Grid>
                            </Grid>
                        </form>
                    </SubCard>
                )
            }
            <Notification
                active={modal.active}
                message={modal.message}
                handleClose={() => setModal(s => ({ ...s, active: false }))}
            />
        </MainCard >
    );
}

export default BlogManagement;