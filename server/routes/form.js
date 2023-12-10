import express from "express";
import multer from 'multer';
import Form from "../models/Form.js";
import authenticateToken from "../middleware/auth.js"; 
const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Set your desired upload directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage: storage });


router.post('/createForm', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        console.log('req came');
        const user = req.user;
        const userData = req.userData;

        if (!req.file) {
            console.log('No file uploaded');
            return res.status(400).json({ error: 'No file uploaded' });
        }
        const newForm = new Form({
            user: user.userId,
            username: req.body.username,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            image: req.file.path.replace(/\\/g, '/'),
            cause: req.body.cause,
            isPrivate: req.body.isPrivate,
            isPublic: req.body.isPublic,
            whatsappNumber: req.body.whatsappNumber,
            bankAccountHolder: req.body.bankAccountHolder,
            bankAccountNumber: req.body.bankAccountNumber,
            ifscCode: req.body.ifscCode,
            branch: req.body.branch,
            estimatedAmount: req.body.estimatedAmount,
        });
        await newForm.save();

        userData.forms.push(newForm._id);
        await userData.save();
        res.status(201).json({ message: 'Data stored successfully!' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.get('/getForm', async (req, res) => {
    try {
        const data = await Form.find(); // Fetch data from MongoDB
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Failed to fetch data from the server' });
    }
});

export default router;