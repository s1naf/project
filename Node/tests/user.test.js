const request = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = require('../index');
const User = require('../models/user-model');

let token;
let adminToken;

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => { console.log('Connected to MongoDB in testing') },
        err => { console.log('Failed to connect to MongoDB') }
    );

    // Clear all users before each test
    await User.deleteMany({});

    // Create a user and an admin for testing
    const user = new User({
        username: 'testuser',
        firstname: 'Test',
        lastname: 'User',
        email: 'testuser@example.com',
        password: await bcrypt.hash('password', 10),
        age: 25
    });
    await user.save();

    const admin = new User({
        username: 'adminuser',
        firstname: 'Admin',
        lastname: 'User',
        email: 'adminuser@example.com',
        password: await bcrypt.hash('password', 10),
        age: 30,
        role: 'admin'
    });
    await admin.save();

    // Generate tokens
    token = jwt.sign({ username: user.username, id: user._id, role: user.role, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    adminToken = jwt.sign({ username: admin.username, id: admin._id, role: admin.role, email: admin.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterEach(async () => {
    await mongoose.connection.close();
});

describe('Admin Requests', () => {
    it('should return all users for admin', async () => {
        const res = await request(app)
            .get('/api/users/admin/view')
            .set('Authorization', `Bearer ${adminToken}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

});

describe('For User Requests', () => {
    it('should create a new user', async () => {
        const res = await request(app)
            .post('/api/users/register')
            .send({
                username: 'newuser',
                firstname: 'New',
                lastname: 'User',
                email: 'newuser@example.com',
                password: 'password',
                age: 20
            });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
    });

    it('should login a user', async () => {
        const res = await request(app)
            .post('/api/users/login')
            .send({
                username: 'testuser',
                password: 'password'
            });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data).toBeTruthy();
        expect(res.body).toHaveProperty('[data]');
    });

    it('should return a user by username', async () => {
        const res = await request(app)
            .get('/api/users/testuser')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.username).toBe('testuser');
    });

    it('should update a user', async () => {
        const user = await User.findOne({ username: 'testuser' });
        const res = await request(app)
            .patch('/api/users/update/credentials')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: user._id.toString(),
                username: 'updateduser',
                email: 'updateduser@example.com',
                firstname: 'Updated',
                lastname: 'User',
                password: 'newpassword'
            });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.username).toBe('updateduser');
        expect(res.body.data.email).toBe('updateduser@example.com');
        expect(res.body.data.firstname).toBe('Updated');
        expect(res.body.data.lastname).toBe('User');
        
        
        // Compare the hashed password
        const passwordMatch = await bcrypt.compare('newpassword', res.body.data.password);
        expect(passwordMatch).toBe(true);

    });

    it('should delete a user', async () => {
        const res = await request(app)
            .delete('/api/users/admin/delete/testuser')
            .set('Authorization', `Bearer ${adminToken}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
    });
    it('should check if email exists', async () => {
        const res = await request(app)
            .get('/api/users/checkemail')
            .query({ email: 'testuser@example.com' });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data).toBe(true);
    });

    it('should check if username exists', async () => {
        const res = await request(app)
            .get('/api/users/checkusername')
            .query({ username: 'testuser' });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data).toBe(true);
    });

    it('should update user role', async () => {
        const res = await request(app)
            .patch('/api/users/admin/edit/role')
            .set('Authorization', `Bearer ${adminToken}`)
            .send({
                username: 'testuser',
                role: 'admin'
            });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.role).toBe('admin');
    }); 
});

describe('For Post Requests', () => {
    it('should return all posts', async () => {
        const res = await request(app)
            .get('/api/posts')
            .set('Authorization', `Bearer ${adminToken}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeInstanceOf(Object);
    });

    it('should return posts of a user', async () => {
        const res = await request(app)
            .get('/api/posts/testuser')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toBe(200);
        
        expect(res.body.data).toBeInstanceOf(Array);
        expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('should create a new post for a user', async () => {
        const res = await request(app)
            .post('/api/posts/testuser/insert')
            .set('Authorization', `Bearer ${token}`)
            .send({
                post: 'This is a test post'
            });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data).toBeTruthy();
        expect(res.body.data).toBeInstanceOf(Object); // test if posts is an array
        
    });


    it('should update a post for a user', async () => {
        const res = await request(app)
            .patch('/api/posts/update/testuser')
            .set('Authorization', `Bearer ${token}`)
            .send({
                _id: 'post_id',
                post: 'This is an updated test post'
            });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeInstanceOf(Object); // test if posts is an array
        expect(res.body.data).toBeTruthy();
    });

    it('should delete a post for a user', async () => {
        const res = await request(app)
            .delete('/api/posts/delete/testuser')
            .set('Authorization', `Bearer ${token}`)
            .send({
                _id: 'post_id'
            });
        
        expect(res.statusCode).toBe(200);

        expect(res.body.data).toBeTruthy();
    });

    it('should return the latest posts', async () => {
        const res = await request(app)
            .get('/api/posts/latest')
            .set('Authorization', `Bearer ${token}`);
        
        expect(res.statusCode).toBe(200);
        expect(res.body.data).toBeInstanceOf(Array);
        
    });
});

// const mongoose = require('mongoose');
// const request = require('supertest');
// const app = require('../index');
// const userModel = require('../models/user-model');


// beforeEach(async() => {
//     await mongoose.connect(process.env.MONGODB_URI)
//     .then(
//         () => { console.log('Connected to MongoDB in testing') },
//         err => { console.log('Failed to connect to MongoDB') });
// });

// afterEach(async() => {
//     await mongoose.connection.close();
// });





// describe("User tests",()=>{
//     it ('should create a new user', async() => {
//         const res = await request(app)
//         .post('/api/users/register')
//         .send({
//             username: 'tzaaaaa',
//             firstname: 'New',
//             lastname: 'User',
//             email: 'tzaaaaa@jama.kk',
//             password: 'password',
//             age: '19',
//         });
//         expect(res.statusCode).toBe(200);
//         expect(res.body.status).toBeTruthy();
//     });

//     it ('should login a user', async() => {
//         const res = await request(app)
//         .post('/api/users/login')
//         .send({
//             username: 'tza',
//             password: 'password'
//         });
//         expect(res.statusCode).toBe(200);
//         expect(res.body.status).toBeTruthy();
//         expect(res.body.data).toBeTruthy();
//         expect(res.body).toHaveProperty(['data']);
//     });
//     let token = {role:user.role,username:user.username,id:user._id,email:user.email};

//     it ('update for specific user', async() => {
//         const res = await request(app)
//         .patch('/api/users/update/credentials')
//         .send({
//             id: user._id.toString(),
//             username: 'updateduser',
//             email: 'updateduser@example.com',
//             firstname: 'Updated',
//             lastname: 'User',
//             password: 'newpassword'
//         });
    
//         expect(res.statusCode).toBe(200);
//         expect(res.body.status).toBeTruthy();
//         expect(res.body.data).toBeTruthy();
//         expect(res.body.data.username).toBe('updateduser');
//         expect(res.body.data.email).toBe('updateduser@example.com');
//         expect(res.body.data.firstname).toBe('Updated');
//         expect(res.body.data.lastname).toBe('User');
//         expect(res.body.data.password).toBe('newpassword');
        
// });
// });
// describe("Admin tests",()=>{
//     it ('should return all users for admin', async() => {
//         const res = await request(app)
//         .get('/api/users/admin/view');

//         expect(res.statusCode).toBe(200);
//         expect(res.body.status).toBeTruthy();
//         // expect(res.body.data).toBeInstanceOf(Array);
//         expect(res.body.data.length).toBeGreaterThan(0);
//     });
// })