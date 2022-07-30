import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// assets
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { useAuth } from 'contexts/auth';
import { useNavigate } from 'react-router';

// ============================|| FIREBASE - LOGIN ||============================ //

const FirebaseLogin = ({ ...others }) => {
    const theme = useTheme();
    const navigate = useNavigate()

    const { login, user, loading, error } = useAuth()

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard')
        }
    }, [user])

    return (
        <>
            <Formik
                initialValues={{
                    phone: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    phone: Yup.string().max(255).required('Phone is required'),
                    password: Yup.string().max(255).required('Password is required')
                })}
                onSubmit={(values) => {
                    login(values.phone, values.password)
                }}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.phone && errors.phone)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">Username</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="tel"
                                value={values.phone}
                                name="phone"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label="Phone number"
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>

                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        {error && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{"Đăng nhập thất bại !"}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={loading}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    Đăng nhập
                                </Button>
                            </AnimateButton>
                        </Box>
                    </form>
                )}
            </Formik>
        </>
    );
};

export default FirebaseLogin;
