import {Paper, Typography,Divider,CircularProgress} from '@mui/material';
import React, {useEffect} from 'react';
import { getPost, getPostsBySearch } from '../../actions/posts';
import {useDispatch, useSelector} from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import nopicture from '../../images/nopicture.png';

function PostDetails() {

    const { post, posts, isLoading } = useSelector((state) => state.posts);
    const { id } = useParams();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPost(id));
      }, [id,dispatch]);

    useEffect(()=>{
        if (post) {
            dispatch(getPostsBySearch({search:'none',tags:post?.tags.join(',')}));
        }
    },[post,dispatch]);

    if (!post) return null;

    const openPost = (_id) => navigate(`/posts/${_id}`);
    
    if (isLoading) {
        return (
          <Paper elevation={6}  sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', 
                padding: '20px', borderRadius: '15px', height: '39vh',}}>
            <CircularProgress size="7em" />
          </Paper>
        );
      }

    const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);
  
    return (
    <>
    <Paper style={{ padding: '10px', borderRadius: '15px', marginTop:'2px', }} elevation={6}>
        <div style={{display: 'flex', width:'100%',flexDirection:'column',}}>
            <div style={{margin:'10px', flex:1}}>
                <Typography variant="h3" component="h2">{post.title}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                <Typography variant="h6">Created by: {post.name}</Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="body1"><strong>Realtime Chat</strong></Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="body1"><strong>Comments</strong></Typography>
                <Divider style={{ margin: '20px 0' }} />
            </div>
            <div style={{margin:'10px', flex:1}}>
                <img style={{borderRadius:'10px', objectFit:'contain', width:'100%', height:'100%', maxHeight:'600px',}} 
                    src={post.selectedFile || nopicture} alt={post.title} />
            </div>
        </div>
    </Paper>
    <Paper style={{ padding: '10px', borderRadius: '15px',marginTop:'2px' }} elevation={6}>
      {!!recommendedPosts.length && (
        <div style={{margin:'10px', flex:1}}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div style={{display:'flex', flexDirection:'column'}}>
            {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{title}</Typography>
                <Typography gutterBottom variant="subtitle2">{name}</Typography>
                <Typography gutterBottom variant="subtitle2">{message}</Typography>
                <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                <img src={selectedFile} alt="" style={{borderRadius:'10px', objectFit:'contain', width:'100%', height:'100%', maxHeight:'200px'}}/>
              </div>
            ))}
          </div>
        </div>
      )}
      </Paper>
      </>
    );
}

export default PostDetails;