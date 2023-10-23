import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const jwtUtils = {
    generateToken: (user) => {
        return jwt.sign(
            { id: user.id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
        );
    },
    verifyPassword: async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword);
    },
};

export default jwtUtils;
