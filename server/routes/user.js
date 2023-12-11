import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import authenticateToken from "../middleware/auth.js";
const router = express.Router();

router.post('/signup', async (req, res) => {
    const { name, lastname, mobile, email, password } = req.body;

    try {
        const user = await User.create({ name, lastname, mobile, email, password });
        res.status(201).json({ message: 'User registered successfully!' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = jwt.sign({ userId: user._id }, 'men secret', { expiresIn: '1h' });
        res.status(200).json({ token })
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to log in' });
    }
});
router.get('/logout', (req, res) => {
    res.status(200).json({ message: 'User LoggedOut successfully!' })
});

router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = req.user;

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userData = await User.findById(user.userId).populate('forms'); // Use user.userId directly

        const sanitizedUser = {
            _id: userData._id, // Use userData._id instead of user._id
            name: userData.name,
            lastname: userData.lastname,
            mobile: userData.mobile,
            email: userData.email,
            forms: userData.forms, 
        };

        res.json(sanitizedUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch user profile' });
    }
});
export default router;