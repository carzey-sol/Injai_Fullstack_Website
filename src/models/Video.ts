import mongoose from 'mongoose';

export interface IVideo extends mongoose.Document {
  title: string;
  artist: mongoose.Types.ObjectId;
  youtubeId: string;
  description: string;
  thumbnail: string;
  category: 'music' | 'interview' | 'live' | 'behind-scenes';
  featured: boolean;
  views: number;
  uploadDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const videoSchema = new mongoose.Schema<IVideo>({
  title: {
    type: String,
    required: [true, 'Video title is required'],
    trim: true,
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: [true, 'Artist reference is required'],
  },
  youtubeId: {
    type: String,
    required: [true, 'YouTube ID is required'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Video description is required'],
    minlength: [10, 'Description must be at least 10 characters long'],
  },
  thumbnail: {
    type: String,
    required: [true, 'Video thumbnail is required'],
  },
  category: {
    type: String,
    enum: ['music', 'interview', 'live', 'behind-scenes'],
    required: [true, 'Video category is required'],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  views: {
    type: Number,
    default: 0,
    min: 0,
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

export default mongoose.models.Video || mongoose.model<IVideo>('Video', videoSchema); 