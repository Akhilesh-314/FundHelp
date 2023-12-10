 --- User Model ---
 import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = mongoose.Schema({
    name: {
        type: String,
    },
    lastname: {
        type: String,
    },
    mobile: {
        type: Number,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
})

// fire a function before doc saved to db
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    return user;
}

const User = mongoose.model("User", userSchema);
export default User;

--- Form Model ----
import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  username: String,
  email: String,
  phoneNumber: Number,
  image: String,
  cause: String,
  isPrivate: Boolean,
  isPublic: Boolean,
  whatsappNumber: Number,
  bankAccountHolder: String,
  bankAccountNumber: Number,
  ifscCode: String,
  branch: String,
  estimatedAmount: Number,
});

const Form = mongoose.model("Form", formSchema);
export default Form;