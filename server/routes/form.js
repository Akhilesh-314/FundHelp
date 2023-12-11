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
        const user = req.user;
        const userData = req.userData;

        if (!req.file) {
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

router.delete('/deleteForm/:formId', authenticateToken, async (req, res) => {
    try {
      const { userId } = req.user;
      const { formId } = req.params;
      // Find the form by ID
      const form = await Form.findById(formId);
  
      // Check if the form exists
      if (!form) {
        return res.status(404).json({ error: 'Form not found' });
      }
      // Check if the logged-in user is the owner of the form
      if (form.user == userId) {
        return res.status(403).json({ error: 'Unauthorized. You are not the owner of this form.' });
      }
      // Delete the form
      await Form.findByIdAndDelete(formId);
  
      res.status(200).json({ message: 'Form deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

export default router;