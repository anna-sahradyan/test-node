const Post = require("../models/post.model");

const createPost = async (req, res) => {
    const posts = req.body;

    if (!posts || !posts.title || !posts.body) {
        return res.status(400).json({ success: false, message: 'Please provide all fields' });
    }
    const existingPost = await Post.findOne({ title: posts.title });
    if (existingPost) {
        return res.status(400).json({ success: false, message: 'A post with the same title already exists' });
    }

    const newPost = new Post(posts);

    try {
        await newPost.save();
        console.log(newPost)
        return res.status(201).json({ success: true, data: newPost });
    } catch (err) {
        console.error(`Error in Create post:`, err.message);
        return res.status(500).json({ success: false, message: 'Server Error' });
    }
};

const allPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ success: true, data: posts });
    } catch (err) {
        console.error(`Error in Fetching posts:`, err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
const editPost = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    if (!id) {
        return res.status(400).json({ success: false, message: 'ID is required to edit a post' });
    }

    try {
        const updatedPost = await Post.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
        if (!updatedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: updatedPost });
    } catch (err) {
        console.error(`Error in Edit post:`, err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: 'ID is required to delete a post' });
    }

    try {
        const deletedPost = await Post.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, message: 'Post deleted successfully' });
    } catch (err) {
        console.error(`Error in Delete post:`, err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};
const deleteAllPosts = async (req, res) => {
    try {
        const result = await Post.deleteMany({});

        if (result.deletedCount === 0) {
            return res.status(404).json({ success: false, message: 'No posts found to delete' });
        }

        res.status(200).json({
            success: true,
            message: `All posts deleted successfully`
        });
    } catch (err) {
        console.error(`Error in Delete All Posts:`, err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};



const getPostById = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ success: false, message: 'ID is required to fetch a post' });
    }

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        res.status(200).json({ success: true, data: post });
    } catch (err) {
        console.error(`Error in Fetch post by ID:`, err.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

module.exports = {
    createPost,
    allPosts,
    editPost,
    deletePost,
    getPostById,
    deleteAllPosts,
};
