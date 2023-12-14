import mongoose from 'mongoose';


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
    forms: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Form'
        }
    ]
})

// fire a function before doc saved to db
// userSchema.pre('save', async function (next) {
//     const salt = await bcrypt.genSalt();
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// })

// static method to login user
userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (!user) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    // if(password == user.password){

    // }
    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!(password == user.password)) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    return user;
}

const User = mongoose.model("User", userSchema);
export default User;
