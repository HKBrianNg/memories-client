import {Grid,CircularProgress} from "@mui/material";

import { useSelector } from 'react-redux';
import Post from './Post/Post';

function Posts({setcurrentId}) {
    const unsortedposts = useSelector((state)=>state.posts);
    const posts = unsortedposts.sort((a,b)=> {
        let fa = a._id.toLowerCase(),
        fb = b._id.toLowerCase();

    if (fa < fb) {
        return 1;
    }
    if (fa > fb) {
        return -1;
    }
    return 0;
    });

    return (
       !posts.length ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={3}>
                {posts.map((post)=>(
                    <Grid key={post._id} item  xs={12} sm={6}>
                        <Post post={post} setcurrentId={setcurrentId}/>
                    </Grid>
                ))}
            </Grid>
       )
        
    );
}

export default Posts;