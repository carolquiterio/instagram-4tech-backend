import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

const UserActivityComentsSchema = new mongoose.Schema({
    userId: String,
    UserName: String,
    comment: String,
    timestamp: {
        type: Date,
        default: Date.now(),
    },
});

export const UserActivitySchema = new mongoose.Schema({
    userId: String,
    userName: String,
    fileName: String,
    likes: [String],
    timestamp:{
        type: Date,
        defalut: Date.now(),
    },
    comments: [UserActivityComentsSchema],
    
});

