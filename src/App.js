import React from 'react';
import {Container} from '@mui/material';
// import { styled } from '@mui/material/styles';
// import {red, green, blue, purple} from '@mui/material/colors';
import Navbar from './components/Navbar/Navbar';
import PostCreate from './components/Posts/PostCreate';
import Auth from './components/Auth/Auth';
import PostDetails from './components/PostDetails/PostDetails';
import PostsSearch from './components/Posts/PostsSearch';
import {BrowserRouter,Route, Routes, Navigate} from 'react-router-dom';

// import Demo from './components/Theme/Demo';
// import Demo from './components/Breakpoint/Demo';
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

function App() {
    
    // const Root = styled('div')(({theme})=>({
    //     [theme.breakpoints.down('sm')]:{
    //         backgroundColor: red[500],
    //     },
    //     [theme.breakpoints.up('sm')]: {
    //         backgroundColor: blue[500],
    //     },
    //     [theme.breakpoints.up('md')]: {
    //         backgroundColor: green[500],
    //     },
    //     [theme.breakpoints.up('lg')]: {
    //         backgroundColor: purple[500],
    //     },
    // }));

    const user = JSON.parse(localStorage.getItem('profile'));
    
    return (
        <BrowserRouter>
            {/* <Root> */}
                <Container maxWidth="xl">
                    <Navbar />
                    <Routes>
                        <Route path='/' exact element={<Navigate to="/posts/search" />} />
                        <Route path='/posts/create' exact element={<PostCreate />}/>
                        <Route path='/posts/create/:id' exact element={<PostCreate />}/>
                        <Route path='/posts/search' exact element={<PostsSearch />}/>
                        <Route path='/posts/:id' exact element={<PostDetails />} />
                        <Route path='/auth' exact element={!user ? <Auth/> : <Navigate to="/posts" />} />
                    </Routes> 
                </Container>
            {/* </Root> */}
        </BrowserRouter>      
    );
}

export default App;