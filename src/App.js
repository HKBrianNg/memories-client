import React from 'react';
import {Container} from '@mui/material';
import { styled } from '@mui/material/styles';
import {red, green, blue} from '@mui/material/colors';
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import {BrowserRouter,Route, Routes} from 'react-router-dom';

function App() {
    
    const Root = styled('div')(({theme})=>({
        [theme.breakpoints.down('md')]:{
            backgroundColor: red[500],
        },
        [theme.breakpoints.up('md')]: {
            backgroundColor: blue[500],
        },
        [theme.breakpoints.up('lg')]: {
            backgroundColor: green[500],
        },
    }));

    return (
        <BrowserRouter>
            <Root>
                <Container maxWidth="lg" sx={{padding:2}}>
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