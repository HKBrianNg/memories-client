import axios from 'axios';

// const url = 'http://localhost:5000/posts';
// const url = 'https://memories-bn.herokuapp.com/posts';

// const API = axios.create({ baseURL: 'http://localhost:5000' });
const API = axios.create({ baseURL: 'https://memories-bn.herokuapp.com' });

// signup, signin
export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

// create/edit/delete/get post
export const fetchPosts = ()=> API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost);
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`,updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`); // return updated post record