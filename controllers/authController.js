const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/auth');

const test = (req, res) => {
    res.json('test is working');
};


//Register End Point
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

        const hashedPassword = await hashedPassword(password);
        // Create new user and save to the database
        const user = await User.create({ name, email, password: hashPassword, });

        return res.json(user);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
};


//Login End Point

const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;

        //Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({
                error: "No User Found"
            });

        }
        //Check if password matches
        const match = await comparePassword(password, user.password)
        if (match) {
            res.json('Password Match');
        }
    } catch (error) {
        console.log(error);


    }


    return res.status(400).json({ error: "Invalid request body" });
}





module.exports = {
    test,
    registerUser,
    loginUser
};
