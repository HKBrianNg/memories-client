import React, {useState} from 'react';
import { Container, Paper, TextField, Typography,Grid, Button, InputAdornment, IconButton, OutlinedInput } from "@mui/material";
import { signin, signup } from '../../actions/auth';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

function Auth() {
    const initialState = { firstName: '', 
                            lastName: '', 
                            email: '', 
                            password: '', 
                            confirmPassword: '' };
    const [isSignup,setIsSignup] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [formData,setFormData] = useState(initialState);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleChange= (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setFormData(initialState);
        setIsSignup((prevIsSignup)=>!prevIsSignup);
        setShowPassword(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isSignup) {
            dispatch(signup(formData,navigate));
        } else {
            dispatch(signin(formData,navigate));
        }
    }
    
    const handleShowPassword= () =>{
        setShowPassword(!showPassword);
    }

    return (
        <Container maxWidth='xs'>
            <Paper elevation={2} sx={{p:1, mt:1, display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography variant="h4">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
                <Grid item sm={12}>
                    <form style={{mt:2}} onSubmit={handleSubmit}>
                        { isSignup && (
                            <>
                            <TextField name="firstName" label="First Name" onChange={handleChange} sx={{mb:1}} autoFocus fullWidth/>
                            <TextField name="lastName" label="Last Name" onChange={handleChange} sx={{mb:1}} autoFocus fullWidth/>
                            </>
                        )}
                            <TextField autoComplete='on' name="email" label="Email" type="email" onChange={handleChange} sx={{mb:1}} autoFocus fullWidth/>
                            <OutlinedInput autoComplete='on' name="password" label="Password" type={showPassword ? "text" :"password" } 
                                        onChange={handleChange} sx={{mb:1}} autoFocus fullWidth
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton aria-label="toggle password visibility" onClick={handleShowPassword} edge="end">
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        } 
                            />
                        { isSignup && (
                                <TextField name="confirmPassword" label="Repeat Password" onChange={handleChange} sx={{mb:1}} 
                                autoFocus fullWidth/>
                            )
                        }
                        <Button type="submit" variant="contained" color="primary" sx={{mb:1}} autoFocus fullWidth>
                            { isSignup ? 'Sign Up' : 'Sign In' }
                        </Button>
                        <Button onClick={switchMode} fullWidth>
                            {isSignup ? 'Already have an account ? Sign in' : "Don't have an account? Sign Up"}
                        </Button>
                    </form>
                </Grid>
            </Paper>
        </Container>
    )
}

export default Auth;