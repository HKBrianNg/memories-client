import {Grow, Grid} from '@mui/material';
import React, {useState} from 'react';
import Posts from './Posts';
import Form from '../Form/Form';

function PostCreate() {
    const [currentId, setcurrentId] = useState(0);
   
    return (
        <Grow in>
            <Grid container direction={{xs:'column-reverse', sm:'column-reverse', md: 'row'}} p={1} justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item xs={12} sm={6} md={3}>
                    <Form currentId={currentId} setcurrentId={setcurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={9}>
                    {/* <Posts setcurrentId={setcurrentId}/> */}
                </Grid>
            </Grid>
        </Grow>
        
    )
}

export default PostCreate;