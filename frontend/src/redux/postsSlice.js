import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {API_URL} from "../api/index.js";



// Async thunks
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async (_, thunkAPI) => {
    try {
        const response = await axios.get(`${API_URL}/all`);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const createPost = createAsyncThunk('posts/createPost', async (postData, thunkAPI) => {
    try {
        const response = await axios.post(API_URL, postData);
        return response.data.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, updates }, thunkAPI) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, updates);
        console.log('Updated Post Response:', response);
        return response.data.data;
    } catch (error) {
        console.error('Update Post Error:', error);
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id, thunkAPI) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
        return id;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});
export const deleteAllPosts = createAsyncThunk('posts/deleteAllPosts', async (_, thunkAPI) => {
    try {
        // Отправляем запрос на сервер для удаления всех постов
        await axios.delete(`${API_URL}/all`);
        return true; // Возвращаем успешный флаг
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});
// Slice
const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        posts: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Fetch all posts
        builder
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Create a post
        builder
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Update a post
        builder
            .addCase(updatePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updatePost.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.posts.findIndex((post) => post._id === action.payload._id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase(updatePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });

        // Delete a post
        builder
            .addCase(deletePost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = state.posts.filter((post) => post._id !== action.payload);
            })
            .addCase(deletePost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });


        // Delete all posts
        builder
            .addCase(deleteAllPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteAllPosts.fulfilled, (state) => {
                state.loading = false;
                // Очищаем все посты из состояния
                state.posts = [];
            })
            .addCase(deleteAllPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default postsSlice.reducer;
