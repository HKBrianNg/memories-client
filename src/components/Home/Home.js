import {Grow, Grid} from '@mui/material';
import React, {useEffect, useState} from 'react';
import { useDispatch } from 'react-redux';
import {getPosts} from  '../../actions/posts';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';

function Home() {
    const [currentId, setcurrentId] = useState(0);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getPosts());
    },[currentId,dispatch]);

    return (
        <Grow in>
            <Grid container direction={{xs:'column-reverse', sm:'column-reverse', md: 'row'}} p={1} justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item  sm={12} md={7}>
                    <Posts setcurrentId={setcurrentId}/>
                </Grid>
                <Grid item sm={12} md={3}>
                    <Form currentId={currentId} setcurrentId={setcurrentId}/>
                </Grid>
            </Grid>
        </Grow>
        
    )
}

export default Home;