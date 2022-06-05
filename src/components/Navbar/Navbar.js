import React, {useEffect, useState} from 'react';
import {AppBar, Typography, Toolbar, Avatar, Button} from '@mui/material';
import memoriesLogo from '../../images/memories-Logo.png';
import memoriesText from '../../images/memories-text.png';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import decode from 'jwt-decode';
import { LOGOUT } from '../../constants/actionTypes';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AppsIcon from '@mui/icons-material/Apps';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

function Navbar() {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const [isLogon,setIsLogon] = useState(false);
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
        <AppBar position="sticky" color="inherit" sx={{borderRadius:5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', 
        alignItems: 'center', }}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}} >
                <Link to="/">
                    <img src={memoriesLogo} alt="icon" height="25px" width="25px" style={{padding:'2px',marginRight:"1px"}}/>
                    <img src={memoriesText} alt="icon" height="25px" width="50px" style={{padding:'2px',marginRight:"1px"}}/>
                </Link>
            </div>
            
            <Toolbar sx={{display:'flex', flexDirection:'row',}}>
                <Button>
                    <KeyboardVoiceIcon fontSize='medium'/>
                </Button>
                <Button>
                    <AppsIcon fontSize='medium' />
                </Button>
                <Button>
                    <MoreVertIcon fontSize='medium'/>
                </Button>
                {user?.result ?  (
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', }}>
                        <Avatar alt={user.result?.name} src={user.result?.imageUrl}  sx={{ p:0, width: 30, height: 30, mr:1 }}>{user.result?.name.charAt(0)}</Avatar>
                        <Typography variant="subtitle2" p={0} mr={1} width={55}>{user.result?.name}</Typography>
                        <Button variant='contained' color='secondary' onClick={logout}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">
                       <AccountCircleOutlinedIcon fontSize='medium'/>Sign In
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;