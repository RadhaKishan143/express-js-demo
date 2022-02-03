const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users");

const createUser = async (req, res) => {
    const body = req.body;
    const hash = await bcrypt.hash(body.password, 10);

    const newUser = new User({
        username: body.username,
        password: hash
    });

    await newUser.save();

    return res.status(201).json({
        success: true,
        message: "User created",
        data: {
            user: newUser
        },
        error: null
    });
}

const getUsers = async (req, res, next) => {
    try{
        const users = await User.paginate({}, {
            limit: req.query?.limit || 3,
            page: req.query?.page || 1,
            populate: {
                path: "variants",
                select: "title"
            },
            customLabels: {
                docs: "users",
                meta: "pagination"
            }
        });

        return res.status(200).json({
            success: true,
            data: users
        });

    } catch(error) {
       next(error);
    }
}

const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
           return res.status(200).json({
               success: false,
               message: "User not found",
               data: null,
               error: null
           });
        }
        const password = await bcrypt.compare(req.body.password, user.password);
        if (!password) {
            return res.status(200).json({
                success: false,
                message: "Invalid Password",
                data: null,
                error: null
            });
        }
        const payload = {
            userId: user._id,
            username: user.username
        };
        const token = await jwt.sign(payload, process.env.JSON_SECRET_KEY, {
            expiresIn: 3600
        });
        return res.status(200).json({
            success: true,
            message: "Login success",
            data: {
                accessToken: token
            },
            error: null
        });
    } catch (error) {
        next(error);
    }
}

const getProfile = async (req, res, next) => {
    try {
        const profile = await User.findById(req.userId);
        if (profile) {
            return res.status(200).json({
                success: true,
                message: "Profile found",
                data: {
                    profile: profile
                },
                error: null
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "Profile not found",
                data: null,
                error: null
            });
        }
    } catch (error) {
        next(error);
    }
}

const getSingleUser = async (req, res, next) => {
    try {
        const userId = req.params.id;
        console.log(userId);
        const user = await User.findById(userId);
        console.log(user);
        if (user) {
            return res.status(200).json({
                success: true,
                message: "User fetched successfully",
                data: {
                    user: user
                },
                error: null
            });
        } else {
            return res.status(200).json({
                success: false,
                message: "User not found",
                data: null,
                error: null
            });
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createUser,
    getUsers,
    login,
    getProfile,
    getSingleUser
}