const bcrypt = require('bcryptjs');

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {
        // Using 12 rounds for salt generation:
        bcrypt.genSalt(12, (err, salt) => {
            if (err) return reject(err);

            bcrypt.hash(password, salt, (err, hash) => {
                if (err) return reject(err);
                resolve(hash);
            });
        });
    });
};

const comparePassword = async (inputPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(inputPassword, hashedPassword);
        return match; // true or false
    } catch (error) {
        console.error("Error comparing password:", error);
        return false;
    }
};

module.exports = { hashPassword, comparePassword };
