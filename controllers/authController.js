const User = require('../models/user');

const test = (req, res) => {
    res.json('test is working');
};

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

        // Create new user and save to the database
        const user = await User.create({ name, email, password });

        return res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = {
    test,
    registerUser
};
