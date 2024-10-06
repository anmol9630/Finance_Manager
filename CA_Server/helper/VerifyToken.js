const jwt = require('jsonwebtoken')

const VerifyToken = (token) => {
    console.log(token);
    const data = jwt.verify(token , process.env.JWT_SECRET_KEY);
    return data;
}


module.exports = {
    VerifyToken
}
