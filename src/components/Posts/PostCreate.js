import {Grid} from '@mui/material';
import Form from '../Form/Form';
import {useParams} from 'react-router-dom';

function PostCreate() {
    
    var { id } = useParams();
    if (typeof(id) === "undefined") {
        id = 0;
    }
    return (
        <Grid container p={1} justifyContent="space-around" alignItems="center" spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
                <Form currentId={id}/>
            </Grid>
        </Grid>
    
        
    )
}

export default PostCreate;