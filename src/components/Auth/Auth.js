import React, {useState} from 'react';
import { Container, Paper, TextField, Typography,Grid, Button } from "@mui/material";

function Auth() {
    const initialState = { firstName: '', 
                            lastName: '', 
                            email: '', 
                            password: '', 
                            confirmPassword: '' };
    const [isSignup,setIsSignup] = useState(false);
    const [showPassword,setShowPassword] = useState(false);
    const [form,setForm] = useState(initialState);
    const handleChange= (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setForm(initialState);
        setIsSignup((prevIsSignup)=>!prevIsSignup);
        setShowPassword(false);
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        if (isSignup) {
        //   dispatch(signup(form, history));
        } else {
        //   dispatch(signin(form, history));
        }
    }
    
    const handleShowPassword= () =>{
        setShowPassword(!showPassword);
    }

    return (
        <Container maxWidth='xs'>
            <Paper elevation={2} sx={{p:1, mt:1, display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography variant="h4">{isSignup ? 'Sign up' : 'Sign In'}</Typography>
                <Grid container sm={12}>
                    <form style={{mt:2}} onSubmit={handleSubmit}>
                        { isSignup && (
                            <>
                            <TextField name="firstName" label="First Name" handleChange={handleChange} sx={{mb:1}} autoFocus fullWidth/>
                            <TextField name="lastName" label="Last Name" handleChange={handleChange} sx={{mb:1}} autoFocus fullWidth/>
                            </>
                        )}
                            <TextField name="email" label="Email" type="email" handleChange={handleChange} sx={{mb:1}} autoFocus fullWidth/>
                            <TextField name="password" label="Password" type={showPassword ? "text" :"password" } handleChange={handleChange} 
                            handleShowPassword={handleShowPassword} sx={{mb:1}} autoFocus fullWidth/>
                        { isSignup && (
                                <TextField name="confirmPassword" label="Repeat Password" handleChange={handleChange} sx={{mb:1}} 
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