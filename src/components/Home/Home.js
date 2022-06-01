import {Grow, Grid, Paper, AppBar, TextField, Button} from '@mui/material';
import React, {useState} from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Form from '../Form/Form';
import Posts from '../Posts/Posts';
import ChipInput from "../../ChipInput/ChipInput";
import { getPostsBySearch } from '../../actions/posts';
import Pagination from '../Pagination';
// import Speech from '../Speech/Speech';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Home() {
    const [currentId, setcurrentId] = useState(0);
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);
    const dispatch = useDispatch();
     
    const query = useQuery();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');

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
            Navigate('/');
        }
    }

    return (
        <Grow in>
            <Grid container direction={{xs:'column-reverse', sm:'column-reverse', md: 'row'}} p={1} justify="space-between" alignItems="stretch" spacing={3}>
                <Grid item  xs={12} sm={6} md={9}>
                    <Posts setcurrentId={setcurrentId}/>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <AppBar position="static" color="inherit" sx={{borderRadius:2, display: 'flex', marginBottom:'1rem', padding:'16px'}}>
                        <TextField onKeyDown={handleKeyPress} name="search" variant="outlined" label="Search Memories"
                        sx={{mb:1.5}} fullWidth value={search} onChange={(e)=>setSearch(e.target.value)} />
                        <ChipInput 
                            selectedTags={handleSelecetedTags}
                            fullWidth variant="outlined" id="tags" name="tags" placeholder="add Tags"
                            label="Search Tags" sx={{mb:1}} />
                        <Button onClick={searchPost} variant="contained" color="primary">Search</Button>
                    </AppBar>
                    <Form currentId={currentId} setcurrentId={setcurrentId}/>
                    {(!searchQuery && !tags.length) && (
                        <Paper elevation={6}>
                            <Pagination page={page}/>
                        </Paper>
                    )}
                    {/* <Speech /> */}
                </Grid>
            </Grid>
        </Grow>
        
    )
}

export default Home;