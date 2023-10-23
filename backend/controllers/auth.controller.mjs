import usersService from '../services/users.service.mjs';
import jwtUtils from '../utils/jwt.mjs';

const authController = {
    login: async function (req, res) {
        const { email, password } = req.body;
        const existingUser = await usersService.findUserByEmail(email);
        if (existingUser == null) {
            return res
                .status(401)
                .json({ message: 'Invalid login credentials.' });
        }
        const validPassword = await jwtUtils.verifyPassword(
            password,
            existingUser.password,
        );
        if (!validPassword) {
            return res
                .status(401)
                .json({ message: 'Invalid login credentials.' });
        }

        const token = jwtUtils.generateToken(existingUser);
        res.json({
            token,
        });
    },
    register: async function (req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(401)
                .json({ message: 'Email or password missing in request.' });
        }

        const existingUser = await usersService.findUserByEmail(email);
        if (existingUser != null) {
            return res
                .status(401)
                .json({ message: 'Email already registered.' });
        }

        const user = await usersService.createUser({ email, password });
        if (user == null) {
            return res
                .status(500)
                .json({ message: 'User could not be registered.' });
        }
        return res
            .status(201)
            .json({ message: 'User successfully registered.' });
    },
};

export default authController;
