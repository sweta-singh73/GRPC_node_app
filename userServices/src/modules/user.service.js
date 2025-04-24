import  User  from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
const secretKey = "hdgfjdfhgfhkgh"

export const createUser = async ({ name, email, password }) => {
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ name, email, password: hashed });
  return { id: user._id.toString(), name: user.name, email: user.email };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error('Invalid email or password');
  }
  const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: '1h' });
  return token;
};

export const getUser = async (id) => {
  const user = await User.findOne({_id:id});
  if(!user){
    throw new Error('User details not found');
  }
  return user;
}