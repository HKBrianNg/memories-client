import {AppBar, Typography, Toolbar, Avatar, Button} from '@mui/material';
import memories from '../../images/memories.png';
import {Link} from 'react-router-dom';


// import Demo from './components/Theme/Demo';
// import Demo from './components/Breakpoint/Demo';
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

function Navbar() {
    
    const user = null;
    // const user = {
    //     result: {
    //         name:'brian',
    //         imageUrl: '',
    //     },
    // }

    return (
        <AppBar position="static" color="inherit" sx={{borderRadius:5, display: 'flex', flexDirection: 'row', 
                                                        justifyContent: 'space-between', alignItems: 'center', }}>
            <div style={{display:'flex', flexDirection:'row', alignItems:'center'}} >
                <Typography component={Link} to="/" variant='h2' color='green' p={0} mr={2} sx={{textDecoration:'none'}}>Memories</Typography>
                {/* <Typography variant='h2' color='green' p={0} mr={2}>Memories</Typography> */}
                <img src={memories} alt="icon" height="45" style={{ borderRadius:'5px' }}/>
            </div>
            <Toolbar sx={{display:'flex', flexDirection:'row', alignItem:'flex-end', width:'200px',}}>
                {user ? (
                    <div style={{display:'flex', flexDirection:'row', alignItems:'center', }}>
                        <Avatar alt={user.result.name} src={user.result.imageUrl}  sx={{ width: 40, height: 40, mr:1 }}>{user.result.name.charAt(0)}</Avatar>
                        <Typography variant="h6" p={0} mr={1} >{user.result.name}</Typography>
                        <Button variant='contained' color='secondary' sx={{}}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
                    // <Button variant="contained" color="primary">Sign In</Button>
                )}
            </Toolbar>
        </AppBar>
    )
};

export default Navbar;