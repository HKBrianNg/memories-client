import {AppBar, Grow, Grid, TextField, Paper} from '@mui/material';
import {Navigate, useLocation} from 'react-router-dom';
import ChipInput from "../../ChipInput/ChipInput";
import { getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import Posts from './Posts';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import {Link} from 'react-router-dom';

function PostsSearch() {
    const [user,setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const [search, setSearch] = useState('');   
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();

    
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    
    function useQuery() {
        return new URLSearchParams(useLocation().search);
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchPost();
          }
    }

    function handleSelecetedTags(tags) {
        setTags(tags);
    }

    const searchPost = () => {
        if (search.trim() || tags) {
            dispatch(getPostsBySearch({search, tags: tags.join(',')}));
            Navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(',')}`);
        } else {
            Navigate('/posts/search');
        }
    }

    return (
        <>
        <AppBar position="sticky" color="inherit" sx={{borderRadius:5, display: 'flex', flexDirection: 'row', justifyContent: 'start', 
                                                        alignItems: 'center', padding:'10px', marginTop:'2px',}}>
                {user?.result ? (
                    <Link to='/posts/create'>
                        <AddCircleOutlineIcon  fontSize='large' sx={{marginRight:"1px"}}/>
                    </Link>
                ) : (
                    <AddCircleOutlineIcon  fontSize='large' sx={{marginRight:"1px"}}/>
                )}
                
                <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories" 
                            sx={{mr:1}} value={search} onChange={(e)=>setSearch(e.target.value)} />
                <ChipInput 
                    selectedTags={handleSelecetedTags} variant="outlined" id="tags" name="tags" label="Tags"/>
                <SearchIcon fontSize="large" onClick={searchPost }/>
                {(!searchQuery && !tags.length) && (
                            <Paper elevation={6}>
                                <Pagination page={page}/>
                            </Paper>
                )}
        </AppBar>
        <Grow in>
            <Grid container direction={{xs:'column-reverse', sm:'column-reverse', md: 'row'}} p={2} justify="space-between" alignItems="stretch">
                <Grid item xs={12} sm={12} md={12}>
                    <Posts />
                </Grid>
            </Grid>
        </Grow>
        </>
    );
}

export default PostsSearch;


