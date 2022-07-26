import { Button, ButtonGroup, CircularProgress, Divider, FormControl, Grid, MenuItem, TextField, Typography, Modal } from '@mui/material';
import { useEffect, useState } from 'react';
import SubCard from 'ui-component/cards/SubCard';
import { Box } from '@mui/system';
import { apartmentType, businessPremisesType, categories, directions, furniture, houseType, landType, legalDocuments, ownerType, realEstateStatus } from 'constants/realestate';
import ImageUploading from 'react-images-uploading';
import { useAddress } from 'contexts/address';
import { useMutation, useQuery } from '@apollo/client';
import { CREATE_APARTMENT_POST, CREATE_BUSINESS_PREMISES_POST, CREATE_HOUSE_POST, CREATE_LAND_POST, CREATE_MOTAL_POST } from 'graphql/mutations/create';
import axios from 'axios'
import { CloudName } from 'constants/cloudinary';
import { GET_ALL_PROJECT_POSTS } from 'graphql/queries/project';

const CreateRSPost = ({ type, goBack }) => {
    const [projects, setProjects] = useState([])
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "MuaBan",
        overview: {},
        owner: {
            type: "CaNhan",
            user: {
                name: "",
                phone: ""
            }
        },
        detail: {},
        media: {
            images: [],
            videos: []
        },
        virtual3DLink: "",
        googleMapsLink: ""
    })

    const [selectedAddress, setSelectedAdress] = useState({
        province: undefined,
        district: undefined,
        ward: undefined
    })

    const [modal, setModal] = useState({
        message: '',
        active: false,
        success: false
    })

    const [isUploading, setIsUploading] = useState(false)

    const { data: projectsData, error: projectsErr } = useQuery(GET_ALL_PROJECT_POSTS, {
        notifyOnNetworkStatusChange: true
    })

    const { provinces } = useAddress()

    const [images, setImages] = useState([]);
    const maxNumber = 10;

    const [createApartment, { data: createApartmentData, error: createApartmentErr }] = useMutation(CREATE_APARTMENT_POST)
    const [createHouse, { data: createHouseData, error: createHouseErr }] = useMutation(CREATE_HOUSE_POST)
    const [createLand, { data: createLandData, error: createLandErr }] = useMutation(CREATE_LAND_POST)
    const [createBusinessPremises, { data: createBusinessPremisesData, error: createBusinessPremisesErr }] = useMutation(CREATE_BUSINESS_PREMISES_POST)
    const [createMotal, { data: createMotalData, error: createMotalErr }] = useMutation(CREATE_MOTAL_POST)

    useEffect(() => {
        if (projectsData) {
            setProjects(projectsData.projects)
        }
    }, [projectsData, projectsErr])

    const onChange = (imageList) => {
        // data for submit
        setImages(imageList);
    };

    const resetForm = () => {
        setFormData({
            title: "",
            description: "",
            category: "MuaBan",
            overview: {},
            owner: {},
            detail: {},
            media: {
                images: [],
                videos: []
            }
        })
        setImages([])
        setSelectedAdress({
            province: undefined,
            district: undefined,
            ward: undefined
        })
    }

    const onUploadImage = async () => {
        try {
            if (images.length === 0) {
                setIsUploading(false)
                setModal({
                    message: 'Chưa có hình ảnh !',
                    active: false,
                    success: false
                })
                return null
            }

            let formData = new FormData()

            const presets = Promise.all(images.map(async image => {
                formData.append("file", image.file)
                formData.append("upload_preset", "realestate")
                const { data } = await axios.post(`https://api.cloudinary.com/v1_1/${CloudName}/image/upload`, formData)
                return data?.secure_url
            }))

            return presets
        } catch (error) {
            return null
        }
    }

    const activeMutation = (imagePresets) => {
        if (type === "can-ho-chung-cu") {
            createApartment({
                variables: {
                    data: {
                        ...formData,
                        media: {
                            images: imagePresets,
                            videos: []
                        }
                    }
                }
            })
        }

        if (type === "nha-o") {
            createHouse({
                variables: {
                    data: {
                        ...formData,
                        media: {
                            images: imagePresets,
                            videos: []
                        }
                    }
                }
            })
        }

        if (type === "dat") {
            createLand({
                variables: {
                    data: {
                        ...formData,
                        media: {
                            images: imagePresets,
                            videos: []
                        }
                    }
                }
            })
        }

        if (type === "van-phong-mat-bang") {
            createBusinessPremises({
                variables: {
                    data: {
                        ...formData,
                        media: {
                            images: imagePresets,
                            videos: []
                        }
                    }
                }
            })
        }

        if (type === "phong-tro") {
            createMotal({
                variables: {
                    data: {
                        ...formData,
                        media: {
                            images: imagePresets,
                            videos: []
                        },
                        category: "ChoThue"
                    }
                }
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsUploading(true)
        const imagePresets = await onUploadImage()

        if (imagePresets) {
            activeMutation(imagePresets)
        }
    }

    const renderType = () => {
        switch (type) {
            case "can-ho-chung-cu":
                return apartmentType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))

            case "nha-o":
                return houseType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))

            case "dat":
                return landType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))

            case "van-phong-mat-bang":
                return businessPremisesType.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                        {option.label}
                    </MenuItem>
                ))

            default:
                return (
                    <MenuItem value="" disabled>
                        Chọn loại hình
                    </MenuItem>
                )
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
        setIsUploading(false)
        if (createApartmentData || createHouseData || createLandData || createBusinessPremisesData || createMotalData) {
            resetForm()
            setModal({
                message: "Đăng tin thành công !",
                active: true,
                success: true
            })
        }

        if (createApartmentErr || createHouseErr || createLandErr || createBusinessPremisesErr || createMotalErr) {
            setModal({
                message: "Đăng tin thất bại !",
                active: true,
                success: false
            })
        }
    }, [
        createApartmentData,
        createApartmentErr,
        createHouseData,
        createHouseErr,
        createLandData,
        createLandErr,
        createBusinessPremisesData,
        createBusinessPremisesErr,
        createMotalData,
        createMotalErr
    ])

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} lg={7}>
                    <SubCard title="Thông tin căn hộ">
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <form onSubmit={handleSubmit}>
                                    <Box margin={"12px 0"}>
                                        <Typography variant='h4' marginBottom={1}>
                                            Thông tin chi tiết
                                        </Typography>
                                        <Divider />
                                        <Grid container marginBottom={4} spacing={1}>
                                            <Grid xs={12} xl={6} item>
                                                <TextField
                                                    id="pricing.total"
                                                    fullWidth
                                                    label="Giá"
                                                    required
                                                    variant="outlined"
                                                    type={"number"}
                                                    margin="normal"
                                                    value={formData.detail?.pricing?.total ?? ""}
                                                    onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, pricing: { ...s.detail?.pricing, total: Number(e.target.value) } } }))}
                                                />
                                            </Grid>
                                            <Grid xs={12} xl={6} item>
                                                <TextField
                                                    id="pricing.deposit"
                                                    fullWidth
                                                    label="Đặt cọc"
                                                    type={"number"}
                                                    variant="outlined"
                                                    margin="normal"
                                                    value={formData.detail?.pricing?.deposit ?? ""}
                                                    onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, pricing: { ...s.detail?.pricing, deposit: Number(e.target.value) } } }))}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container marginBottom={4} spacing={1}>
                                            {type !== "phong-tro"
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="position.blockName"
                                                            name='detail.position.blockName'
                                                            fullWidth label="Block/Tháp"
                                                            variant="outlined"
                                                            margin="normal"
                                                            value={formData.detail?.position?.blockName ?? ""}
                                                            onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, position: { ...s.detail?.position, blockName: e.target.value } } }))}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                            {type !== "phong-tro"
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="code"
                                                            name='code'
                                                            fullWidth
                                                            label="Mã căn"
                                                            variant="outlined"
                                                            margin="normal"
                                                            value={formData.detail?.position?.code?.value ?? ""}
                                                            onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, position: { ...s.detail?.position, code: { ...s.detail?.position?.code, value: e.target.value } } } }))}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                            {type === "can-ho-chung-cu" || type === "van-phong-mat-bang"
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="position.floorNumber"
                                                            name='position.floorNumber'
                                                            fullWidth
                                                            label="Tầng số"
                                                            variant="outlined"
                                                            margin="normal"
                                                            value={formData.detail?.position?.floorNumber ?? ""}
                                                            onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, position: { ...s.detail?.position, floorNumber: Number(e.target.value) } } }))}

                                                        />
                                                    </Grid>
                                                )
                                            }
                                            {type !== "phong-tro"
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="project"
                                                            select
                                                            name='project'
                                                            fullWidth
                                                            label="Dự án"
                                                            variant="outlined"
                                                            onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, project: e.target.value } }))}
                                                            margin="normal"
                                                            value={formData.detail?.project ?? ""}
                                                            defaultValue=""
                                                        >
                                                            {projects.map((option, index) => (
                                                                <MenuItem key={index} value={option._id} >
                                                                    {option.projectName}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                )
                                            }
                                        </Grid>
                                        <Grid container marginBottom={4} spacing={1}>
                                            <Grid xs={12} xl={6} item>
                                                <TextField
                                                    id="province"
                                                    name='province'
                                                    fullWidth
                                                    label="Tỉnh"
                                                    required
                                                    variant="outlined"
                                                    margin="normal"
                                                    value={formData.detail?.address?.province ?? ""}
                                                    select
                                                    defaultValue={""}
                                                    onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, address: { ...s.detail?.address, province: e.target.value } } }))}

                                                >
                                                    {provinces.map((option, index) => (
                                                        <MenuItem key={index} value={option.name} onClick={() => setSelectedAdress(s => ({ ...s, province: option }))}>
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid xs={12} xl={6} item>
                                                <TextField
                                                    id="district"
                                                    name='district'
                                                    fullWidth
                                                    label="Quận/Huyện"
                                                    required
                                                    variant="outlined"
                                                    defaultValue={""}
                                                    select
                                                    value={formData.detail?.address?.district ?? ""}
                                                    onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, address: { ...s.detail?.address, district: e.target.value } } }))}
                                                    margin="normal"
                                                >
                                                    {selectedAddress.province?.districts.map((option, index) => (
                                                        <MenuItem key={index} value={option.name} onClick={() => setSelectedAdress(s => ({ ...s, district: option }))}>
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid xs={12} xl={6} item>
                                                <TextField
                                                    id="ward"
                                                    name='ward'
                                                    fullWidth
                                                    label="Xã/Phường"
                                                    required
                                                    variant="outlined"
                                                    defaultValue={""}
                                                    select
                                                    value={formData.detail?.address?.ward ?? ""}
                                                    onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, address: { ...s.detail?.address, ward: e.target.value } } }))}
                                                    margin="normal"
                                                >
                                                    {selectedAddress.district?.wards.map((option, index) => (
                                                        <MenuItem key={index} value={option.name} onClick={e => setSelectedAdress(s => ({ ...s, ward: option }))}>
                                                            {option.name}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            <Grid xs={12} xl={6} item>
                                                <TextField
                                                    id="street"
                                                    name='street'
                                                    fullWidth
                                                    label="Tên đường"
                                                    required
                                                    variant="outlined"
                                                    margin="normal"
                                                    value={formData.detail?.address?.street ?? ""}
                                                    onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, address: { ...s.detail?.address, street: e.target.value } } }))}
                                                />
                                            </Grid>
                                            <Grid xs={12} xl={6} item>
                                                <TextField
                                                    id="houseNumber"
                                                    name='houseNumber'
                                                    fullWidth
                                                    label="Số nhà"
                                                    variant="outlined"
                                                    value={formData.detail?.address?.houseNumber ?? ""}
                                                    margin="normal"
                                                    onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, address: { ...s.detail?.address, houseNumber: e.target.value } } }))}
                                                />
                                            </Grid>
                                        </Grid>
                                        <Grid container marginBottom={4} spacing={1}>
                                            <Grid xs={12} xl={6} item>
                                                <TextField
                                                    id="totalAcreage"
                                                    name='totalAcreage'
                                                    fullWidth
                                                    type={"number"}
                                                    label="Tổng diện tích"
                                                    required
                                                    variant="outlined"
                                                    value={formData.detail?.acreage?.totalAcreage ?? ""}
                                                    margin="normal"
                                                    onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, acreage: { ...s.detail?.acreage, totalAcreage: Number(e.target.value) } } }))}
                                                />
                                            </Grid>
                                            {type === "nha-o"
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="usedAcreage"
                                                            name='usedAcreage'
                                                            fullWidth
                                                            type={"number"}
                                                            label="Diện tích sử dụng"
                                                            value={formData.detail?.acreage?.usedAcreage ?? ""}

                                                            variant="outlined"
                                                            margin="normal"
                                                            onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, acreage: { ...s.detail?.acreage, usedAcreage: Number(e.target.value) } } }))}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                            {(type === "nha-o" || type === "dat")
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="width"
                                                            name='width'
                                                            fullWidth
                                                            type={"number"}
                                                            label="Chiều ngang"
                                                            value={formData.detail?.acreage?.width ?? ""}
                                                            variant="outlined"
                                                            margin="normal"
                                                            onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, acreage: { ...s.detail?.acreage, width: Number(e.target.value) } } }))}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                            {(type === "nha-o" || type === "dat")
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="height"
                                                            name='height'
                                                            fullWidth
                                                            type={"number"}
                                                            label="Chiều dài"
                                                            value={formData.detail?.acreage?.height ?? ""}

                                                            variant="outlined"
                                                            margin="normal"
                                                            onChange={e => setFormData(s => ({ ...s, detail: { ...s.detail, acreage: { ...s.detail?.acreage, height: Number(e.target.value) } } }))}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                        </Grid>
                                    </Box>

                                    <Box margin={"12px 0"}>
                                        <Typography variant='h4' marginBottom={1}>
                                            Thông tin tổng quan
                                        </Typography>
                                        <Divider />
                                        <Grid container marginBottom={4} spacing={1}>
                                            <Grid xs={12} xl={6} item>
                                                <TextField
                                                    id="doorDirection"
                                                    name='doorDirection'
                                                    select
                                                    label="Hướng cửa chính"
                                                    fullWidth
                                                    value={formData.overview?.doorDirection ?? ""}
                                                    onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, doorDirection: e.target.value } }))}
                                                    defaultValue={""}
                                                    margin="normal"
                                                >
                                                    {directions.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            {type === "can-ho-chung-cu"
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="overview.balconyDirection"
                                                            name='overview.balconyDirection'
                                                            fullWidth
                                                            select
                                                            label="Hướng ban công"
                                                            value={formData.overview?.balconyDirection ?? ""}
                                                            onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, balconyDirection: e.target.value } }))}
                                                            defaultValue={""}
                                                            margin="normal"
                                                        >
                                                            {directions.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                )
                                            }

                                            {type === "can-ho-chung-cu"
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="overview.status"
                                                            name='overview.status'
                                                            fullWidth
                                                            select
                                                            label="Tình trạng bất động sản"
                                                            value={formData.overview?.status ?? ""}
                                                            onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, status: e.target.value } }))}
                                                            defaultValue={""}
                                                            margin="normal"
                                                        >
                                                            {realEstateStatus.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                )
                                            }
                                            {(type === "nha-o" || type === "can-ho-chung-cu" || type === "van-phong-mat-bang" || type === 'phong-tro')
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="overview.furniture"
                                                            name='overview.furniture'
                                                            fullWidth
                                                            select
                                                            label="Tình trạng nội thất"
                                                            value={formData.overview?.furniture ?? ""}
                                                            onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, furniture: e.target.value } }))}
                                                            defaultValue={""}
                                                            margin="normal"
                                                        >
                                                            {furniture.map((option) => (
                                                                <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                </MenuItem>
                                                            ))}
                                                        </TextField>
                                                    </Grid>
                                                )
                                            }
                                            {type !== "phong-tro"
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="overview.type"
                                                            name='overview.type'
                                                            fullWidth
                                                            select
                                                            required
                                                            label="Loại hình"
                                                            value={formData.overview?.type ?? ""}
                                                            onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, type: e.target.value } }))}
                                                            defaultValue={""}
                                                            margin="normal"
                                                        >
                                                            {renderType()}
                                                        </TextField>
                                                    </Grid>
                                                )
                                            }
                                            <Grid xs={12} xl={6} item>
                                                <TextField
                                                    id="overview.legalDocuments"
                                                    name='overview.legalDocuments'
                                                    fullWidth
                                                    select
                                                    label="Giấy tờ pháp lý"
                                                    value={formData.overview?.legalDocuments ?? ""}
                                                    onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, legalDocuments: e.target.value } }))}
                                                    defaultValue={""}
                                                    margin="normal"
                                                >
                                                    {legalDocuments.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                            {(type === "nha-o" || type === "dat")
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="overview.noHau"
                                                            name='overview.noHau'
                                                            fullWidth
                                                            select
                                                            label="Nở hậu"
                                                            value={formData.overview?.noHau ?? ""}
                                                            onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, noHau: e.target.value } }))}
                                                            defaultValue={""}
                                                            margin="normal"
                                                        >
                                                            <MenuItem value={true}>
                                                                Nở hậu
                                                            </MenuItem>
                                                            <MenuItem value={false}>
                                                                Không đề cập
                                                            </MenuItem>
                                                        </TextField>
                                                    </Grid>
                                                )
                                            }
                                            {(type === "nha-o" || type === "dat")
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="overview.frontispiece"
                                                            name='overview.frontispiece'
                                                            fullWidth
                                                            select
                                                            label="Nhà mặt tiền"
                                                            value={formData.overview?.frontispiece ?? ""}
                                                            onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, frontispiece: e.target.value } }))}
                                                            defaultValue={""}
                                                            margin="normal"
                                                        >
                                                            <MenuItem value={true}>
                                                                Nhà mặt tiền
                                                            </MenuItem>
                                                            <MenuItem value={false}>
                                                                Không đề cập
                                                            </MenuItem>
                                                        </TextField>
                                                    </Grid>
                                                )
                                            }
                                            {(type === "nha-o" || type === "dat")
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            id="overview.carAlley"
                                                            name='overview.carAlley'
                                                            fullWidth
                                                            select
                                                            label="Hẻm xe hơi"
                                                            value={formData.overview?.carAlley ?? ""}
                                                            onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, carAlley: e.target.value } }))}
                                                            defaultValue={""}
                                                            margin="normal"
                                                        >
                                                            <MenuItem value={true}>
                                                                Hẻm xe hơi
                                                            </MenuItem>
                                                            <MenuItem value={false}>
                                                                Không đề cập
                                                            </MenuItem>
                                                        </TextField>
                                                    </Grid>
                                                )
                                            }
                                        </Grid>

                                        <Grid container marginBottom={4} spacing={2}>
                                            {(type === "can-ho-chung-cu" || type === 'nha-o')
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            name='overview.numberOfBedrooms'
                                                            label="Số phòng ngủ"
                                                            type={"number"}
                                                            fullWidth
                                                            required
                                                            onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, numberOfBedrooms: Number(e.target.value) } }))}
                                                            value={formData.overview?.numberOfBedrooms ?? ""}

                                                        />
                                                    </Grid>
                                                )}
                                            {(type === "can-ho-chung-cu" || type === 'nha-o')
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            name='overview.numberOfBathrooms'
                                                            label="Số phòng vệ sinh"
                                                            type={"number"}
                                                            fullWidth
                                                            onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, numberOfBathrooms: Number(e.target.value) } }))}
                                                            value={formData.overview?.numberOfBathrooms ?? ""}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                            {(type === "nha-o" || type === "phong-tro")
                                                && (
                                                    <Grid xs={12} xl={6} item>
                                                        <TextField
                                                            name='overview.numberOfFloors'
                                                            label="Tổng số tầng"
                                                            type={"number"}
                                                            fullWidth
                                                            onChange={e => setFormData(s => ({ ...s, overview: { ...s.overview, numberOfFloors: Number(e.target.value) } }))}
                                                            value={formData.overview.numberOfFloors ?? ""}
                                                        />
                                                    </Grid>
                                                )
                                            }
                                        </Grid>

                                    </Box>

                                    <Box margin={"12px 0"}>
                                        <Typography variant='h4' marginBottom={1}>
                                            Thông tin bài đăng
                                        </Typography>
                                        <Divider />
                                        <TextField
                                            id="title"
                                            name='title'
                                            fullWidth
                                            label="Tiêu đề tin đăng"
                                            required
                                            variant="outlined"
                                            margin="normal"
                                            value={formData.title}
                                            onChange={e => setFormData(s => ({ ...s, title: e.target.value }))}

                                        />
                                        <TextField
                                            id="description"
                                            multiline
                                            minRows={24}
                                            name="description"
                                            required
                                            fullWidth
                                            label="Chi tiết bài đăng"
                                            variant="outlined"
                                            margin="normal"
                                            value={formData.description}
                                            onChange={e => setFormData(s => ({ ...s, description: e.target.value }))}
                                        />
                                        <TextField
                                            id="category"
                                            name='category'
                                            select
                                            required
                                            fullWidth
                                            label="Danh mục"
                                            value={formData.category}
                                            onChange={e => setFormData(s => ({ ...s, category: e.target.value }))}
                                            helperText="Chọn danh mục bài đăng"
                                            defaultValue={""}
                                            margin="normal"
                                        >
                                            {categories.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            id="code"
                                            name="code"
                                            required
                                            label="Mã bài đăng"
                                            variant="outlined"
                                            margin="normal"
                                            value={formData.code}
                                            onChange={e => setFormData(s => ({ ...s, code: e.target.value }))}
                                        />

                                        <TextField
                                            fullWidth
                                            label="Link thực tế ảo 3D"
                                            value={formData.virtual3DLink ?? ""}
                                            onChange={e => setFormData(s => ({ ...s, virtual3DLink: e.target.value }))}
                                            defaultValue={""}
                                            margin="normal"
                                        />

                                        <TextField
                                            fullWidth
                                            label="Link Google Maps"
                                            value={formData.googleMapsLink ?? ""}
                                            onChange={e => setFormData(s => ({ ...s, googleMapsLink: e.target.value }))}
                                            defaultValue={""}
                                            margin="normal"
                                        />
                                    </Box>

                                    <Box margin={"12px 0"}>
                                        <Typography variant='h4' marginBottom={1}>
                                            Chủ sở hữu
                                        </Typography>
                                        <Divider />
                                        <Grid container marginBottom={4} spacing={1}>
                                            <Grid xl={6} item>
                                                <TextField
                                                    id="owner.user.name"
                                                    name='owner.user.name'
                                                    fullWidth
                                                    label="Tên chủ sở hữu"
                                                    required
                                                    variant="outlined"
                                                    margin="normal"
                                                    onChange={e => setFormData(s => ({ ...s, owner: { ...s.owner, user: { ...s.owner?.user, name: e.target.value } } }))}
                                                    value={formData.owner?.user?.name ?? ""}
                                                />
                                            </Grid>
                                            <Grid xl={6} item>
                                                <TextField
                                                    id="owner.user.phone"
                                                    name='owner.user.phone'
                                                    fullWidth
                                                    label="Số điện thoại"
                                                    required
                                                    variant="outlined"
                                                    margin="normal"
                                                    onChange={e => setFormData(s => ({ ...s, owner: { ...s.owner, user: { ...s.owner?.user, phone: e.target.value } } }))}
                                                    value={formData.owner?.user?.phone ?? ""}
                                                />
                                            </Grid>
                                            <Grid xl={6} item>
                                                <TextField
                                                    id="owner.type"
                                                    name='owner.type'
                                                    fullWidth
                                                    required
                                                    select
                                                    label="Cá nhân/Môi giới"
                                                    value={formData.owner?.type ?? ""}
                                                    onChange={e => setFormData(s => ({ ...s, owner: { ...s.owner, type: e.target.value } }))}
                                                    margin="normal"
                                                >
                                                    {ownerType.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </TextField>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                    <Grid justifyContent="flex-end" container>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            disabled={isUploading}
                                            sx={{ margin: "0px 20px" }}
                                            onClick={() => resetForm()}
                                        >
                                            Reset nội dung
                                        </Button>
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
                                </form>
                            </FormControl>
                        </Grid>
                    </SubCard>
                </Grid>
                <Grid item xs={12} lg={5} >
                    <SubCard title="Hình ảnh">
                        <Grid item sm={12} xs={12}>
                            <ImageUploading
                                multiple
                                value={images}
                                onChange={onChange}
                                maxNumber={maxNumber}
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
                                                Thêm hình ảnh
                                            </Button>
                                            &nbsp;
                                            <Button
                                                variant="contained"
                                                color="error"
                                                onClick={onImageRemoveAll}
                                            >
                                                Reset bộ ảnh
                                            </Button>
                                        </ButtonGroup>
                                        <Grid marginTop={2} container spacing={1}>
                                            {imageList.map((image, index) => (
                                                <Grid item xs={12} lg={6} key={index}>
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
                            </ImageUploading>
                        </Grid>
                    </SubCard>
                </Grid>
            </Grid >
            <Modal
                open={modal.active}
                onClose={() => onCloseModal()}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '1px solid #eee',
                    boxShadow: 0,
                    p: 4,
                }}>
                    <Typography id="modal-modal-title" variant="h4" component="h2" marginBottom={1}>
                        Thông báo
                    </Typography>
                    <Divider />
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {modal.message}
                    </Typography>
                </Box>
            </Modal>
        </Box >
    );
}

export default CreateRSPost;