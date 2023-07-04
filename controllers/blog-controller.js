const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const User = require('../models/Users');

const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!blogs) {
        return res.status(404).json({message: "No Blogs Found"})
    }
    return res.status(200).json({blogs})
}

const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    let existingUser;
    try {
        existingUser = await User.findById(user)
    } catch (error) {
        console.log(error)
    }
    if (!existingUser) {
        return res.status(400).json({message: "unable to find user by this id"})
    }
    const blog = new Blog({
        title,
        description,
        image,
        user
    })

    try {
        const session = await mongoose.startSession();
        session.startTransaction()
        await blog.save({session})
        existingUser.blogs.push(blog)
        await existingUser.save({ session })
        await session.commitTransaction()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: error });
    }
    return res.status(200).json({blog})
}

const updateBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description,
            image,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if(!blog){
        return res.status(500).json({message: "Unable to Update the Blog"})
    }
    return res.status(200).json({blog})
}

const getById = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(id)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!blog) {
        return res.status(404).json({message: "No Blog Found"})
    }
    return res.status(200).json({blog})
}

const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndRemove(id).populate('user')
        await blog.user.blogs.pull(blog)
        await blog.user.save()
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" });
    }
    if (!blog) {
        return res.status(404).json({message: "The Blog dose not found"})
    }
    return res.status(200).json({message: "Successfully Deleted"})
}

const getByUserId = async (req, res, next) => {
    const userId = req.params.id
    let userBlogs;
    try {
        userBlogs = await User.findById(userId).populate('blog')
    } catch (error) {
        console.log(error)
    }
    if (!userBlogs) {
        return res.status(404).json({message: "No Blog Found"})
    }
    return res.status(200).json({blogs: userBlogs})
}

module.exports = {
    getAllBlogs,
    addBlog,
    updateBlog,
    getById,
    deleteBlog,
    getByUserId
}