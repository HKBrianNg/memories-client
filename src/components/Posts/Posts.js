import {Grid,CircularProgress} from "@mui/material";

import { useSelector } from 'react-redux';
import Post from './Post/Post';

function Posts({setcurrentId}) {
    const {posts, isLoading} = useSelector((state)=>state.posts);
    console.log('isloading:',isLoading);
    console.log('posts length:',posts?.length);
    if (!posts?.length && !isLoading) return 'No posts';

    return (
       isLoading ? <CircularProgress /> : (
            <Grid container alignItems="stretch" spacing={3}>
                {posts?.map((post)=>(
                    <Grid key={post._id} item  xs={12} sm={12} md={6} lg={3}>
                        <Post post={post} setcurrentId={setcurrentId}/>
                    </Grid>
                ))}
            </Grid>
       )
    );
}

export default Posts;