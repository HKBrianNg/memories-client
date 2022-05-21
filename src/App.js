import { styled } from '@mui/material/styles';
import {red, green, blue} from '@mui/material/colors';
import Navbar from './components/Navbar/Navbar';

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
        <Root>
            <Navbar />   
        </Root>
    );
}

export default App;