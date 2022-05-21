import { TextField, Typography, Paper, Button } from "@mui/material";
import {useState, useEffect} from 'react';
import FileBase from 'react-file-base64';
import {useDispatch, useSelector} from 'react-redux';
import {createPost, updatePost} from '../../actions/posts';

function Form({currentId, setcurrentId}) {
    const [postData,setPostData] = useState({creator:'',title:'',message:'',tags:'',selectedFile:'',});
    const post = useSelector((state)=>( currentId ? state.posts.find((message)=> message._id === currentId) : null));
    const dispatch = useDispatch();
   
    useEffect(()=>{
        if (post) setPostData(post);
    },[post]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentId === 0) {
            dispatch(createPost(postData));
            clear();
        } else {
            dispatch(updatePost(currentId, postData));
            clear();
        }
    }
   
    const clear = () => {
        setcurrentId(0);
        setPostData({ creator: '', title: '', message: '', tags: '', selectedFile: '' });

    }

    return(
        <Paper variant="outlined" square sx={{ padding: '2px', }}>
            <form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Typography variant="h6" m={0.5}>{currentId ? `Editing "${post.title}"` : 'Creating a Memory'}</Typography>
                <TextField name="creator" variant="outlined" label="Creator" margin="dense" fullWidth value={postData.creator} onChange={(e)=>setPostData({...postData, creator:e.target.value})}/>
                <TextField name="title" variant="outlined"  label="Title" margin="dense" fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title:e.target.value})}/>
                <TextField name="message" variant="outlined" label="Message" margin="dense" fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message:e.target.value})}/>
                <TextField name="tags" variant="outlined" label="Tags" margin="dense" fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags:e.target.value.split(',')})}/>
                <div className="fileInput" style={{margin:'20px'}}>
                    <FileBase type="file"  multiple={false} onDone={({base64})=>setPostData({...postData,selectedFile:base64})}/>
                </div>
                <Button variant="contained" color="primary" size="large" type="submit" sx={{marginRight:"2px"}}>Submit</Button>
                <Button variant="contained" color="secondary" size="large" onClick={clear} >Clear</Button>
            </form>
        </Paper>
    );
}

export default Form;