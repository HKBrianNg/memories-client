import {Card, CardActions, CardMedia, Button, Typography, ToggleButton, ToggleButtonGroup, ButtonGroup} from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import moment from 'moment';
import {useDispatch} from 'react-redux';
import {deletePost, likePost} from '../../../actions/posts';
import { useNavigate } from 'react-router-dom';
import nopicture from '../../../images/nopicture.png';
import {HK,CN,TW,US,UK} from '../../../constants/language';
import useSpeech from '../../Speech/useSpeech';
import {useState} from 'react';
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import PauseCircleOutlineOutlinedIcon from '@mui/icons-material/PauseCircleOutlineOutlined';
import EditIcon from '@mui/icons-material/Edit';

function Post({post,setcurrentId}) {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [selectLang,setSelectLang] = useState(TW);
    const openPost=() => {
      navigate(`/posts/${post._id}`,{replace:true});
    }

    const Likes = () => {
      if (post?.likes?.length >0) {
        return post.likes.find((like)=>like === user?.result?._id)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post?.likes?.length} like${post?.likes?.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
      }
      return <><ThumbUpAltOutlinedIcon fontSize="small" />&nbsp;Like</>;
    }

    const {speak, stop, pause, resume, pausing} = useSpeech();
    const handleChangeLang = (e) => {
      setSelectLang(e.target.value);
    }
    const controlLang = {
      value: selectLang,
      onChange: handleChangeLang,
      exclusive: true,
    };
    const childrenLang = [
      <ToggleButton value={HK}>HK</ToggleButton>,
      <ToggleButton value={TW}>TW</ToggleButton>,
      <ToggleButton value={CN}>CN</ToggleButton>,
      <ToggleButton value={US}>US</ToggleButton>,
      <ToggleButton value={UK}>UK</ToggleButton>,
    ];

    
    const childrenControl = [
      <Button value='Play' onClick={()=>{
        if (pausing) {
          resume(); 
        } else {
          stop();
          speak(selectLang,post?.message);
        }         
      }}><PlayCircleOutlinedIcon/></Button>,
      <Button value='Pause' onClick={pause}><PauseCircleOutlineOutlinedIcon/></Button>,
      <Button value='Stop' onClick={stop}><StopCircleOutlinedIcon/></Button>,
    ];

    return (
      <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'start', borderRadius:'15px', 
                height:'100%', position:'relative',padding:'5px 4px 5px 4px',}}
            raised elevation={6}>
        <CardMedia sx={{borderRadius:'5px', paddingTop: '50%',backgroundBlendMode:'normal',marginBottom:'2px',}} 
          image={post.selectedFile || nopicture } title={post.title} onClick={openPost} />     
       
        <div>
          <div systle={{display:'flex',flexDirection:'row',justifyContent:'space-between',}}>
            <ButtonGroup size="small" sx={{mb:'2px'}}>
              {childrenControl}
            </ButtonGroup>
            <ToggleButtonGroup size="small" {...controlLang}>
                {childrenLang}
            </ToggleButtonGroup>
          </div>
          <Typography component="div" variant='body1' p={0.2}>{post?.tags.map((tag) => `#${tag} `)}</Typography>
          <Typography component="div" variant='subtitle1' color="primary" p={0.2}>{post?.title}</Typography>
          <Typography component="p" variant="body2" sx={{'&:hover': { color: 'red', backgroundColor: 'white', }}} color="textSecondary" p={0.2} >
            {post?.message.length >60 ? post?.message.substring(0,60).concat(' ...') : post?.message }
          </Typography>
          <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between',}}>
            <Typography component="div" variant="body2">{post?.name}</Typography>
            <Typography component="div" variant="body2">{moment(post?.createdAt).fromNow()}</Typography>
          </div>
        </div>
        
        <CardActions sx={{padding:'0 16px 8px 16px', display:'flex',justifyContent:'space-between'}}>
          <Button size="small" color="primary" disabled={!user?.result} onClick={() => {dispatch(likePost(post?._id))}}>
            <Likes />
          </Button>
          {(user?.result?._id === post?.creator) && (
              <Button color="secondary" onClick={() => {setcurrentId(post?._id)}}>
                  <EditIcon fontSize="small" />&nbsp;EDIT
              </Button>
          )}
          {(user?.result?._id === post?.creator) && (
              <Button color="secondary" onClick={() => {dispatch(deletePost(post?._id))}}>
                  <DeleteIcon fontSize="small" />&nbsp;Delete
              </Button>
          )}
          
        </CardActions>
      </Card>
    );
}

export default Post;