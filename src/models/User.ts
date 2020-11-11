import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    name: string,
    password: string
  }
const userSchema =  new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    password: {
        type: String,
        required: true,
        trim: true
    }

})


const User = mongoose.model<IUser>('User', userSchema, 'Users');
export default User;