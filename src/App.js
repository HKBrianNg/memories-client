import React from 'react';
import {Container} from '@mui/material';
import { styled } from '@mui/material/styles';
import {red, green, blue, purple} from '@mui/material/colors';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import {BrowserRouter,Route, Routes} from 'react-router-dom';

// import Demo from './components/Theme/Demo';
// import Demo from './components/Breakpoint/Demo';
// xs, extra-small: 0px
// sm, small: 600px
// md, medium: 900px
// lg, large: 1200px
// xl, extra-large: 1536px

function App() {
    
    const Root = styled('div')(({theme})=>({
        [theme.breakpoints.down('sm')]:{
            backgroundColor: red[500],
        },
        [theme.breakpoints.up('sm')]: {
            backgroundColor: blue[500],
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: green[500],
        },
        [theme.breakpoints.up('lg')]: {
            backgroundColor: purple[500],
        },
    }));

    return (
        <BrowserRouter>
            <Root>
                <Container maxWidth="lg" sx={{padding:1}}>
                    <Navbar />
                    <Routes>
                        <Route path='/' exact element={<Home/>} />
                        <Route path='/auth' exact element={<Auth/>} />
                    </Routes> 
                </Container>
            </Root>
        </BrowserRouter>
           
    );
}

export default App;