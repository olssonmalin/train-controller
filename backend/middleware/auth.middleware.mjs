import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token)
        return res
            .status(401)
            .json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET, (err, jwtDecoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });
        req.user = jwtDecoded;
        next();
    });
};

export default authenticateToken;
