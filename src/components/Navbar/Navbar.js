import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {getPosts} from  '../../actions/posts';
import {Container, AppBar, Typography, Grid} from '@mui/material';
import memories from '../../images/memories.png';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';

// import Demo from './components/Theme/Demo';
// import Demo from './components/Breakpoint/Demo';
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

function Navbar() {
    const [currentId, setcurrentId] = useState(0);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch]);

    return (
        <Container maxWidth="lg" sx={{padding:2}}>
        <AppBar position="static" color="inherit" sx={{borderRadius:5, display: 'flex', flexDirection: 'row', 
                                                        justifyContent: 'center', alignItems: 'center', }}>
            <Typography  variant='h2' color='green' p={0} mr={2}>Memories</Typography>
            <img src={memories} alt="icon" height="45" style={{ borderRadius:'5px' }}/>
        </AppBar>
        <Grid container direction={{xs:'column-reverse', sm:'column-reverse', md: 'row'}} p={1} justify="space-between" alignItems="stretch" spacing={3}>
            <Grid item  sm={12} md={7}>
                 <Posts setcurrentId={setcurrentId}/>
            </Grid>
            <Grid item sm={12} md={3}>
                 <Form currentId={currentId} setcurrentId={setcurrentId}/>
            </Grid>
        </Grid>
    </Container>
    )
};

export default Navbar;