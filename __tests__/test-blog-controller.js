const Blog = require("../models/Blog");
const User = require('../models/Users')
const { getAllBlogs, addBlog, updateBlog, getById, deleteBlog, getByUserId }= require("../controllers/blog-controller");


describe('getAllBlogs', () => {
    test('should return all blogs', async () => {
        Blog.find = jest.fn().mockResolvedValue(['blog1', 'blog2']);
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };

        await getAllBlogs(req, res);
        
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ blogs: ['blog1', 'blog2'] });
        });
});
    

describe('updateBlog', () => {
        test('should update a blog', async () => {
            const req = {
                body: {
                title: 'Updated Blog',
                description: 'This is an updated blog',
                image: 'updated.jpg',
                user: '123456789',
                },
                params: {
                id: 'blogId123', 
                },
            };
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn(),
            };

            const updatedBlog = {
                _id: 'blogId123',
                title: 'Updated Blog',
                description: 'This is an updated blog',
                image: 'updated.jpg',
                user: '123456789',
            };
            Blog.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedBlog);
        
            await updateBlog(req, res);
        
            expect(Blog.findByIdAndUpdate).toHaveBeenCalledWith('blogId123', {
                title: 'Updated Blog',
                description: 'This is an updated blog',
                image: 'updated.jpg',
                user: '123456789',
            });
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ blog: updatedBlog });
            });
    });

describe('getById', () => {
    test('should get a blog by ID', async () => {
        const req = {
            params: {
            id: 'blogId123',
            },
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        };
    
        const blog = {
            _id: 'blogId123',
            title: 'Test Blog',
            description: 'This is a test blog',
            image: 'test.jpg',
            user: '123456789',
        };
        Blog.findById = jest.fn().mockResolvedValue(blog);
    
        await getById(req, res);
    
        expect(Blog.findById).toHaveBeenCalledWith('blogId123');
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ blog });
        });
    });
