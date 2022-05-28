import {Card, CardActions, CardContent, CardMedia, Button, Typography} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts';

function Post({post,setcurrentId}) {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const Likes = () => {
      if (post?.likes?.length >0) {
        return post?.likes?.find((like)=>like === user?.result?._id)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post?.likes?.length > 2 ? `You and ${post?.likes?.length - 1} others` : `${post?.likes?.length} like${post?.likes?.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{post?.likes?.length} {post?.likes?.length === 1 ? 'Like' : 'Likes'}</>
        );
      }
      return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
    }

    return (
      <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', borderRadius:'15px', height:'100%', position:'relative',}}
            raised elevation={6}>
        <CardMedia sx={{height:0, paddingTop: '56.25%', backgroundColor:'rgba(0,0,0,0.5)',backgroundBlendMode:'normal',}} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
        <div style={{ position:'absolute', top:'5px', left:'7px', color: 'white' }}>
          <Typography variant="subtitle2">{post?.name}</Typography>
          <Typography variant="body2">{moment(post?.createdAt).fromNow()}</Typography>
        </div>
        {(user?.result?._id === post?.creator) && (
            <div>
              <Button style={{ position:'absolute', top:'5px', right:'5px', color: 'white' }} 
                  size="small" onClick={() =>setcurrentId(post?._id)}>
                  <MoreHorizIcon fontSize="default" />&nbsp;EDIT
              </Button>
            </div>
        )}
        <div sx={{display:'flex', justifyContent:'space-between'}}>
          <Typography variant="body2" color="textSecondary" component="h2">{post?.tags.map((tag) => `#${tag} `)}</Typography>
        </div>
        <Typography sx={{padding:'0 16px',}} gutterBottom variant="h5" component="h2">{post?.title}</Typography>
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">{post?.message}</Typography>
        </CardContent>
        <CardActions sx={{padding:'0 16px 8px 16px', display:'flex',justifyContent:'space-between'}}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={() => {dispatch(likePost(post?._id))}}>
            <Likes />
          </Button>
          {(user?.result?._id === post?.creator) && (
              <Button size="small" color="secondary" onClick={() => {dispatch(deletePost(post?._id))}}>
                  <DeleteIcon fontSize="small" />&nbsp;Delete
              </Button>
          )}
         
        </CardActions>
      </Card>
    );
}

export default Post;