import {Card, CardActions, CardMedia, Button, Typography, ButtonBase, ToggleButton, ToggleButtonGroup, ButtonGroup} from '@mui/material';
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
import TranslateIcon from '@mui/icons-material/Translate';

function Post({post,setcurrentId}) {
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));
    const navigate = useNavigate();
    const [selected,setSelected] = useState(true);
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
      <Card sx={{display: 'flex', flexDirection: 'column', justifyContent: 'start', borderRadius:'15px', height:'100%', position:'relative',}}
            raised elevation={6}>
        <ButtonBase component="span" onClick={openPost} sx={{display: 'flex', justifyContent:'space-between', padding:'0 16px 8px 16px',}}/>
        <CardMedia sx={{paddingTop: '50%',backgroundBlendMode:'normal',}} image={post.selectedFile || nopicture } title={post.title} />     
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
        <div sx={{display:'flex', justifyContent:'start'}}>
          <Typography variant="body2" color="textSecondary" component="h2" p={0.2}>{post?.tags.map((tag) => `#${tag} `)}</Typography>
          <ToggleButtonGroup size="small" {...controlLang}>
              {childrenLang}
          </ToggleButtonGroup>
          <ButtonGroup size="small">
            {childrenControl}
          </ButtonGroup>
          <Button color="primary" variant="contained" sx={{padding:"0px", margin:"0px",width:"20px",height:"20px"}}
                  onClick={()=>{ }}><TranslateIcon/>
          </Button>
          <Typography gutterBottom variant="h5" component="h2" p={0.2}>{post?.title}</Typography>
          <Typography variant="body2" sx={{'&:hover': { color: 'red', backgroundColor: 'white', }}} 
          onClick={()=>{
            
          }} color="textSecondary" component="p" p={0.2} >
          {post?.message.length >60 ? post?.message.substring(0,60).concat(' ...') : post?.message }</Typography>
        </div>
        
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