const User = require('../models/User');
const jwt = require('jsonwebtoken');

const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401);
    const refreshToken = cookies.jwt;

    const user = await User.findOne({username: username.toLowerCase()})
    if (!user) return res.sendStatus(403); //Forbidden 
    // evaluate jwt 
    jwt.verify(
        refreshToken,
        process.env.JWT_SECRET,
        (err, decoded) => {
            if (err || user.username !== decoded.username) return res.sendStatus(403);
            const roles = user.roles
            const accessToken = jwt.sign(
                {
                  username: user.username
                },
                process.env.JWT_SECRET,
                { expiresIn: '1d' }
            );
            res.json({ username: user.username, roles, accessToken })
        }
    );
}

module.exports = { handleRefreshToken }