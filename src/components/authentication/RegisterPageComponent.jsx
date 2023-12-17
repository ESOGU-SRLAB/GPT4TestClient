import {
    Avatar,
    Button,
    CssBaseline,
    TextField,
    FormControlLabel,
    Checkbox,
    Link,
    Paper,
    Box,
    Grid,
    Typography,
} from '@mui/material';

import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RegisterPageSideImage from '../../assets/RegisterPageSideImage.png';
import { useState } from 'react';
import { toast } from 'react-toastify';

const RegisterPageComponent = () => {
    const FORM_RESPONSE_MESSAGES = {
        EMAIL_FORMAT_NOT_VALID:
            'The email you have entered is not valid, please provide a valid email address!',
        PASSWORD_FORMAT_NOT_VALID:
            'The password you have entered is not valid, please provide a valid password!',
        PASSWORD_AND_PASSWORD_REPEAT_DO_NOT_MATCH:
            'Password and password repeat do not match!',
        FORM_IS_VALID: 'Registration request sent successfully!',
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        passwordRepeat: '',
    });
    const isEmailValid = (email) => {
        let emailRegEx = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return emailRegEx.test(email);
    };
    const isPasswordValid = (password) => {
        const passwordRegEx =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?.+&])[A-Za-z\d@$!%*?.+&]{6,}$/;
        return passwordRegEx.test(password);
    };
    const arePasswordAndPasswordRepeatSame = (password, passwordRepeat) => {
        return password === passwordRepeat;
    };
    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        let { email, password, passwordRepeat } = formData;
        if (!isEmailValid(email)) {
            toast.error(FORM_RESPONSE_MESSAGES.EMAIL_FORMAT_NOT_VALID);
        }

        if (!isPasswordValid(password)) {
            toast.error(FORM_RESPONSE_MESSAGES.PASSWORD_FORMAT_NOT_VALID);
        }

        if (!arePasswordAndPasswordRepeatSame(password, passwordRepeat)) {
            toast.error(
                FORM_RESPONSE_MESSAGES.PASSWORD_AND_PASSWORD_REPEAT_DO_NOT_MATCH
            );
            return;
        }
        toast.success(FORM_RESPONSE_MESSAGES.FORM_IS_VALID);
    };
    return (
        <Grid container component="main" sx={{ height: '100vh' }}>
            <Grid
                item
                xs={false}
                sm={4}
                md={7}
                sx={{
                    backgroundImage: `url(${RegisterPageSideImage})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            />
            <Grid
                item
                xs={12}
                sm={8}
                md={5}
                component={Paper}
                elevation={6}
                square
            >
                <Box
                    sx={{
                        my: 8,
                        mx: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: '#653589' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up GPT4Test
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
                    >
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={handleChange}
                            value={formData.email}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="passwordRepeat"
                            label="Password Repeat"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={handleChange}
                            value={formData.passwordRepeat}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2, bgcolor: '#7edd2a' }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent={'flex-end'}>
                            <Grid item>
                                <Link href="/login" variant="body2">
                                    {'Already have an account? Sign In'}
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>
    );
};

export default RegisterPageComponent;
