import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
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