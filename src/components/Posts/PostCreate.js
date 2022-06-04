import {Grid, Button, TextField, Typography, Paper} from '@mui/material';
import {useNavigate, useParams} from 'react-router-dom';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import {useState, useEffect} from 'react';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../actions/posts';


function PostCreate() {
     
    // main logic 
     var { id } = useParams();
     if (typeof(id) === "undefined") {
         id = 0;
     }

    // functions
    const clear = () => {
        setPostData({ title: '', message: '', tags: '', selectedFile: '' });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (id === 0) {
            dispatch(createPost({...postData,name:user?.result?.name}));
            clear();
        } else {
            dispatch(updatePost(id, {...postData,name:user?.result?.name}));
            clear();
        }
    }

    const back = () => {
        navigate("/",{replace:true});
    }
    
    // edit mode - currentId is not null, create mode - currentId is 0
    // get the post record for editing
    const [postData,setPostData] = useState({title:'',message:'',tags:'',selectedFile:'',});
    const post = useSelector((state)=>( id ? state.posts.posts.find((message)=> message._id === id) : null));
    const dispatch = useDispatch();
    useEffect(()=>{
        if (post) setPostData(post);
    },[post]);
    const navigate = useNavigate();

     // check if user has logged on
     const user = JSON.parse(localStorage.getItem('profile'));
     if (!user?.result?.name) {
         return (
             <Paper  sx={{ padding: '2px', }}>
                 <Typography variant="h6" align="center">
                     Please Sign In first.
                 </Typography>
             </Paper>
         );
     }


    return (
        <Grid container p={1} justifyContent="space-around" alignItems="center" spacing={1}>
            <Grid item xs={12} sm={6} md={3}>
            <Paper variant="outlined" sx={{ padding: '2px', }}>
            <form autoComplete="off" noValidate={false} onSubmit={handleSubmit}>
                <Typography variant="h6" m={0.5}>{id ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
                <TextField name="title" variant="outlined"  label="Title" required={true} margin="dense" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title:e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" required={true} margin="dense" fullWidth rows={3} multiline maxLength={10} value={postData.message} onChange={(e)=>setPostData({...postData, message:e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" margin="dense" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags:e.target.value.split(',')})}/>
                <div className="fileInput" style={{margin:'20px'}}>
                    <FileBase type="file"  multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})}/>
                </div>
                <Button variant="contained" color="success" size="medium" onClick={back} sx={{marginRight:"2px"}}>
                    <ArrowBackIosIcon />Back
                </Button>
                <Button variant="contained" color="primary" size="large" type="submit" sx={{marginRight:"2px"}}>Submit</Button>
                <Button variant="contained" color="secondary" size="large" onClick={clear} >Clear</Button>
            </form>
        </Paper>
            </Grid>
        </Grid>
    
        
    )
}

export default PostCreate;