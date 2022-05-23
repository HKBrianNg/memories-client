import React, {useEffect, useState} from 'react';
import {AppBar, Typography, Toolbar, Avatar, Button} from '@mui/material';
import memories from '../../images/memories.png';
import {Link} from 'react-router-dom';

function Navbar() {
    
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    useEffect(()=>{
        const token = user?.token;
        setUser(JSON.parse(localStorage.getItem('profile')));
    },[]);
    // const user = {
    //     result: {
    //         name:'brian',
    //         imageUrl: '',
    //     },
    // }

    return (
        <AppBar position="static" color="inherit" sx={{borderRadius:5, display: 'flex', flexDirection: 'row', justifyContent: 'space-between', 
        alignItems: 'center', }}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}} >
                <Typography component={Link} to="/" variant='h5' color='green' p={1} mr={1} sx={{textDecoration:'none'}}>Memories</Typography>
                {/* <Typography variant='h2' color='green' p={0} mr={2}>Memories</Typography> */}
                <img src={memories} alt="icon" height="30" style={{ borderRadius:'10px' }}/>
            </div>
            <Toolbar sx={{display:'flex', flexDirection:'row', alignItem:'flex-end', width:'200px',}}>
                {user ? (
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', }}>
                        <Avatar alt={user.result.name} src={user.result.imageUrl}  sx={{ p:0, width: 30, height: 30, mr:1 }}>{user.result.name.charAt(0)}</Avatar>
                        <Typography variant="h6" p={0} mr={1} >{user.result.name}</Typography>
                        <Button variant='contained' color='secondary'>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    // <Button variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;