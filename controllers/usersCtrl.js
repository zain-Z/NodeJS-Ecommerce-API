import User from '../model/User.js';
import bcrypt from 'bcryptjs';
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import getTokenFromHeader from '../utils/getTokenFromHeader.js';
import verifyToken from '../utils/verifyToken.js';

// @desc  Register a new user
// @route POST /api/v1/users/register
// @access Private/Admin

export const registerUserCtrl = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;
    // check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new Error('User already exists');
    }
    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // create user
    const user = await User.create({
        fullname,
        email,
        password: hashedPassword,
    });
    res.status(201).json({
        status: 'success',
        message: 'User registered successfully',
        data: user,
    });
});


export const loginUserCtrl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    // check if user exists
    const userFound = await User.findOne({ email });
    if (!userFound) {
        throw new Error('User not found');
    }
    // check if password is correct
    const isMatch = await bcrypt.compare(password, userFound?.password);
    if (!isMatch) {
        throw new Error('Invalid email or password');
    }
    res.status(200).json({
        status: 'success',
        message: 'User logged in successfully',
        data: userFound,
        token: generateToken(userFound?._id),
    });
});


// @desc Get user profile
// @route GET /api/v1/users/profile
// @access Private
export const getUserProfileCtrl = asyncHandler(async (req, res) => {
    //get token from header
    const token = getTokenFromHeader(req);
    //verify token
    const verified = verifyToken(token);
    console.log(verified);
    res.json({
        msg: 'User profile fetched successfully',
        data: verified,
    });
});

// @desc Update user profile
// @route PUT /api/v1/users/profile
// @access Private
export const updateUserProfileCtrl = asyncHandler(async (req, res) => {
    const { fullname, email, password } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
        throw new Error('User not found');
    }
    user.fullname = fullname || user.fullname;
    user.email = email || user.email;
    if (password) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
    }
    await user.save();
    res.status(200).json({
        status: 'success',
        message: 'User profile updated successfully',
        data: user,
    });
});

// @desc Get all users
// @route GET /api/v1/users
// @access Private/Admin
export const getAllUsersCtrl = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password');
    res.status(200).json({
        status: 'success',
        message: 'Users fetched successfully',
        data: users,
    });
});

// @desc Get user by id
// @route GET /api/v1/users/:id
// @access Private/Admin
export const getUserByIdCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) {
        throw new Error('User not found');
    }
    res.status(200).json({
        status: 'success',
        message: 'User fetched successfully',
        data: user,
    });
});

// @desc Delete user
// @route DELETE /api/v1/users/:id
// @access Private/Admin
export const deleteUserCtrl = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new Error('User not found');
    }
    await user.remove();
    res.status(200).json({
        status: 'success',
        message: 'User deleted successfully',
    });
});

// @desc Update user role
// @route PUT /api/v1/users/:id/role
// @access Private/Admin
export const updateUserRoleCtrl = asyncHandler(async (req, res) => {
    const { role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new Error('User not found');
    }
    user.role = role || user.role;
    await user.save();
    res.status(200).json({
        status: 'success',
        message: 'User role updated successfully',
        data: user,
    });
});

// @desc Update user password
// @route PUT /api/v1/users/:id/password
// @access Private/Admin
export const updateUserPasswordCtrl = asyncHandler(async (req, res) => {
    const { password } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) {
        throw new Error('User not found');
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res.status(200).json({
        status: 'success',
        message: 'User password updated successfully',
        data: user,
    });
});

