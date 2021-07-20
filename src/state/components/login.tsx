import React from 'react'
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    TextField,
    Button,
    Paper
} from '@material-ui/core'
import {useFormik} from "formik";
import {loginTC} from "../reducer/auth-reducer";
import {useDispatch} from "react-redux";
import {Redirect} from "react-router-dom";


type LoginType = {
    isLoggedIn: boolean
}

export const Login = (props: LoginType) => {

    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: any = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }

            if (!values.password) {
                errors.password = 'Required';
            } else if (values.password.length < 2) {
                errors.password = 'Invalid password address';
            }

            return errors;
        },
        onSubmit: (values) => {
            dispatch(loginTC(values))
            formik.resetForm()
        },
    })


    if (props.isLoggedIn) {
        return <Redirect to={'/'}/>
    }

    return (
        <div className={'login-container'}>
            <Paper>
                <form onSubmit={formik.handleSubmit}>
                    <FormControl>
                        <Paper style={{padding: '30px',width:'350px'}}>
                            <h2 style={{textAlign: 'center'}}>Login</h2>
                            <FormLabel>
                                <p>Test login</p>
                                <p>Email: antongaliata@gmail.com</p>
                                <p>Password: 1033393qwe</p>
                            </FormLabel>
                            <FormGroup>
                                <TextField
                                    label="Email"
                                    id='email'
                                    margin="normal"
                                    {...formik.getFieldProps('email')}
                                />
                                {<div style={{
                                    height: '30px',
                                    color: formik.errors.email === 'Required' ? 'black' : 'red'
                                }}>{formik.touched.email && formik.errors.email ? (
                                    <div>{formik.errors.email}</div>
                                ) : null}</div>}
                                <TextField
                                    id='password'
                                    type='password'
                                    label="Password"
                                    margin="normal"
                                    {...formik.getFieldProps('password')}
                                />
                                {<div style={{
                                    height: '30px',
                                    color: formik.errors.password === 'Required' ? 'black' : 'red'
                                }}>{formik.touched.password && formik.errors.password ? (
                                    <div>{formik.errors.password}</div>
                                ) : null}</div>}
                                <FormControlLabel
                                    label={'Remember me'}
                                    control={<Checkbox onChange={formik.handleChange}
                                                       checked={formik.values.rememberMe}
                                                       name='rememberMe'/>}
                                />
                                <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                            </FormGroup>
                        </Paper>
                    </FormControl>
                </form>
            </Paper>
        </div>
    )
}
