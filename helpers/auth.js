import { genSalt, hash as _hash, compare } from 'bcrypt';

const hashPassword = (password) => {
    return new Promise((resolve, reject) => {

        genSalt(12, (err, salt) => {

            if (err) {

                reject(err)
            }
            _hash(password, salt, (err, hash) => {

                if (err) {

                    reject(err)
                }
                resolve(hash)
            })


        })
    })
}

const comparePassword = async (inputPassword, hashedPassword) => {
    try {
        const match = await compare(inputPassword, hashedPassword);
        return match; // Returns true or false
    } catch (error) {
        console.error("Error comparing password:", error);
        return false;
    }
};


export default { hashPassword, comparePassword }

