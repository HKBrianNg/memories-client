import React, {useEffect, useState} from 'react';
import {Container, AppBar, Typography, Grid} from '@mui/material';
import { useDispatch } from 'react-redux';
import memories from './images/memories.png';
import Form from './components/Form/Form';
import Posts from './components/Posts/Posts';
import {getPosts} from './actions/posts';
import { styled } from '@mui/material/styles';
import {red, green, blue} from '@mui/material/colors';

// import Demo from './components/Theme/Demo';
// import Demo from './components/Breakpoint/Demo';
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

function App() {
    const [currentId, setcurrentId] = useState(0);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch]);
    
    const Root = styled('div')(({theme})=>({
        [theme.breakpoints.down('md')]:{
            backgroundColor: red[500],
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: blue[500],
        },
        [theme.breakpoints.up('lg')]: {
            backgroundColor: green[500],
        },
    }));

    return (
        <>
        {/* <Demo /> */}
        <Root>
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
        </Root>
        </>
    );
}

export default App;