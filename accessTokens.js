const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Function to Generate Access Token for User
function generateAccessToken(user) {
    const payload = {
        email: user.email,
        password: user.password,
    };

    const secret = process.env.SECRET_KEY;
    const options = { expiresIn: '1h' };

    return jwt.sign(payload, secret, options);
}

//Function to Verify the Access Token provided for requesting
function verifyAccessToken(token) {
    const secret = process.env.SECRET_KEY;

    try {
        const decoded = jwt.verify(token, secret);
        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, error: error.message };
    }
}

exports.generateAccessToken = generateAccessToken;
exports.verifyAccessToken = verifyAccessToken;