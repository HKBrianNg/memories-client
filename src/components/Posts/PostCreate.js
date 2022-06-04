import {Grid} from '@mui/material';
import React, {useState} from 'react';
import Form from '../Form/Form';

function PostCreate() {
    const [currentId, setcurrentId] = useState(0);
   
    return (
        <Grid container p={1} justifyContent="space-around" alignItems="center" spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
                <Form currentId={currentId} setcurrentId={setcurrentId}/>
            </Grid>
        </Grid>
    
        
    )
}

export default PostCreate;