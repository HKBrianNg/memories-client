import React, {useEffect, useState} from 'react';
import {AppBar, Typography, Toolbar, Avatar, Button} from '@mui/material';
import memories from '../../images/memories.png';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import { LOGOUT } from '../../constants/actionTypes';

function Navbar() {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    
    const logout = ()=> {
        dispatch({type: LOGOUT});
        navigate("/",{replace:true});
        setUser(null);
    }
    
    useEffect(()=>{
        const token = user?.token;
        if (token) {
            const decodedToken = decode(token);
            if (decodedToken.exp*1000 < new Date().getTime()) logout();
        }
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[location]);

    return (
        <AppBar position="static" color="inherit" sx={{borderRadius:5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', 
        alignItems: 'center', }}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}} >
                <Typography component={Link} to="/" variant='h6' color='green' width={80} p={1} mr={1} 
                    sx={{textDecoration:'none'}}>Memories</Typography>
                <img src={memories} alt="icon" height="30" width="30" style={{ borderRadius:'10px' }}/>
            </div>
            <Toolbar sx={{display:'flex', flexDirection:'row', alignItem:'flex-end', width:'200px',}}>
                {user?.result ?  (
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', }}>
                        <Avatar alt={user.result?.name} src={user.result?.imageUrl}  sx={{ p:0, width: 30, height: 30, mr:1 }}>{user.result?.name.charAt(0)}</Avatar>
                        <Typography variant="subtitle2" p={0} mr={1} width={55}>{user.result?.name}</Typography>
                        <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;