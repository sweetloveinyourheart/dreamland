import { useMutation } from "@apollo/client";
import { DatePicker } from "@mui/lab";
import { Box, Button, CircularProgress, Divider, Grid, MenuItem, Modal, TextField, Typography } from "@mui/material";
import { Roles, Sex } from "constants/user";
import { CREATE_USER } from "graphql/mutations/create";
import { useEffect, useState } from "react";
import SubCard from "ui-component/cards/SubCard";

const CreateUser = () => {
    const [formData, setFormData] = useState({
        phone: "",
        email: "",
        password: "",
        retypePassword: "",
        name: "",
        birthday: undefined,
        sex: "Male",
        address: "",
        roles: ["User"]
    })

    const [modal, setModal] = useState({
        message: '',
        active: false
    })

    const [register, { data: registerData, loading, error }] = useMutation(CREATE_USER)

    useEffect(() => {
        if (registerData && !error) {
            setModal({
                message: `Tài khoản mới đã tạo thành công!\n - Số điện thoại: ${formData.phone}\n - Mật khẩu: ${formData.password}`,
                active: true
            })
            setFormData({
                phone: "",
                email: "",
                password: "",
                retypePassword: "",
                name: "",
                birthday: "",
                sex: "Male",
                address: "",
                roles: ["User"]
            })
        }

        if (!registerData && error) {
            setModal({
                message: `Tạo tài khoản thất bại, refresh lại trang để thử lại !`,
                active: true
            })
        }
    }, [registerData, error])

    const handleSubmit = (e) => {
        e.preventDefault()

        const { retypePassword, ...data } = formData
        if (data.password !== retypePassword) {
            setModal({ message: 'Mật khẩu không khớp !', active: true })
            return;
        }

        register({
            variables: {
                data
            }
        })
    }

    return (
        <SubCard title="Thêm tài khoản">
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item lg={7}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Số điện thoại"
                                    required
                                    variant="outlined"
                                    value={formData.phone}
                                    onChange={e => setFormData(s => ({ ...s, phone: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    required
                                    label="Họ và tên"
                                    variant="outlined"
                                    value={formData.name}
                                    onChange={e => setFormData(s => ({ ...s, name: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Mật khẩu"
                                    type={"password"}
                                    required
                                    variant="outlined"
                                    value={formData.password}
                                    onChange={e => setFormData(s => ({ ...s, password: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Nhập lại mật khẩu"
                                    type={"password"}
                                    required
                                    variant="outlined"
                                    value={formData.retypePassword}
                                    onChange={e => setFormData(s => ({ ...s, retypePassword: e.target.value }))}
                                />
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Email"
                                    variant="outlined"
                                    value={formData.email}
                                    onChange={e => setFormData(s => ({ ...s, email: e.target.value }))}
                                />
                            </Grid>

                            <Grid item xs={12} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Địa chỉ"
                                    variant="outlined"
                                    value={formData.address}
                                    onChange={e => setFormData(s => ({ ...s, address: e.target.value }))}
                                />
                            </Grid>
                            <Grid xs={12} xl={6} item>
                                <TextField
                                    select
                                    label="Giới tính"
                                    fullWidth
                                    value={formData.sex}
                                    onChange={e => setFormData(s => ({ ...s, sex: e.target.value }))}
                                    margin="normal"
                                >
                                    {Sex.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid xs={12} xl={6} item>
                                <TextField
                                    select
                                    label="Phân quyền"
                                    fullWidth
                                    value={formData.roles[1] ?? formData.roles[0]}
                                    onChange={e => setFormData(s => ({ ...s, roles: ["User", e.target.value] }))}
                                    margin="normal"
                                >
                                    {Roles.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                            {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </Grid>
                            <Grid xs={12} xl={6} item>
                                <Box >
                                    <DatePicker
                                        label="Ngày sinh"
                                        value={formData.birthday}
                                        onChange={(newValue) => {
                                            setFormData(s => ({ ...s, birthday: newValue }))
                                        }}
                                        renderInput={(params) => <TextField {...params} />}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                        <Box sx={{ m: "24px 4px", position: 'relative' }}>
                            <Button variant="contained" type="submit" fullWidth disabled={loading}>Thêm tài khoản mới</Button>
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
                    <Grid item lg={5}>
                        <Box>
                            <Typography fontSize={18} marginBottom={2}>
                                Ghi chú:
                            </Typography>
                        </Box>
                        <Box>
                            <Typography marginBottom={1}>
                                - Số điện thoại dùng để làm tên đăng nhập trong các ứng dụng Mobile
                            </Typography>
                        </Box>
                        <Box>
                            <Typography marginBottom={1}>
                                - Họ và tên, Mật khẩu, Số điện thoại là các trường bắt buộc
                            </Typography>
                        </Box>
                        <Box>
                            <Typography marginBottom={1}>
                                - Email, Địa chỉ, giới tính, ngày sinh là các trường không bắt buộc
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </form>
            <Modal
                open={modal.active}
                onClose={() => setModal(s => ({ ...s, active: !s.active }))}
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
                    <Typography id="modal-modal-description" sx={{ mt: 2 }} whiteSpace={"pre-wrap"}>
                        {modal.message}
                    </Typography>
                </Box>
            </Modal>
        </SubCard>
    );
}

export default CreateUser;