const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');
const jwt = require('jsonwebtoken');

const test = (req, res) => {
    res.json('test is working');
};

// Register End Point
const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate name (should contain only letters)
        const nameRegex = /^[A-Za-z\s]+$/;
        if (!name || !nameRegex.test(name)) {
            return res.json({ error: "Name is required and should contain only letters" });
        }

        // Validate email (must contain '@')
        if (!email || !email.includes('@')) {
            return res.json({ error: "Enter a valid email containing '@'" });
        }

        // Validate password (minimum length 6)
        if (!password || password.length < 6) {
            return res.json({ error: "Password is required and should be at least 6 characters long" });
        }

        // Check if email already exists
        const exist = await User.findOne({ email });
        if (exist) {
            return res.json({ error: "Email already exists" });
        }

        // Corrected: Hash the password properly
        const hashedPassword = await hashPassword(password);

        // Corrected: Save user with the hashed password
        const user = await User.create({ name, email, password: hashedPassword });

        return res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Login End Point
const loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ error: "No User Found" });
        }

        // Check if password matches
        const match = await comparePassword(password, user.password);
        if (match) {
            jwt.sign(
                { email: user.email, id: user._id, name: user.name, role: user.role },
                process.env.JWT_SECRET,
                {},
                (err, token) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: "Token generation failed" });
                    }
                    res.cookie('token', token).json(user);
                }
            );
        } else {
            return res.json({ error: "Password does not match" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Something went wrong" });
    }

};

// update user
const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password, role } = req.body;

        // Validate email (must contain '@')
        if (email && !email.includes('@')) {
            return res.json({ error: "Enter a valid email containing '@'" });
        }

        // Check if user exists
        const user = await User.findById(id);
        console.log(user);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Hash password if provided
        let hashedPassword = user.password;
        if (password && password.length >= 6) {
            hashedPassword = await hashPassword(password);
        } else if (password) {
            return res.json({ error: "Password should be at least 6 characters long" });
        }

        // Update user details
        const updatedUser = await User.findByIdAndUpdate(
            id,
            { name, email, password: hashedPassword, role },
            { new: true, runValidators: true }
        ).select("-password"); // Exclude password from response

        res.json(updatedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password"); // Exclude passwords from response
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

const getUserDetails = async (req, res) => {
    try {
        const { id } = req.params; // Get user ID from request params
        const user = await User.findById(id); // Find user by ID

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Return user details (excluding password)
        const userDetails = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        };

        res.json(userDetails);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// delete user
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.deleteOne();

        res.json({ message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};



module.exports = {
    test,
    registerUser,
    updateUser,
    loginUser,
    deleteUser,
    getUserDetails,
    getAllUsers
};
